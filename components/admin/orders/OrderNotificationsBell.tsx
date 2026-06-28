'use client'

import type { OrderNotificationRow } from '@/lib/orders/notificationTypes'

type OrderNotificationsBellProps = {
  notifications: OrderNotificationRow[]
  unreadCount: number
  isOpen: boolean
  pushPermission: NotificationPermission | 'unsupported'
  onToggle: () => void
  onMarkAllRead: () => void
  onMarkRead: (id: string) => void
  onEnablePush: () => void
  onSelectOrder: (orderRef: string) => void
}

export default function OrderNotificationsBell({
  notifications,
  unreadCount,
  isOpen,
  pushPermission,
  onToggle,
  onMarkAllRead,
  onMarkRead,
  onEnablePush,
  onSelectOrder,
}: OrderNotificationsBellProps) {
  return (
    <div className="orders-admin__notify-wrap">
      <button
        type="button"
        className="orders-admin__notify-btn"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
      >
        <span aria-hidden>🔔</span>
        {unreadCount > 0 ? (
          <span className="orders-admin__notify-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="orders-admin__notify-panel">
          <div className="orders-admin__notify-head">
            <strong>Notifications</strong>
            {unreadCount > 0 ? (
              <button type="button" className="orders-admin__notify-mark-all" onClick={onMarkAllRead}>
                Mark all read
              </button>
            ) : null}
          </div>

          {pushPermission === 'default' ? (
            <button type="button" className="orders-admin__notify-push" onClick={onEnablePush}>
              Enable phone alerts
            </button>
          ) : null}

          <ul className="orders-admin__notify-list">
            {notifications.map((item) => (
              <li
                key={item.id}
                className={`orders-admin__notify-item${item.read_at ? '' : ' is-unread'} event-${item.event_type}`}
              >
                <button
                  type="button"
                  className="orders-admin__notify-item-btn"
                  onClick={() => {
                    onSelectOrder(item.order_ref)
                    if (!item.read_at) onMarkRead(item.id)
                  }}
                >
                  <span className="orders-admin__notify-item-title">{item.title}</span>
                  <span className="orders-admin__notify-item-body">{item.body}</span>
                  <span className="orders-admin__notify-item-time">{formatWhen(item.created_at)}</span>
                </button>
              </li>
            ))}
          </ul>

          {notifications.length === 0 ? (
            <p className="orders-admin__notify-empty">No notifications yet.</p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}
