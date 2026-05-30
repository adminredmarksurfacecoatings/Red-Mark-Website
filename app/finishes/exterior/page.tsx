import type { Metadata } from 'next'
import ExteriorCollectionBookCta from '@/components/exterior/ExteriorCollectionBookCta'
import ExteriorFeaturedProjects from '@/components/exterior/ExteriorFeaturedProjects'
import ExteriorFinalCta from '@/components/exterior/ExteriorFinalCta'
import ExteriorLandingHero from '@/components/exterior/ExteriorLandingHero'
import ExteriorSubCollectionGrid from '@/components/exterior/ExteriorSubCollectionGrid'
import ExteriorWhyChoose from '@/components/exterior/ExteriorWhyChoose'

export const metadata: Metadata = {
  title: 'Exterior Collection',
  description:
    'Explore Red Mark exterior surface finishes — stone, pebble, mineral textures, and decorative coatings crafted for enduring architecture.',
}

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
