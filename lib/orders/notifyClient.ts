import type { OrderEmailAlertPayload } from '@/lib/orders/notificationTypes'

export async function requestOrderEmailAlert(payload: OrderEmailAlertPayload) {
  try {
    const response = await fetch('/api/orders/notify', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.warn('Order email alert failed:', await response.text())
    }
  } catch (error) {
    console.warn('Order email alert failed:', error)
  }
}

export function showBrowserNotification(title: string, body: string) {
  if (typeof window === 'undefined' || typeof Notification === 'undefined') return
  if (Notification.permission !== 'granted') return

  try {
    new Notification(title, { body })
  } catch {
    // Ignore unsupported environments
  }
}

export async function requestBrowserNotificationPermission() {
  if (typeof window === 'undefined' || typeof Notification === 'undefined') return
  if (Notification.permission !== 'default') return Notification.permission

  try {
    return await Notification.requestPermission()
  } catch {
    return Notification.permission
  }
}
