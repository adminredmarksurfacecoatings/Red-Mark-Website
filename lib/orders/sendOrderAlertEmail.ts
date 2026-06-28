import type { OrderEmailAlertPayload } from '@/lib/orders/notificationTypes'

const DEFAULT_ALERT_EMAIL = 'info@redmarksurfacecoatings.com'

function alertSubject(payload: OrderEmailAlertPayload) {
  if (payload.type === 'attention') {
    return `[Order Alert] Attention — ${payload.orderRef}`
  }
  return `[Order Alert] New order — ${payload.orderRef}`
}

export async function sendOrderAlertEmail(payload: OrderEmailAlertPayload) {
  const to = process.env.ORDERS_ALERT_EMAIL?.trim() || DEFAULT_ALERT_EMAIL
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`

  const fields: Record<string, string> = {
    _subject: alertSubject(payload),
    _template: 'table',
    Alert: payload.type === 'new_order' ? 'New order created' : 'Order needs attention',
    'Order ID': payload.orderRef,
    'Order Type': payload.orderType ?? '—',
    Customer: payload.customerName,
    Phone: payload.customerPhone ?? '—',
    Items: payload.items ?? '—',
    Quantity: payload.quantity != null ? String(payload.quantity) : '—',
    'Assigned To': payload.assignedTo ?? '—',
    Status: payload.overallStatus ?? '—',
    'Updated By': payload.updatedBy ?? '—',
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(fields),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(text || `Email alert failed (${response.status})`)
  }

  return true
}
