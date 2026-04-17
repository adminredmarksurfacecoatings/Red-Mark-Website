import type { Metadata } from 'next'
import './globals.css'
import GlobalMotionEffects from '@/components/GlobalMotionEffects'
import SiteChrome from '@/components/SiteChrome'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.redmarksurfacecoatings.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: '5qy25uPPQVJILHPSEIEFv06LjNvYUxNJpaoPJJ2gYxw',
  },
  title: {
    default: 'Red Mark Surface Coatings',
    template: '%s | Red Mark Surface Coatings',
  },
  description:
    'Architectural mineral finishes with depth, texture, and long-term performance for refined spaces.',
  icons: {
    icon: '/Logo.png',
  },
  openGraph: {
    title: 'Red Mark Surface Coatings',
    description:
      'Architectural mineral finishes with depth, texture, and long-term performance for refined spaces.',
    url: siteUrl,
    siteName: 'Red Mark Surface Coatings',
    images: [
      {
        url: '/Logo.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Red Mark Surface Coatings',
    description:
      'Architectural mineral finishes with depth, texture, and long-term performance for refined spaces.',
    images: ['/Logo.png'],
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
      </body>
    </html>
  )
}
