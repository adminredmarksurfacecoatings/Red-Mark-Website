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
    pdf: '/brochure/redmark-texture-edition-2026.pdf',
    downloadName: 'redmark-texture-edition-2026.pdf',
    cover: '/brochure/texture-edition-cover.webp',
    coverWidth: 1350,
    coverHeight: 1800,
    meta: ['15 Pages', 'Decorative Finishes', 'Interior & Exterior Applications'],
    badge: '2026 Edition',
    featured: true,
  },
  {
    "id": "stone-finish",
    "title": "Stone Finish Shade Card",
    "description": "Exterior stone-inspired finishes.",
    "pdf": "/Shadecards/stone-finish/shade-card/Stone%20finish%20SC.pdf",
    "downloadName": "stone-finish-shade-card.pdf",
    "cover": "/Shadecards/stone-finish/shade-card/cover.webp",
    "coverWidth": 4385,
    "coverHeight": 5260,
    "meta": [
      "Shade Card",
      "PDF"
    ]
  },
  {
    "id": "pebble-finish",
    "title": "Pebble Finish Shade Card",
    "description": "Granular textures for interior and exterior surfaces.",
    "pdf": "/Shadecards/pebble-finish/shade-card/Pebble%20SC.pdf",
    "downloadName": "pebble-finish-shade-card.pdf",
    "cover": "/Shadecards/pebble-finish/shade-card/cover.webp",
    "coverWidth": 4142,
    "coverHeight": 4937,
    "meta": [
      "Shade Card",
      "PDF"
    ]
  },
  {
    "id": "farry",
    "title": "Farry Shade Card",
    "description": "High-shine interior finishes in sixteen shades.",
    "pdf": "/Shadecards/farry/shade-card/Farry%20SC.pdf",
    "downloadName": "farry-shade-card.pdf",
    "cover": "/Shadecards/farry/shade-card/cover.webp",
    "coverWidth": 1194,
    "coverHeight": 1687,
    "meta": [
      "Shade Card",
      "PDF"
    ]
  },
  {
    "id": "create-art",
    "title": "Create Art Shade Card",
    "description": "Slate, Dropway, and Subaru interior texture families.",
    "pdf": "/Shadecards/create-art/shade-card/Create%20art%20SC.pdf",
    "downloadName": "create-art-shade-card.pdf",
    "cover": "/Shadecards/create-art/shade-card/cover.webp",
    "coverWidth": 4025,
    "coverHeight": 5017,
    "meta": [
      "Shade Card",
      "PDF"
    ]
  },
]

export function getFeaturedCatalogue() {
  return CATALOGUES.find((item) => item.featured) ?? CATALOGUES[0]
}

export function getAdditionalCatalogues() {
  return CATALOGUES.filter((item) => !item.featured)
}
