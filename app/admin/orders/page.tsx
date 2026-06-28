import type { Metadata } from 'next'
import OrdersAdminApp from '@/components/admin/orders/OrdersAdminApp'
import './orders-admin.css'

export const metadata: Metadata = {
  title: 'Orders',
  robots: { index: false, follow: false },
}

export default function AdminOrdersPage() {
  return <OrdersAdminApp />
}
