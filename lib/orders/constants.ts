export const ORDER_TYPES = ['Regular', 'Special'] as const

export const OVERALL_STATUSES = [
  'New',
  'In Progress',
  'Ready',
  'Attention',
  'Delivered',
] as const

export const FACTORY_STATUSES = ['Pending', 'In Production', 'Quality Check', 'Ready'] as const

export const LOCATIONS = ['Office', 'Factory', 'In Transit', 'With Customer'] as const

export type StatusTone = 'ready' | 'progress' | 'attention' | 'neutral'

export function overallStatusTone(status: string): StatusTone {
  const value = status.toLowerCase()
  if (value.includes('ready') || value.includes('delivered')) return 'ready'
  if (value.includes('attention') || value.includes('hold') || value.includes('issue')) {
    return 'attention'
  }
  if (value.includes('progress') || value === 'new') return 'progress'
  return 'neutral'
}
