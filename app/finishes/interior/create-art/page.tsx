import type { Metadata } from 'next'
import FinishCollectionDetails from '@/components/finish-collection/FinishCollectionDetails'
import FinishCollectionHero from '@/components/finish-collection/FinishCollectionHero'
import FinishCollectionShadeCardCta from '@/components/finish-collection/FinishCollectionShadeCardCta'
import FinishCollectionShadesGrid from '@/components/finish-collection/FinishCollectionShadesGrid'
import FinishCollectionSpecBar from '@/components/finish-collection/FinishCollectionSpecBar'
import { CREATE_ART_COLLECTION } from '@/lib/finishCollection/create-art'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: "Create Art Wall Textures",
  description:
    "Interior and exterior decorative textures with white design material, TC 200 sealer and Oxido colour coat. Explore shades, coverage and samples.",
  path: '/finishes/interior/create-art',
  image: '/home_hero_interior_1.png',
  imageAlt: 'Red Mark Create Art interior wall texture',
})

export default function CreateArtPage() {
  return (
    <>
      <FinishCollectionHero config={CREATE_ART_COLLECTION} />
      <FinishCollectionSpecBar config={CREATE_ART_COLLECTION} />
      <FinishCollectionDetails config={CREATE_ART_COLLECTION} />
      <FinishCollectionShadesGrid config={CREATE_ART_COLLECTION} />
      <FinishCollectionShadeCardCta config={CREATE_ART_COLLECTION} />
    </>
  )
}
