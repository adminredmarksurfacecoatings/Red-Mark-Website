import type { SupabaseClient } from '@supabase/supabase-js'

function formatDateStamp(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

function startOfLocalDayIso(date: Date) {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  return start.toISOString()
}

export async function generateOrderId(supabase: SupabaseClient) {
  const now = new Date()
  const prefix = `ORD-${formatDateStamp(now)}-`

  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfLocalDayIso(now))
    .like('order_id', `${prefix}%`)

  if (error) throw error

  const sequence = (count ?? 0) + 1
  return `${prefix}${String(sequence).padStart(3, '0')}`
}
