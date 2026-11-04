import type { FormEvent } from 'react'
import { whatsappHref } from '@/lib/contact'

export function openWhatsAppEnquiry(event: FormEvent<HTMLFormElement>, introduction: string) {
  event.preventDefault()
  const lines = [introduction]
  new FormData(event.currentTarget).forEach((value, label) => {
    if (typeof value === 'string' && value.trim()) lines.push(`${label}: ${value.trim()}`)
  })
  window.location.assign(whatsappHref(lines.join('\n')))
}
