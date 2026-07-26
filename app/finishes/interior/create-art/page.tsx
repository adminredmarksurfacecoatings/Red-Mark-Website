import type { Metadata } from 'next'
import FinishCollectionHero from '@/components/finish-collection/FinishCollectionHero'
import FinishCollectionShadeCardCta from '@/components/finish-collection/FinishCollectionShadeCardCta'
import FinishCollectionShadesGrid from '@/components/finish-collection/FinishCollectionShadesGrid'
import FinishCollectionSpecBar from '@/components/finish-collection/FinishCollectionSpecBar'
import { CREATE_ART_COLLECTION } from '@/lib/finishCollection/create-art'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Create Art Interior Wall Texture — Slate, Dropway & Subaru',
  description:
    'Red Mark Create Art — decorative interior wall textures in Slate, Dropway, and Subaru families. Explore named shades, specs, and download the Create Art shade card.',
  path: '/finishes/interior/create-art',
  image: '/home_hero_interior_1.png',
  imageAlt: 'Red Mark Create Art interior wall texture',
})

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
