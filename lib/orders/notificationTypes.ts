export type OrderNotificationEvent = 'new_order' | 'attention'

export type OrderNotificationRow = {
  id: string
  created_at: string
  order_uuid: string
  order_ref: string
  event_type: OrderNotificationEvent
  title: string
  body: string
  read_at: string | null
}

export type OrderEmailAlertType = 'new_order' | 'attention'

export type OrderEmailAlertPayload = {
  type: OrderEmailAlertType
  orderRef: string
  orderType?: string
  customerName: string
  customerPhone?: string
  items?: string
  quantity?: number
  assignedTo?: string
  overallStatus?: string
  updatedBy?: string
}
