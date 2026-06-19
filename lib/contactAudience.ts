export type ContactAudience =
  | 'architect'
  | 'builder'
  | 'dealer'
  | 'homeowner'
  | 'contractor'

export const HOMEOWNER_ESCALATION_SQFT = 2500

export type AudienceOption = {
  id: ContactAudience
  label: string
  description: string
}

export const CONTACT_AUDIENCE_OPTIONS: AudienceOption[] = [
  {
    id: 'architect',
    label: 'Architect / Interior Designer',
    description: 'Samples, specifications, and project support.',
  },
  {
    id: 'builder',
    label: 'Builder / Developer',
    description: 'Commercial and large residential projects.',
  },
  {
    id: 'contractor',
    label: 'Contractor',
    description: 'Application guidance and material coordination.',
  },
  {
    id: 'homeowner',
    label: 'Homeowner',
    description: 'Local dealer availability and finish selection.',
  },
  {
    id: 'dealer',
    label: 'Dealer / Distributor',
    description: 'Partnership and distribution enquiries.',
  },
]

export function isContactAudience(value: string | null | undefined): value is ContactAudience {
  return CONTACT_AUDIENCE_OPTIONS.some((option) => option.id === value)
}

export function formSubjectForAudience(audience: ContactAudience): string {
  const labels: Record<ContactAudience, string> = {
    architect: 'Architect / Designer',
    builder: 'Builder / Developer',
    dealer: 'Dealer / Distributor',
    homeowner: 'Homeowner',
    contractor: 'Contractor',
  }
  return `[${labels[audience]}] Red Mark website enquiry`
}

export function parseAreaSqFt(value: string, unit: string): number | null {
  const num = Number.parseFloat(value.replace(/,/g, '').trim())
  if (!Number.isFinite(num) || num <= 0) return null

  switch (unit) {
    case 'sq m':
      return num * 10.7639
    case 'sq yd':
      return num * 9
    default:
      return num
  }
}

export function homeownerNeedsEscalation(areaValue: string, unit: string): boolean {
  const sqFt = parseAreaSqFt(areaValue, unit)
  if (sqFt === null) return false
  return sqFt >= HOMEOWNER_ESCALATION_SQFT
}
