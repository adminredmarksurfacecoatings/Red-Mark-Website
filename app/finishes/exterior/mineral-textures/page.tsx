import type { Metadata } from 'next'
import ExteriorSubCollectionPlaceholder from '@/components/exterior/ExteriorSubCollectionPlaceholder'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Mineral Textures Exterior Finishes — Coming Soon',
  description:
    'Red Mark Mineral Textures — architectural exterior finishes inspired by natural materials. Collection in preparation; contact us for early project guidance.',
  path: '/finishes/exterior/mineral-textures',
})

export default function MineralTexturesPage() {
  return (
    <ExteriorSubCollectionPlaceholder
      eyebrow="Mineral Textures"
      title="Mineral Textures"
      description="Architectural finishes inspired by natural materials and handcrafted surfaces. This collection is being prepared — contact our team for early guidance."
    />
  )
}
