import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

function absUrl(path: string) {
  const base = SITE_URL.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

type PageEntry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

/**
 * Portfolio / presentation sitemap — indexable marketing pages only.
 * Live at: https://www.redmarksurfacecoatings.com/sitemap.xml
 * Submit that URL in Google Search Console → Sitemaps.
 */
const PAGES: PageEntry[] = [
  // Core portfolio
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/finishes', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/catalogues', changeFrequency: 'monthly', priority: 0.8 },

  // Finish collections
  { path: '/finishes/exterior', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/finishes/interior', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/finishes/all', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/finishes/exterior/stone-finish', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/finishes/exterior/pebble-finish', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/finishes/interior/create-art', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/finishes/exterior/mineral-textures', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/finishes/exterior/decorative-exterior-finishes', changeFrequency: 'yearly', priority: 0.4 },

  // Connect / professionals
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/find-a-dealer', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/for-professionals', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/for-professionals/architects', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/for-professionals/builders', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/for-professionals/dealers', changeFrequency: 'monthly', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return PAGES.map(({ path, changeFrequency, priority }) => ({
    url: absUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }))
}
