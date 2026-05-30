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
    title: 'Weather Resistant',
    description: 'Designed for changing climates.',
    icon: 'weather' as const,
  },
  {
    title: 'UV Stable',
    description: 'Long-lasting colour performance.',
    icon: 'uv' as const,
  },
  {
    title: 'Durable Surface',
    description: 'Built for everyday exposure.',
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
    image: '/Stone_hero.png',
  },
  {
    name: 'Resort Exterior',
    finish: 'Mineral Textures',
    image: '/section_2.png',
  },
  {
    name: 'Boundary Wall',
    finish: 'Decorative Exterior',
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png',
  },
]

export function getExteriorCatalogue() {
  return getFeaturedCatalogue()
}
