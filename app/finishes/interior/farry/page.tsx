import type { Metadata } from 'next'
import FinishCollectionHero from '@/components/finish-collection/FinishCollectionHero'
import FinishCollectionShadeCardCta from '@/components/finish-collection/FinishCollectionShadeCardCta'
import FinishCollectionShadesGrid from '@/components/finish-collection/FinishCollectionShadesGrid'
import FinishCollectionSpecBar from '@/components/finish-collection/FinishCollectionSpecBar'
import { FARRY_COLLECTION } from '@/lib/finishCollection/farry'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Farry High-Shine Wall Texture Finishes — 16 Shades',
  description:
    'Red Mark Farry — high-shine interior wall texture finishes in sixteen luminous shades. Explore the range, download the Farry shade card, and request a physical sample for true colour.',
  path: '/finishes/interior/farry',
  image: '/Shadecards/farry/shade-card/cover.jpg',
  imageAlt: 'Farry high-shine wall texture finishes by Red Mark',
})

export default function FarryPage() {
  return (
    <>
      <FinishCollectionHero config={FARRY_COLLECTION} />
      <FinishCollectionShadesGrid config={FARRY_COLLECTION} />
      <FinishCollectionSpecBar config={FARRY_COLLECTION} />
      <FinishCollectionShadeCardCta config={FARRY_COLLECTION} />
    </>
  )
}
