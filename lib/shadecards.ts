/** Public URL root for all finish shade card assets (PDFs, covers, single-shade swatches). */
export const SHADECARDS_ROOT = '/Shadecards'

export function shadecardCollectionBase(slug: string) {
  return `${SHADECARDS_ROOT}/${slug}`
}

export function shadecardPdfPath(collectionSlug: string, filename: string) {
  return `${shadecardCollectionBase(collectionSlug)}/shade-card/${encodeURIComponent(filename)}`
}

export function shadecardCoverPath(collectionSlug: string, format: 'webp' | 'jpg' = 'webp') {
  return `${shadecardCollectionBase(collectionSlug)}/shade-card/cover.${format}`
}

export function shadecardSwatchPath(collectionSlug: string, code: string, format: 'webp' | 'jpg' = 'webp') {
  return `${shadecardCollectionBase(collectionSlug)}/single-shades/${code}/swatch.${format}`
}
