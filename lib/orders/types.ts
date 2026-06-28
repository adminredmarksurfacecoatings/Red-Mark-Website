export type OrderType = 'Regular' | 'Special'

export type OrderRow = {
  id: string
  order_id: string
  created_at: string
  order_type: OrderType
  customer_name: string
  customer_phone: string
  items: string
  quantity: number
  special_instructions: string
  assigned_to: string
  factory_status: string
  current_location: string
  overall_status: string
  expected_ready: string | null
  notes: string
  last_updated_by: string
  last_updated_at: string
}

export type NewOrderInput = {
  order_type: OrderType
  customer_name: string
  customer_phone: string
  items: string
  quantity: number
  special_instructions: string
  assigned_to: string
  expected_ready: string
  notes: string
}

export type OrderUpdatePayload = Partial<
  Pick<
    OrderRow,
    | 'order_type'
    | 'customer_name'
    | 'customer_phone'
    | 'items'
    | 'quantity'
    | 'special_instructions'
    | 'assigned_to'
    | 'factory_status'
    | 'current_location'
    | 'overall_status'
    | 'expected_ready'
    | 'notes'
  >
>
