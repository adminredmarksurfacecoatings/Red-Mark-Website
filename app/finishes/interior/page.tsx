import type { Metadata } from 'next'
import FinishLandingHero from '@/components/finish-landing/FinishLandingHero'
import FinishSubCollectionGrid from '@/components/finish-landing/FinishSubCollectionGrid'
import ExteriorFinalCta from '@/components/exterior/ExteriorFinalCta'
import { getInteriorFinishCatalog } from '@/lib/finishCatalog'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Interior Wall Textures & Mineral Finishes',
  description:
    'Explore Red Mark interior wall textures and mineral finishes — Create Art and decorative coatings crafted for refined residential and commercial interiors.',
  path: '/finishes/interior',
  image: '/home_grid_1.png',
  imageAlt: 'Interior mineral wall texture by Red Mark',
})

export default function InteriorFinishesPage() {
  const interiorFinishes = getInteriorFinishCatalog()

  return (
    <>
      <FinishLandingHero
        eyebrow="Interior Collection"
        heading="Interior Finishes Designed For Refined Spaces"
        lead="Explore Red Mark interior surface finishes crafted for depth, texture, and timeless architectural character."
        support="Curated mineral and pebble textures for residential, commercial, and hospitality interiors."
        image="/home_grid_1.png"
        imageAlt="Interior wall with textured mineral finish"
        browseHref="#explore-interior-collections"
      />
      <FinishSubCollectionGrid
        id="explore-interior-collections"
        heading="Explore Interior Collections"
        intro="Each finish collection offers a unique material expression for calm, character-rich interior spaces."
        collections={interiorFinishes}
      />
      <ExteriorFinalCta />
    </>
  )
}
