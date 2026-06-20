export const DEALER_CONNECTION_FORM_SUBJECT = '[Dealer Connection] Red Mark website enquiry'

export const DEALER_CONNECTION_AUTORESPONSE =
  'Thank you for contacting Red Mark Surface Coatings. We will connect you with the authorized dealer for your area and they will reach out shortly — typically within 24–48 hours.'

/** Public service regions — no dealer names or contact details. */
export const DEALER_SERVICE_REGIONS = ['Ludhiana', 'Punjab', 'Expanding across India']

export const DEALER_CONNECTION_STEPS = [
  {
    title: 'Tell us about your project',
    text: 'Share your city, finish interest, and approximate scope so we can route you correctly.',
  },
  {
    title: 'We match you locally',
    text: 'Red Mark assigns the authorized dealer for your area from our partner network.',
  },
  {
    title: 'Your dealer contacts you',
    text: 'The dealer confirms shades, availability, and next steps — you deal locally, product quality stays Red Mark.',
  },
] as const

export const DEALER_FINISH_INTERESTS = [
  'Stone Finish',
  'Pebble Finish',
  'Create Art',
  'Mineral Textures',
  'Decorative Coatings',
  'Not sure yet',
] as const

export const DEALER_PROJECT_TYPES = [
  'Residential Interiors',
  'Residential Exteriors',
  'Exterior Facades',
  'Commercial Spaces',
  'Hospitality Projects',
  'Not Sure / Need Guidance',
] as const

export function normalizeFinishInterest(value: string | null | undefined): string {
  if (!value?.trim()) return ''
  const trimmed = value.trim()
  const match = DEALER_FINISH_INTERESTS.find(
    (item) => item.toLowerCase() === trimmed.toLowerCase()
  )
  return match ?? trimmed
}
