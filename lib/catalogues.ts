export type CatalogueItem = {
  id: string
  title: string
  description: string
  pdf: string
  downloadName: string
  cover: string
  coverWidth: number
  coverHeight: number
  meta: string[]
  badge?: string
  featured?: boolean
}

export const CATALOGUES: CatalogueItem[] = [
  {
    id: 'collection-book',
    title: 'Red Mark Collection Book',
    description:
      'Explore our complete range of mineral finishes, decorative textures, exterior coatings, metallic effects, and surface solutions in one curated guide.',
    pdf: '/brochure/REDMARKPPT.pdf',
    downloadName: 'Red-Mark-Collection-Book.pdf',
    cover: '/brochure/collection-book-cover.webp',
    coverWidth: 1350,
    coverHeight: 1800,
    meta: ['15 Pages', 'Decorative Finishes', 'Interior & Exterior Applications'],
    badge: '2026 Edition',
    featured: true,
  },
]

export function getFeaturedCatalogue() {
  return CATALOGUES.find((item) => item.featured) ?? CATALOGUES[0]
}

export function getAdditionalCatalogues() {
  return CATALOGUES.filter((item) => !item.featured)
}
