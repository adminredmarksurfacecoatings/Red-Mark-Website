import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/thank-you', '/admin', '/admin/'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}

