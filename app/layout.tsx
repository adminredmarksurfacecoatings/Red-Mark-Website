import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import './globals-dealer.css'
import GlobalMotionEffects from '@/components/GlobalMotionEffects'
import SiteChrome from '@/components/SiteChrome'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: '5qy25uPPQVJILHPSEIEFv06LjNvYUxNJpaoPJJ2gYxw',
  },
  title: {
    default: `${SITE_NAME} | Architectural Wall Textures & Mineral Finishes India`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Architectural mineral finishes and wall textures with depth, durability, and refined character for interiors and exteriors across India.',
  icons: {
    icon: '/Logo.svg',
  },
  // Intentionally minimal OG defaults — each page should call createPageMetadata()
  // so title/description/url are unique. These only apply if a route omits OG.
  openGraph: {
    siteName: SITE_NAME,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GlobalMotionEffects />
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
