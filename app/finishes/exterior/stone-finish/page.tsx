import type { Metadata } from 'next'
import FinishCollectionHero from '@/components/finish-collection/FinishCollectionHero'
import FinishCollectionShadeCardCta from '@/components/finish-collection/FinishCollectionShadeCardCta'
import FinishCollectionShadesGrid from '@/components/finish-collection/FinishCollectionShadesGrid'
import FinishCollectionSpecBar from '@/components/finish-collection/FinishCollectionSpecBar'
import { STONE_FINISH_COLLECTION } from '@/lib/finishCollection/stone'

export const metadata: Metadata = {
  title: 'Stone Finish Collection — Exterior Collection',
  description:
    'Timeless stone textures for exterior walls and facades. Explore shades, specifications, and download the Stone Finish shade card.',
}

export default function StoneFinishPage() {
  return (
    <>
      <FinishCollectionHero config={STONE_FINISH_COLLECTION} />
      <FinishCollectionShadesGrid config={STONE_FINISH_COLLECTION} />
      <FinishCollectionSpecBar config={STONE_FINISH_COLLECTION} />
      <FinishCollectionShadeCardCta config={STONE_FINISH_COLLECTION} />
    </>
  )
}
