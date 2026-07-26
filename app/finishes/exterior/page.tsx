import type { Metadata } from 'next'
import ExteriorCollectionBookCta from '@/components/exterior/ExteriorCollectionBookCta'
import ExteriorFeaturedProjects from '@/components/exterior/ExteriorFeaturedProjects'
import ExteriorFinalCta from '@/components/exterior/ExteriorFinalCta'
import ExteriorLandingHero from '@/components/exterior/ExteriorLandingHero'
import ExteriorSubCollectionGrid from '@/components/exterior/ExteriorSubCollectionGrid'
import ExteriorWhyChoose from '@/components/exterior/ExteriorWhyChoose'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Exterior Wall Textures — Stone, Pebble & Mineral',
  description:
    'Explore Red Mark exterior wall textures — stone finish, pebble finish, mineral textures, and decorative coatings engineered for durable architectural facades.',
  path: '/finishes/exterior',
  image: '/Stone_hero.png',
  imageAlt: 'Exterior stone wall texture finish by Red Mark',
})

export default function ExteriorCollectionLandingPage() {
  return (
    <>
      <ExteriorLandingHero />
      <ExteriorSubCollectionGrid />
      <ExteriorWhyChoose />
      <ExteriorFeaturedProjects />
      <ExteriorCollectionBookCta />
      <ExteriorFinalCta />
    </>
  )
}
