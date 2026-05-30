import type { Metadata } from 'next'
import FinishCollectionHero from '@/components/finish-collection/FinishCollectionHero'
import FinishCollectionShadeCardCta from '@/components/finish-collection/FinishCollectionShadeCardCta'
import FinishCollectionShadesGrid from '@/components/finish-collection/FinishCollectionShadesGrid'
import FinishCollectionSpecBar from '@/components/finish-collection/FinishCollectionSpecBar'
import { PEBBLE_FINISH_COLLECTION } from '@/lib/finishCollection/pebble'

export const metadata: Metadata = {
  title: 'Pebble Finish Collection — Exterior Collection',
  description:
    'Granular pebble textures for exterior walls and facades. Explore shades, specifications, and download the Pebble Finish shade card.',
}

export default function PebbleFinishPage() {
  return (
    <>
      <FinishCollectionHero config={PEBBLE_FINISH_COLLECTION} />
      <FinishCollectionShadesGrid config={PEBBLE_FINISH_COLLECTION} />
      <FinishCollectionSpecBar config={PEBBLE_FINISH_COLLECTION} />
      <FinishCollectionShadeCardCta config={PEBBLE_FINISH_COLLECTION} />
    </>
  )
}
