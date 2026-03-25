import type { MetadataRoute } from 'next'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.redmarksurfacecoatings.com'

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl.replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // This page is primarily a form-confirmation/utility page.
      disallow: ['/thank-you'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}

