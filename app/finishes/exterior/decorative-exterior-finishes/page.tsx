import type { Metadata } from 'next'
import ExteriorSubCollectionPlaceholder from '@/components/exterior/ExteriorSubCollectionPlaceholder'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Decorative Exterior Finishes — Specialty Wall Textures',
  description:
    'Red Mark decorative exterior finishes — statement textures and specialty coatings for premium architectural projects. Contact us for bespoke applications.',
  path: '/finishes/exterior/decorative-exterior-finishes',
})

export default function DecorativeExteriorFinishesPage() {
  return (
    <ExteriorSubCollectionPlaceholder
      eyebrow="Decorative Exterior Finishes"
      title="Decorative Exterior Finishes"
      description="Statement textures and specialty finishes for premium projects. This collection is being prepared — contact our team to discuss bespoke applications."
    />
  )
}
