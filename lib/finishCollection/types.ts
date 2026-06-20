export type FinishFeatureIcon = 'weather' | 'uv' | 'durable'

export type FinishSpecIcon = 'ideal' | 'character' | 'performance' | 'application'

export type FinishShade = {
  code: string
  name: string
  image: string
  fallbackImage: string
}

export type FinishShadeGroup = {
  id: string
  heading: string
  shades: FinishShade[]
}

export type FinishShadeCard = {
  pdf: string
  downloadName: string
  cover: string
  coverFallback: string
  coverWidth: number
  coverHeight: number
}

export type FinishCollectionConfig = {
  slug: string
  title: string
  collectionTitle: string
  eyebrow: string
  breadcrumbLabel: string
  /** Optional parent hub in breadcrumbs, e.g. Exterior Collection */
  collectionHubHref?: string
  collectionHubLabel?: string
  pageHref: string
  requestSampleHref: string
  heroLead: string
  heroImage: string
  heroImageFallback: string
  heroImageAlt: string
  shadeCard: FinishShadeCard
  shadeCardSectionId: string
  shades: FinishShade[]
  /** When set, shades render in grouped sections (e.g. Create Art families). */
  shadeGroups?: FinishShadeGroup[]
  specs: Array<{ label: string; value: string; icon: FinishSpecIcon }>
  heroFeatures: Array<{ label: string; icon: FinishFeatureIcon }>
  shadesSection: {
    eyebrow: string
    heading: string
    intro: string
  }
  ctaSection: {
    eyebrow: string
    heading: string
    description: string
  }
  specAriaLabel: string
}

export type FinishRequestSampleConfig = {
  slug: string
  title: string
  eyebrow: string
  backHref: string
  breadcrumbLabel: string
  collectionHubHref?: string
  collectionHubLabel?: string
  requestSampleHref: string
  formSubject: string
  shadeCodePattern: RegExp
  shades: FinishShade[]
}

export function shadeImagePath(collectionSlug: string, code: string) {
  return `/Shadecards/${collectionSlug}/single-shades/${code}/swatch.webp`
}

export function shadeCardPdfPath(collectionSlug: string, filename: string) {
  return `/Shadecards/${collectionSlug}/shade-card/${encodeURIComponent(filename)}`
}

export function matchFinishShade(
  shades: FinishShade[],
  query: string,
  codePattern: RegExp
) {
  const trimmed = query.trim()
  if (!trimmed) return undefined

  const codeMatch = trimmed.match(codePattern)
  if (codeMatch) {
    const byCode = shades.find((shade) => shade.code.toLowerCase() === codeMatch[0].toLowerCase())
    if (byCode) return byCode
  }

  const byExactCode = shades.find((shade) => shade.code.toLowerCase() === trimmed.toLowerCase())
  if (byExactCode) return byExactCode

  const lower = trimmed.toLowerCase()
  return shades.find(
    (shade) =>
      shade.name.toLowerCase() === lower ||
      shade.name.toLowerCase().includes(lower) ||
      `${shade.code} — ${shade.name}`.toLowerCase() === lower ||
      `${shade.code} - ${shade.name}`.toLowerCase() === lower
  )
}
