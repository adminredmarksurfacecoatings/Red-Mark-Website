import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  title: 'Red Mark Surface Coatings',
  description: 'Architectural mineral surfaces and textured finishes.',
  icons: {
    icon: '/Logo.png',
  },
  openGraph: {
    title: 'Red Mark Surface Coatings',
    description: 'Architectural mineral surfaces and textured finishes.',
    url: 'https://yourdomain.com',
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
    description: 'Architectural mineral surfaces and textured finishes.',
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
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
