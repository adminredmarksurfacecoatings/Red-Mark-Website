'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import type { AuthUser } from '@supabase/supabase-js'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import {
  FACTORY_STATUSES,
  LOCATIONS,
  ORDER_TYPES,
  OVERALL_STATUSES,
  overallStatusTone,
} from '@/lib/orders/constants'
import { generateOrderId } from '@/lib/orders/generateOrderId'
import type { OrderNotificationRow } from '@/lib/orders/notificationTypes'
import {
  requestBrowserNotificationPermission,
  requestOrderEmailAlert,
  showBrowserNotification,
} from '@/lib/orders/notifyClient'
import type { NewOrderInput, OrderRow, OrderUpdatePayload } from '@/lib/orders/types'
import OrderNotificationsBell from '@/components/admin/orders/OrderNotificationsBell'

const emptyNewOrder = (): NewOrderInput => ({
  order_type: 'Regular',
  customer_name: '',
  customer_phone: '',
  items: '',
  quantity: 1,
  special_instructions: '',
  assigned_to: '',
  expected_ready: '',
  notes: '',
})

export default function OrdersAdminApp() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [user, setUser] = useState<AuthUser | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'All' | 'Regular' | 'Special'>('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showNewForm, setShowNewForm] = useState(false)
  const [newOrder, setNewOrder] = useState<NewOrderInput>(emptyNewOrder)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSavingNew, setIsSavingNew] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<OrderNotificationRow[]>([])
  const [notifyOpen, setNotifyOpen] = useState(false)
  const [pushPermission, setPushPermission] = useState<NotificationPermission | 'unsupported'>(() =>
    typeof window !== 'undefined' && typeof Notification !== 'undefined'
      ? Notification.permission
      : 'unsupported'
  )
  const lastNotifySeenRef = useRef<string | null>(null)

  async function ensureStaffAccess(): Promise<boolean> {
    if (!supabase) return false

    const { data: isStaff, error: staffError } = await supabase.rpc('is_staff')

    if (staffError) {
      // Migration not applied yet — permissive RLS still allows access
      if (staffError.message.includes('Could not find the function')) return true
      setError('Could not verify staff access.')
      return false
    }

    if (!isStaff) {
      setError(
        'This account is not authorized for orders. Ask an admin to add your email to staff_allowlist in Supabase.'
      )
      return false
    }

    return true
  }

  async function loadNotifications() {
    if (!supabase) return

    const { data, error: loadError } = await supabase
      .from('order_notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (loadError) {
      setError(loadError.message)
      return
    }

    const rows = (data as OrderNotificationRow[]) ?? []
    setNotifications(rows)

    const newestUnread = rows.find((row) => !row.read_at)
    if (newestUnread && newestUnread.id !== lastNotifySeenRef.current) {
      lastNotifySeenRef.current = newestUnread.id
      showBrowserNotification(newestUnread.title, newestUnread.body)
    }
  }

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read_at).length,
    [notifications]
  )

  async function loadOrders() {
    if (!supabase) return
    setError(null)

    const { data, error: loadError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (loadError) {
      setError(loadError.message)
      return
    }

    setOrders((data as OrderRow[]) ?? [])
    setNoteDrafts((prev) => {
      const next = { ...prev }
      for (const order of data ?? []) {
        if (next[order.id] === undefined) next[order.id] = order.notes ?? ''
      }
      return next
    })
  }

  useEffect(() => {
    if (!supabase) {
      setError('Supabase is not configured. Add env vars and restart.')
      setIsLoading(false)
      return
    }

    let active = true

    ;(async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()

      if (!active) return
      setUser(currentUser)

      if (currentUser) {
        const allowed = await ensureStaffAccess()
        if (allowed) {
          await Promise.all([loadOrders(), loadNotifications()])
        }
      }

      setIsLoading(false)
    })()

    return () => {
      active = false
    }
  }, [supabase])

  useEffect(() => {
    if (!supabase || !user) return

    const ordersChannel = supabase
      .channel('orders-admin')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          void loadOrders()
        }
      )
      .subscribe()

    const notifyChannel = supabase
      .channel('order-notifications-admin')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'order_notifications' },
        () => {
          void loadNotifications()
        }
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(ordersChannel)
      void supabase.removeChannel(notifyChannel)
    }
  }, [supabase, user])

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase()
    return orders.filter((order) => {
      if (typeFilter !== 'All' && order.order_type !== typeFilter) return false
      if (statusFilter !== 'All' && order.overall_status !== statusFilter) return false
      if (!q) return true
      return (
        order.customer_name.toLowerCase().includes(q) ||
        order.order_id.toLowerCase().includes(q) ||
        order.customer_phone.toLowerCase().includes(q)
      )
    })
  }, [orders, search, statusFilter, typeFilter])

  async function handleSignIn(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return

    setIsSigningIn(true)
    setError(null)

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setIsSigningIn(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    setUser(data.user)
    setPassword('')

    const allowed = await ensureStaffAccess()
    if (!allowed) return

    await Promise.all([loadOrders(), loadNotifications()])
    void requestBrowserNotificationPermission().then((permission) => {
      if (permission) setPushPermission(permission)
    })
    setMessage('Signed in.')
  }

  async function handleSignOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    setOrders([])
    setMessage('Signed out.')
  }

  async function handleCreateOrder(e: FormEvent) {
    e.preventDefault()
    if (!supabase || !user) return

    setIsSavingNew(true)
    setError(null)

    try {
      const order_id = await generateOrderId(supabase)
      const now = new Date().toISOString()
      const updater = user.email ?? 'staff'

      const { error: insertError } = await supabase.from('orders').insert({
        order_id,
        order_type: newOrder.order_type,
        customer_name: newOrder.customer_name.trim(),
        customer_phone: newOrder.customer_phone.trim(),
        items: newOrder.items.trim(),
        quantity: newOrder.quantity,
        special_instructions: newOrder.special_instructions.trim(),
        assigned_to: newOrder.assigned_to.trim(),
        factory_status: 'Pending',
        current_location: 'Office',
        overall_status: 'New',
        expected_ready: newOrder.expected_ready
          ? new Date(newOrder.expected_ready).toISOString()
          : null,
        notes: newOrder.notes.trim(),
        last_updated_by: updater,
        last_updated_at: now,
      })

      if (insertError) throw insertError

      setNewOrder(emptyNewOrder())
      setShowNewForm(false)
      setMessage(`Order ${order_id} created.`)
      await Promise.all([loadOrders(), loadNotifications()])

      void requestOrderEmailAlert({
        type: 'new_order',
        orderRef: order_id,
        orderType: newOrder.order_type,
        customerName: newOrder.customer_name.trim(),
        customerPhone: newOrder.customer_phone.trim(),
        items: newOrder.items.trim(),
        quantity: newOrder.quantity,
        assignedTo: newOrder.assigned_to.trim(),
        overallStatus: 'New',
        updatedBy: updater,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create order.')
    } finally {
      setIsSavingNew(false)
    }
  }

  async function patchOrder(id: string, patch: OrderUpdatePayload) {
    if (!supabase || !user) return

    const existing = orders.find((order) => order.id === id)

    setBusyId(id)
    setError(null)

    const { error: updateError } = await supabase
      .from('orders')
      .update({
        ...patch,
        last_updated_by: user.email ?? 'staff',
        last_updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    setBusyId(null)

    if (updateError) {
      setError(updateError.message)
      return
    }

    await Promise.all([loadOrders(), loadNotifications()])

    if (
      patch.overall_status === 'Attention' &&
      existing &&
      existing.overall_status !== 'Attention'
    ) {
      void requestOrderEmailAlert({
        type: 'attention',
        orderRef: existing.order_id,
        orderType: existing.order_type,
        customerName: existing.customer_name,
        customerPhone: existing.customer_phone,
        items: existing.items,
        quantity: existing.quantity,
        assignedTo: existing.assigned_to,
        overallStatus: 'Attention',
        updatedBy: user.email ?? 'staff',
      })
    }
  }

  async function markNotificationRead(id: string) {
    if (!supabase) return

    const { error: updateError } = await supabase
      .from('order_notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('id', id)

    if (updateError) {
      setError(updateError.message)
      return
    }

    await loadNotifications()
  }

  async function markAllNotificationsRead() {
    if (!supabase) return

    const unreadIds = notifications.filter((item) => !item.read_at).map((item) => item.id)
    if (unreadIds.length === 0) return

    const { error: updateError } = await supabase
      .from('order_notifications')
      .update({ read_at: new Date().toISOString() })
      .in('id', unreadIds)

    if (updateError) {
      setError(updateError.message)
      return
    }

    await loadNotifications()
  }

  function focusOrderByRef(orderRef: string) {
    const match = orders.find((order) => order.order_id === orderRef)
    if (match) {
      setExpandedId(match.id)
      setSearch(orderRef)
    }
    setNotifyOpen(false)
  }

  async function enablePushAlerts() {
    const permission = await requestBrowserNotificationPermission()
    if (permission) setPushPermission(permission)
  }

  async function saveNotes(order: OrderRow) {
    const notes = noteDrafts[order.id] ?? ''
    await patchOrder(order.id, { notes })
    setMessage('Notes saved.')
  }

  if (isLoading) {
    return (
      <section className="orders-admin">
        <p className="orders-admin__loading">Loading orders…</p>
      </section>
    )
  }

  if (!user) {
    return (
      <section className="orders-admin">
        <div className="orders-admin__shell">
          <h1 className="orders-admin__title">Orders Login</h1>
          <p className="orders-admin__subtitle">Sign in to manage factory orders.</p>

          <form className="orders-admin__card" onSubmit={handleSignIn}>
            {!supabase ? (
              <p className="orders-admin__error">
                Supabase is not configured. Add `NEXT_PUBLIC_SUPABASE_URL` and
                `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`.
              </p>
            ) : null}

            <label className="orders-admin__label" htmlFor="orders-email">
              Email
            </label>
            <input
              id="orders-email"
              type="email"
              className="orders-admin__input"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="orders-admin__label" htmlFor="orders-password">
              Password
            </label>
            <input
              id="orders-password"
              type="password"
              className="orders-admin__input"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error ? <p className="orders-admin__error">{error}</p> : null}

            <button type="submit" className="orders-admin__btn orders-admin__btn--primary" disabled={isSigningIn}>
              {isSigningIn ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="orders-admin">
      <div className="orders-admin__shell">
        <header className="orders-admin__header">
          <div>
            <h1 className="orders-admin__title">Orders</h1>
            <p className="orders-admin__subtitle">{user.email}</p>
          </div>
          <div className="orders-admin__header-actions">
            <OrderNotificationsBell
              notifications={notifications}
              unreadCount={unreadCount}
              isOpen={notifyOpen}
              pushPermission={pushPermission}
              onToggle={() => setNotifyOpen((open) => !open)}
              onMarkAllRead={markAllNotificationsRead}
              onMarkRead={markNotificationRead}
              onEnablePush={enablePushAlerts}
              onSelectOrder={focusOrderByRef}
            />
            <button type="button" className="orders-admin__btn orders-admin__btn--ghost" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </header>

        <button
          type="button"
          className="orders-admin__btn orders-admin__btn--primary orders-admin__btn--new"
          onClick={() => setShowNewForm((open) => !open)}
        >
          {showNewForm ? 'Close New Order' : '+ New Order'}
        </button>

        {showNewForm ? (
          <form className="orders-admin__card orders-admin__new-form" onSubmit={handleCreateOrder}>
            <h2 className="orders-admin__card-title">New Order</h2>

            <div className="orders-admin__type-row">
              {ORDER_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`orders-admin__type-btn${newOrder.order_type === type ? ' is-active' : ''}${type === 'Special' ? ' is-special' : ''}`}
                  onClick={() => setNewOrder((prev) => ({ ...prev, order_type: type }))}
                >
                  {type}
                </button>
              ))}
            </div>

            <label className="orders-admin__label">Customer Name *</label>
            <input
              className="orders-admin__input"
              required
              value={newOrder.customer_name}
              onChange={(e) => setNewOrder((prev) => ({ ...prev, customer_name: e.target.value }))}
            />

            <label className="orders-admin__label">Phone *</label>
            <input
              className="orders-admin__input"
              type="tel"
              required
              value={newOrder.customer_phone}
              onChange={(e) => setNewOrder((prev) => ({ ...prev, customer_phone: e.target.value }))}
            />

            <label className="orders-admin__label">Items *</label>
            <textarea
              className="orders-admin__textarea"
              required
              rows={3}
              value={newOrder.items}
              onChange={(e) => setNewOrder((prev) => ({ ...prev, items: e.target.value }))}
            />

            <label className="orders-admin__label">Quantity *</label>
            <input
              className="orders-admin__input"
              type="number"
              min={1}
              required
              value={newOrder.quantity}
              onChange={(e) =>
                setNewOrder((prev) => ({ ...prev, quantity: Number.parseInt(e.target.value, 10) || 1 }))
              }
            />

            <label className="orders-admin__label">Assigned To</label>
            <input
              className="orders-admin__input"
              value={newOrder.assigned_to}
              onChange={(e) => setNewOrder((prev) => ({ ...prev, assigned_to: e.target.value }))}
            />

            <label className="orders-admin__label">Expected Ready</label>
            <input
              className="orders-admin__input"
              type="datetime-local"
              value={newOrder.expected_ready}
              onChange={(e) => setNewOrder((prev) => ({ ...prev, expected_ready: e.target.value }))}
            />

            <label className="orders-admin__label">Special Instructions</label>
            <textarea
              className="orders-admin__textarea"
              rows={2}
              value={newOrder.special_instructions}
              onChange={(e) => setNewOrder((prev) => ({ ...prev, special_instructions: e.target.value }))}
            />

            <label className="orders-admin__label">Notes</label>
            <textarea
              className="orders-admin__textarea"
              rows={2}
              value={newOrder.notes}
              onChange={(e) => setNewOrder((prev) => ({ ...prev, notes: e.target.value }))}
            />

            <button type="submit" className="orders-admin__btn orders-admin__btn--primary" disabled={isSavingNew}>
              {isSavingNew ? 'Creating…' : 'Create Order'}
            </button>
          </form>
        ) : null}

        <div className="orders-admin__filters">
          <input
            type="search"
            className="orders-admin__input orders-admin__search"
            placeholder="Search name or order ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="orders-admin__filter-row">
            <select
              className="orders-admin__select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
            >
              <option value="All">All types</option>
              {ORDER_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              className="orders-admin__select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All statuses</option>
              {OVERALL_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {message ? <p className="orders-admin__success">{message}</p> : null}
        {error ? <p className="orders-admin__error">{error}</p> : null}

        <p className="orders-admin__count">
          {filteredOrders.length} order{filteredOrders.length === 1 ? '' : 's'}
        </p>

        <div className="orders-admin__list">
          {filteredOrders.map((order) => {
            const tone = overallStatusTone(order.overall_status)
            const isExpanded = expandedId === order.id
            const isBusy = busyId === order.id

            return (
              <article
                key={order.id}
                className={`orders-admin__order${order.order_type === 'Special' ? ' is-special' : ''} tone-${tone}`}
              >
                <button
                  type="button"
                  className="orders-admin__order-head"
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                >
                  <div>
                    <p className="orders-admin__order-id">{order.order_id}</p>
                    <p className="orders-admin__order-customer">{order.customer_name || 'No name'}</p>
                    <p className="orders-admin__order-meta">
                      {order.order_type} · {order.items || '—'} · Qty {order.quantity}
                    </p>
                  </div>
                  <span className={`orders-admin__status-pill tone-${tone}`}>{order.overall_status}</span>
                </button>

                <div className="orders-admin__quick-status">
                  {OVERALL_STATUSES.map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={`orders-admin__status-btn tone-${overallStatusTone(status)}${order.overall_status === status ? ' is-active' : ''}`}
                      disabled={isBusy}
                      onClick={() => patchOrder(order.id, { overall_status: status })}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {isExpanded ? (
                  <div className="orders-admin__order-body">
                    <label className="orders-admin__label">Factory Status</label>
                    <select
                      className="orders-admin__select"
                      value={order.factory_status}
                      disabled={isBusy}
                      onChange={(e) => patchOrder(order.id, { factory_status: e.target.value })}
                    >
                      {FACTORY_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <label className="orders-admin__label">Location</label>
                    <select
                      className="orders-admin__select"
                      value={order.current_location}
                      disabled={isBusy}
                      onChange={(e) => patchOrder(order.id, { current_location: e.target.value })}
                    >
                      {LOCATIONS.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>

                    <label className="orders-admin__label">Assigned To</label>
                    <input
                      className="orders-admin__input"
                      defaultValue={order.assigned_to}
                      disabled={isBusy}
                      onBlur={(e) => {
                        if (e.target.value !== order.assigned_to) {
                          void patchOrder(order.id, { assigned_to: e.target.value })
                        }
                      }}
                    />

                    <label className="orders-admin__label">Phone</label>
                    <input
                      className="orders-admin__input"
                      defaultValue={order.customer_phone}
                      disabled={isBusy}
                      onBlur={(e) => {
                        if (e.target.value !== order.customer_phone) {
                          void patchOrder(order.id, { customer_phone: e.target.value })
                        }
                      }}
                    />

                    <label className="orders-admin__label">Notes</label>
                    <textarea
                      className="orders-admin__textarea"
                      rows={3}
                      value={noteDrafts[order.id] ?? order.notes}
                      onChange={(e) =>
                        setNoteDrafts((prev) => ({ ...prev, [order.id]: e.target.value }))
                      }
                    />
                    <button
                      type="button"
                      className="orders-admin__btn orders-admin__btn--secondary"
                      disabled={isBusy}
                      onClick={() => saveNotes(order)}
                    >
                      Save Notes
                    </button>

                    {order.special_instructions ? (
                      <p className="orders-admin__instructions">
                        <strong>Special:</strong> {order.special_instructions}
                      </p>
                    ) : null}

                    <p className="orders-admin__updated">
                      Updated {formatWhen(order.last_updated_at)} by {order.last_updated_by || '—'}
                    </p>
                  </div>
                ) : null}
              </article>
            )
          })}

          {filteredOrders.length === 0 ? (
            <p className="orders-admin__empty">No orders match your filters.</p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}
