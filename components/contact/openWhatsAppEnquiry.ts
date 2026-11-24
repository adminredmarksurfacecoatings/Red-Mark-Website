import type { FormEvent } from 'react'
import { whatsappHref } from '@/lib/contact'

export function openWhatsAppEnquiry(event: FormEvent<HTMLFormElement>, introduction: string) {
  event.preventDefault()
  if (!event.currentTarget.reportValidity()) return
  const consent = event.currentTarget.elements.namedItem('Enquiry consent')
  if (!(consent instanceof HTMLInputElement) || !consent.checked) return
  const lines = [introduction]
  new FormData(event.currentTarget).forEach((value, label) => {
    if (typeof value === 'string' && value.trim()) lines.push(`${label}: ${value.trim()}`)
  })
  window.location.assign(whatsappHref(lines.join('\n')))
}
