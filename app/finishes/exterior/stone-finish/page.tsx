import type { Metadata } from 'next'
import FinishCollectionDetails from '@/components/finish-collection/FinishCollectionDetails'
import FinishCollectionHero from '@/components/finish-collection/FinishCollectionHero'
import FinishCollectionShadeCardCta from '@/components/finish-collection/FinishCollectionShadeCardCta'
import FinishCollectionShadesGrid from '@/components/finish-collection/FinishCollectionShadesGrid'
import FinishCollectionSpecBar from '@/components/finish-collection/FinishCollectionSpecBar'
import { STONE_FINISH_COLLECTION } from '@/lib/finishCollection/stone'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: "Stone Finish Marble Texture for Walls | Red Mark",
  absoluteTitle: true,
  description:
    "Explore rough marble texture for interior and exterior walls and mouldings. View 48 Stone Finish shades, pack coverage, application details and free samples.",
  path: '/finishes/exterior/stone-finish',
  image: '/Finishes/exterior/stone-finish/hero/stone-finish-exterior-facade-beige-grooved-wall.jpg',
  imageAlt: 'Red Mark Stone Finish exterior wall texture',
})

export default function StoneFinishPage() {
  return (
    <>
      <FinishCollectionHero config={STONE_FINISH_COLLECTION} />
      <FinishCollectionSpecBar config={STONE_FINISH_COLLECTION} />
      <FinishCollectionDetails config={STONE_FINISH_COLLECTION} />
      <FinishCollectionShadesGrid config={STONE_FINISH_COLLECTION} />
      <FinishCollectionShadeCardCta config={STONE_FINISH_COLLECTION} />
    </>
  )
}
