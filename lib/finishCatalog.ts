export type FinishApplication = 'interior' | 'exterior'

export type FinishCatalogEntry = {
  slug: string
  eyebrow: string
  title: string
  description: string
  href: string
  image: string
  available: boolean
  applications: FinishApplication[]
  /** Homepage featured finish row */
  featured?: boolean
}

export const FINISH_CATALOG: FinishCatalogEntry[] = [
  {
    slug: 'stone-finish',
    eyebrow: 'STONE FINISH',
    title: 'Stone Finish',
    description:
      'Natural stone-inspired textures with depth, elegance, and lasting durability for exterior architecture.',
    href: '/finishes/exterior/stone-finish',
    image: '/Stone_hero.png',
    available: true,
    applications: ['exterior'],
    featured: true,
  },
  {
    slug: 'pebble-finish',
    eyebrow: 'PEBBLE FINISH',
    title: 'Pebble Finish',
    description:
      'Granular mineral textures designed for visual richness across interior and exterior applications.',
    href: '/finishes/exterior/pebble-finish',
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png',
    available: true,
    applications: ['interior', 'exterior'],
    featured: true,
  },
  {
    slug: 'create-art',
    eyebrow: 'CREATE ART',
    title: 'Create Art',
    description:
      'Expressive decorative textures for interior feature walls — Slate, Dropway, and Subaru families with artisan depth.',
    href: '/finishes/interior/create-art',
    image: '/Shadecards/create-art/shade-card/cover.webp',
    available: true,
    applications: ['interior'],
  },
  {
    slug: 'mineral-textures',
    eyebrow: 'MINERAL TEXTURES',
    title: 'Mineral Textures',
    description:
      'Architectural finishes inspired by natural materials and handcrafted surfaces.',
    href: '/finishes/exterior/mineral-textures',
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_17_23-PM.png',
    available: false,
    applications: ['exterior'],
  },
  {
    slug: 'decorative-exterior-finishes',
    eyebrow: 'DECORATIVE EXTERIOR FINISHES',
    title: 'Decorative Exterior Finishes',
    description: 'Statement textures and specialty finishes for premium projects.',
    href: '/finishes/exterior/decorative-exterior-finishes',
    image: '/section_2.png',
    available: false,
    applications: ['exterior'],
  },
]

export const INTERIOR_LANDING_HREF = '/finishes/interior'
export const ALL_FINISHES_HREF = '/finishes/all'

export function getFinishesForApplication(application: FinishApplication) {
  return FINISH_CATALOG.filter((entry) => entry.applications.includes(application))
}

export function getExteriorFinishCatalog() {
  return getFinishesForApplication('exterior')
}

export function getInteriorFinishCatalog() {
  return getFinishesForApplication('interior')
}

export function getAllFinishCatalog() {
  return FINISH_CATALOG
}

export function formatFinishApplications(applications: FinishApplication[]) {
  if (applications.includes('interior') && applications.includes('exterior')) {
    return 'Interior & Exterior'
  }
  return applications[0] === 'exterior' ? 'Exterior' : 'Interior'
}

export function getFinishCatalogEntry(slug: string) {
  return FINISH_CATALOG.find((entry) => entry.slug === slug)
}

export function getFeaturedFinishes() {
  return FINISH_CATALOG.filter((entry) => entry.featured)
}

export function getPrimaryFeaturedFinish() {
  return getFeaturedFinishes()[0]
}

export function getSecondaryFeaturedFinishes() {
  return getFeaturedFinishes().slice(1)
}
