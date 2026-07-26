import type { Metadata } from 'next'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.redmarksurfacecoatings.com'

export const SITE_NAME = 'Red Mark Surface Coatings'

/** Default social share image (PNG/JPG — avoid SVG for OG previews). */
export const DEFAULT_OG_IMAGE = '/Stone_hero.png'

type PageSeoInput = {
  /** Browser / SERP title. With the root template becomes "{title} | Red Mark Surface Coatings" unless absolute. */
  title: string
  description: string
  /** Path starting with `/`, e.g. `/projects` */
  path: string
  /** Use for homepage so the template suffix is not appended. */
  absoluteTitle?: boolean
  image?: string
  imageAlt?: string
  noIndex?: boolean
  type?: 'website' | 'article'
}

function absUrl(path: string) {
  const base = SITE_URL.replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized === '/' ? '' : normalized}` || base
}

/**
 * Builds complete Metadata including unique Open Graph + Twitter tags.
 * Child pages must set openGraph/twitter themselves — root layout OG alone
 * would otherwise be reused on every route.
 */
export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = DEFAULT_OG_IMAGE,
  imageAlt = SITE_NAME,
  noIndex = false,
  type = 'website',
}: PageSeoInput): Metadata {
  const url = absUrl(path)
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  }
}
