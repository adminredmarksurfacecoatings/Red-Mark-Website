import type { Metadata } from 'next'
import FinishLandingHero from '@/components/finish-landing/FinishLandingHero'
import FinishSubCollectionGrid from '@/components/finish-landing/FinishSubCollectionGrid'
import ExteriorFinalCta from '@/components/exterior/ExteriorFinalCta'
import { getAllFinishCatalog } from '@/lib/finishCatalog'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'All Finish Collections — Interior & Exterior',
  description:
    'Browse the complete Red Mark range — Stone Finish, Pebble Finish, Create Art and Farry for interior and exterior applications.',
  path: '/finishes/all',
  image: '/home_grid_3.png',
  imageAlt: 'Complete Red Mark finish collections overview',
})

export default function AllFinishesPage() {
  const allFinishes = getAllFinishCatalog()

  return (
    <>
      <FinishLandingHero
        eyebrow="All Collections"
        heading="The Complete Red Mark Finish Range"
        lead="Explore every Red Mark finish collection in one place — from exterior stone systems to interior and exterior pebble textures."
        support="Stone Finish, Pebble Finish and Create Art for interiors and exteriors; Farry for interiors."
        image="/home_grid_3.png"
        imageAlt="Curated architectural finish collections"
        browseHref="#explore-all-collections"
      />
      <FinishSubCollectionGrid
        id="explore-all-collections"
        heading="Explore All Collections"
        intro="Each collection offers a distinct material expression for interior and exterior architectural applications."
        collections={allFinishes}
        showApplications
      />
      <ExteriorFinalCta />
    </>
  )
}
