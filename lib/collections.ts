import type { MediaFolderId } from '@/lib/supabase/mediaLibrary'

export type CollectionSlug = 'interior' | 'exterior' | 'all'

export type CollectionDefinition = {
  slug: CollectionSlug
  title: string
  description: string
  image: string
  href: string
  /** Supabase folder for single-collection pages. Null = aggregate all finish folders. */
  storageId: MediaFolderId | null
  featured?: boolean
}

export const COLLECTIONS: CollectionDefinition[] = [
  {
    slug: 'interior',
    title: 'Interior',
    description: 'Refined mineral finishes for calm, character-rich interior spaces.',
    image: '/home_grid_1.png',
    href: '/finishes/interior',
    storageId: 'stone',
  },
  {
    slug: 'exterior',
    title: 'Exterior',
    description: 'Durable surface systems engineered for enduring architectural exteriors.',
    image: '/home_grid_2.png',
    href: '/finishes/exterior',
    storageId: 'exterior',
    featured: true,
  },
  {
    slug: 'all',
    title: 'All',
    description: 'Explore the complete Red Mark range — decorative textures for every application.',
    image: '/home_grid_3.png',
    href: '/finishes/all',
    storageId: null,
  },
]

export function getCollection(slug: CollectionSlug) {
  return COLLECTIONS.find((item) => item.slug === slug)
}

export function getFeaturedCollection() {
  return COLLECTIONS.find((item) => item.featured) ?? COLLECTIONS[0]
}

export function getSecondaryCollections() {
  return COLLECTIONS.filter((item) => !item.featured)
}

/** Homepage / finishes grid order: Interior, Exterior, All */
export function getCollectionsForNav() {
  return COLLECTIONS
}

export function getNextCollection(slug: CollectionSlug): CollectionDefinition {
  const index = COLLECTIONS.findIndex((item) => item.slug === slug)
  const next = COLLECTIONS[(index + 1) % COLLECTIONS.length]
  return next
}
