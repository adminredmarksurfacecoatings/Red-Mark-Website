/** Shared contact / WhatsApp helpers for CTAs across the site. */

export const CONTACT_WHATSAPP_NUMBER = '918968310500'

export function whatsappHref(message: string) {
  return `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const CONTACT_WHATSAPP_HREF = whatsappHref('Hi Red Mark, I have a question about a wall texture. Can you help me choose a finish?')

export const CONTACT_EMAIL = 'info@redmarksurfacecoatings.com'
export const CONTACT_PHONE_INDIA = '+918968310500'
export const CONTACT_PHONE_INDIA_DISPLAY = '+91 89683 10500'
export const CONTACT_PHONE_CANADA = '+15144464255'
export const CONTACT_PHONE_CANADA_DISPLAY = '+1 514 446 4255'
