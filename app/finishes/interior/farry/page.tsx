import type { Metadata } from 'next'
import FinishCollectionDetails from '@/components/finish-collection/FinishCollectionDetails'
import FinishCollectionHero from '@/components/finish-collection/FinishCollectionHero'
import FinishCollectionShadeCardCta from '@/components/finish-collection/FinishCollectionShadeCardCta'
import FinishCollectionShadesGrid from '@/components/finish-collection/FinishCollectionShadesGrid'
import FinishCollectionSpecBar from '@/components/finish-collection/FinishCollectionSpecBar'
import { FARRY_COLLECTION } from '@/lib/finishCollection/farry'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: "Farry High-Sheen Interior Finish",
  description:
    "High-sheen interior wall finish in sixteen shades. Available in 1 L and 4 L packs, covering approximately 50–60 sq ft per litre. Explore samples.",
  path: '/finishes/interior/farry',
  image: '/Shadecards/farry/shade-card/cover.jpg',
  imageAlt: 'Farry high-sheen wall texture finishes by Red Mark',
})

export default function FarryPage() {
  return (
    <>
      <FinishCollectionHero config={FARRY_COLLECTION} />
      <FinishCollectionSpecBar config={FARRY_COLLECTION} />
      <FinishCollectionDetails config={FARRY_COLLECTION} />
      <FinishCollectionShadesGrid config={FARRY_COLLECTION} />
      <FinishCollectionShadeCardCta config={FARRY_COLLECTION} />
    </>
  )
}
