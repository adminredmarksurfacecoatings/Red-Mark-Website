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
    slug: 'farry',
    eyebrow: 'FARRY',
    title: 'Farry',
    description:
      'High-sheen decorative finishes for interior walls, available in sixteen shades and 1 L or 4 L packs.',
    href: '/finishes/interior/farry',
    image: '/Shadecards/farry/shade-card/cover.webp',
    available: true,
    applications: ['interior'],
    featured: true,
  },
  {
    slug: 'stone-finish',
    eyebrow: 'STONE FINISH',
    title: 'Stone Finish',
    description:
      'Rough marble texture for interior and exterior cemented walls and mouldings, especially suited to exteriors.',
    href: '/finishes/exterior/stone-finish',
    image: '/Finishes/exterior/stone-finish/hero/stone-finish-exterior-facade-beige-grooved-wall.webp',
    available: true,
    applications: ['interior', 'exterior'],
    featured: true,
  },
  {
    slug: 'pebble-finish',
    eyebrow: 'PEBBLE FINISH',
    title: 'Pebble Finish',
    description:
      'A smoother marble texture for interior and exterior cemented walls, applied in two trowel coats.',
    href: '/finishes/exterior/pebble-finish',
    image: '/Finishes/mediterranean-textured-wall-arched-loggia.png',
    available: true,
    applications: ['interior', 'exterior'],
  },
  {
    slug: 'create-art',
    eyebrow: 'CREATE ART',
    title: 'Create Art',
    description:
      'Decorative interior and exterior textures using white design material, TC 200 sealer and Oxido colour coat.',
    href: '/finishes/interior/create-art',
    image: '/Shadecards/create-art/shade-card/cover.webp',
    available: true,
    applications: ['interior', 'exterior'],
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
