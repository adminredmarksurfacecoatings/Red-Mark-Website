import type { Metadata } from 'next'
import HomePageClient from '@/components/home/HomePageClient'
import { createPageMetadata } from '@/lib/seo'
import { fetchFinishesPageImages } from '@/lib/supabase/mediaLibrary'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = createPageMetadata({
  title: 'Red Mark Surface Coatings | Architectural Wall Textures & Mineral Finishes India',
  absoluteTitle: true,
  description:
    'Red Mark crafts architectural mineral finishes and wall textures for homes and projects across India — stone, pebble, and decorative surfaces with lasting depth and performance.',
  path: '/',
  image: '/Stone_hero.png',
  imageAlt: 'Red Mark architectural wall texture and mineral finish',
})

export default async function HomePage() {
  const finishesImages = (await fetchFinishesPageImages()).slice(0, 12)
  return <HomePageClient finishesImages={finishesImages} />
}
