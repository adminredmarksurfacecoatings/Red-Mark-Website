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
    { url: absUrl('/find-a-dealer'), changeFrequency: 'monthly', priority: 0.75 },
    { url: absUrl('/contact'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/projects'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/finishes'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/catalogues'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/finishes/interior'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absUrl('/finishes/exterior'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absUrl('/finishes/all'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absUrl('/finishes/exterior/stone-finish'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/finishes/exterior/stone-finish/request-sample'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/finishes/exterior/pebble-finish'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/finishes/exterior/pebble-finish/request-sample'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/finishes/interior/create-art'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/finishes/interior/create-art/request-sample'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/finishes/exterior/mineral-textures'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/finishes/exterior/decorative-exterior-finishes'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/collections/interior'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/collections/all'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/for-professionals'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absUrl('/for-professionals/architects'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/for-professionals/builders'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absUrl('/for-professionals/dealers'), changeFrequency: 'monthly', priority: 0.6 },
  ]
}

