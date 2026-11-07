import { getFeaturedCatalogue } from '@/lib/catalogues'
import { getExteriorFinishCatalog } from '@/lib/finishCatalog'

export const EXTERIOR_LANDING_HREF = '/finishes/exterior'

export type ExteriorSubCollection = {
  slug: string
  eyebrow: string
  description: string
  href: string
  image: string
  available: boolean
}

export const EXTERIOR_SUB_COLLECTIONS: ExteriorSubCollection[] = getExteriorFinishCatalog().map(
  (entry) => ({
    slug: entry.slug,
    eyebrow: entry.eyebrow,
    description: entry.description,
    href: entry.href,
    image: entry.image,
    available: entry.available,
  })
)

export const EXTERIOR_WHY_CHOOSE = [
  {
    title: 'Exterior Applications',
    description: 'Stone Finish, Pebble Finish and Create Art for exterior walls.',
    icon: 'weather' as const,
  },
  {
    title: 'Finish Choice',
    description: 'Compare rough stone, smoother pebble and decorative designs.',
    icon: 'uv' as const,
  },
  {
    title: 'Preparation Guidance',
    description: 'Plan the base and application for your selected finish.',
    icon: 'durable' as const,
  },
  {
    title: 'Architectural Appeal',
    description: 'Timeless material-inspired aesthetics.',
    icon: 'appeal' as const,
  },
]

export const EXTERIOR_FEATURED_PROJECTS = [
  {
    name: 'Modern Villa',
    finish: 'Stone Finish',
    image: '/home_grid_2.png',
  },
  {
    name: 'Commercial Facade',
    finish: 'Pebble Finish',
    image: '/Finishes/exterior/stone-finish/hero/stone-finish-exterior-facade-beige-grooved-wall.webp',
  },
]

export function getExteriorCatalogue() {
  return getFeaturedCatalogue()
}
