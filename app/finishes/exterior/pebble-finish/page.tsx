import type { Metadata } from 'next'
import FinishCollectionDetails from '@/components/finish-collection/FinishCollectionDetails'
import FinishCollectionHero from '@/components/finish-collection/FinishCollectionHero'
import FinishCollectionShadeCardCta from '@/components/finish-collection/FinishCollectionShadeCardCta'
import FinishCollectionShadesGrid from '@/components/finish-collection/FinishCollectionShadesGrid'
import FinishCollectionSpecBar from '@/components/finish-collection/FinishCollectionSpecBar'
import { PEBBLE_FINISH_COLLECTION } from '@/lib/finishCollection/pebble'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: "Pebble Finish Marble Texture for Walls | Red Mark",
  absoluteTitle: true,
  description:
    "Explore smoother marble texture for interior and exterior walls. View Pebble Finish shades, two-coat application, pack coverage and free sample options.",
  path: '/finishes/exterior/pebble-finish',
  image: '/home_hero_2.png',
  imageAlt: 'Red Mark Pebble Finish exterior wall texture',
})

export default function PebbleFinishPage() {
  return (
    <>
      <FinishCollectionHero config={PEBBLE_FINISH_COLLECTION} />
      <FinishCollectionSpecBar config={PEBBLE_FINISH_COLLECTION} />
      <FinishCollectionDetails config={PEBBLE_FINISH_COLLECTION} />
      <FinishCollectionShadesGrid config={PEBBLE_FINISH_COLLECTION} />
      <FinishCollectionShadeCardCta config={PEBBLE_FINISH_COLLECTION} />
    </>
  )
}
