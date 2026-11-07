import type { Metadata } from 'next'
import HomePageClient from '@/components/home/HomePageClient'
import { createPageMetadata } from '@/lib/seo'
import { fetchFinishesPageImages } from '@/lib/supabase/mediaLibrary'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = createPageMetadata({
  title: 'Wall Textures & Decorative Finishes in India | Red Mark',
  absoluteTitle: true,
  description:
    'Explore marble texture wall coatings, Stone Finish, Pebble Finish, Create Art and Farry. Compare shades and request free texture samples from Red Mark in India.',
  path: '/',
  image: '/Stone_hero.png',
  imageAlt: 'Red Mark architectural wall texture and mineral finish',
})

export default async function HomePage() {
  const finishesImages = (await fetchFinishesPageImages()).slice(0, 12)
  return <HomePageClient finishesImages={finishesImages} />
}
