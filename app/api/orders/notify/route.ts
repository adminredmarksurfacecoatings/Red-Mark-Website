import { NextResponse } from 'next/server'
import { assertStaffSession } from '@/lib/orders/assertStaffSession'
import type { OrderEmailAlertPayload } from '@/lib/orders/notificationTypes'
import { sanitizeOrderEmailAlert } from '@/lib/orders/sanitizeAlert'
import { sendOrderAlertEmail } from '@/lib/orders/sendOrderAlertEmail'

export async function POST(request: Request) {
  const session = await assertStaffSession()
  if (!session.ok) {
    return NextResponse.json({ error: session.error }, { status: session.status })
  }

  const { supabase, user } = session

  let raw: OrderEmailAlertPayload
  try {
    raw = (await request.json()) as OrderEmailAlertPayload
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const payload = sanitizeOrderEmailAlert(raw)
  if (!payload) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('order_id')
    .eq('order_id', payload.orderRef)
    .maybeSingle()

  if (orderError || !order) {
    return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
  }

  try {
    await sendOrderAlertEmail({
      ...payload,
      updatedBy: user.email ?? 'staff',
    })
    return NextResponse.json({ sent: true })
  } catch {
    return NextResponse.json({ error: 'Could not send alert.' }, { status: 502 })
  }
}
