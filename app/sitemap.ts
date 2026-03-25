import type { MetadataRoute } from 'next'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.redmarksurfacecoatings.com'

function absUrl(path: string) {
  const base = siteUrl.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Keep this list to your indexable, marketing pages.
  // Avoid conversion/utility pages like `/thank-you`.
  return [
    { url: absUrl('/') },
    { url: absUrl('/about'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/contact'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/projects'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/finishes'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/collections/mineral'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/collections/exterior'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/collections/stone'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/for-professionals'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/for-professionals/architects'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/for-professionals/builders'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/for-professionals/dealers'), changeFrequency: 'monthly', priority: 0.6 },
  ]
}

