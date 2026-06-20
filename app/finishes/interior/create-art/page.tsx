import type { Metadata } from 'next'
import FinishCollectionHero from '@/components/finish-collection/FinishCollectionHero'
import FinishCollectionShadeCardCta from '@/components/finish-collection/FinishCollectionShadeCardCta'
import FinishCollectionShadesGrid from '@/components/finish-collection/FinishCollectionShadesGrid'
import FinishCollectionSpecBar from '@/components/finish-collection/FinishCollectionSpecBar'
import { CREATE_ART_COLLECTION } from '@/lib/finishCollection/create-art'

export const metadata: Metadata = {
  title: 'Create Art Collection — Interior Collection',
  description:
    'Decorative interior textures in Slate, Dropway, and Subaru families. Explore shades, specifications, and download the Create Art shade card.',
}

export default function CreateArtPage() {
  return (
    <>
      <FinishCollectionHero config={CREATE_ART_COLLECTION} />
      <FinishCollectionShadesGrid config={CREATE_ART_COLLECTION} />
      <FinishCollectionSpecBar config={CREATE_ART_COLLECTION} />
      <FinishCollectionShadeCardCta config={CREATE_ART_COLLECTION} />
    </>
  )
}
