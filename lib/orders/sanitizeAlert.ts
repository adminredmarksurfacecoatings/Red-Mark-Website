import type { OrderEmailAlertPayload } from '@/lib/orders/notificationTypes'

const MAX_FIELD_LEN = 500

function trimField(value: string | undefined, max = MAX_FIELD_LEN) {
  if (!value) return undefined
  return value.trim().slice(0, max)
}

export function sanitizeOrderEmailAlert(payload: OrderEmailAlertPayload): OrderEmailAlertPayload | null {
  const orderRef = trimField(payload.orderRef, 64)
  const customerName = trimField(payload.customerName, 200)

  if (!orderRef || !customerName) return null
  if (payload.type !== 'new_order' && payload.type !== 'attention') return null

  return {
    type: payload.type,
    orderRef,
    customerName,
    orderType: trimField(payload.orderType, 32),
    customerPhone: trimField(payload.customerPhone, 40),
    items: trimField(payload.items, MAX_FIELD_LEN),
    quantity:
      typeof payload.quantity === 'number' && payload.quantity > 0 && payload.quantity < 100000
        ? payload.quantity
        : undefined,
    assignedTo: trimField(payload.assignedTo, 120),
    overallStatus: trimField(payload.overallStatus, 64),
  }
}
