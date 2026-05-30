import type { Metadata } from 'next'
import ExteriorSubCollectionPlaceholder from '@/components/exterior/ExteriorSubCollectionPlaceholder'

export const metadata: Metadata = {
  title: 'Mineral Textures — Exterior Collection',
  description:
    'Architectural exterior finishes inspired by natural materials and handcrafted surfaces.',
}

export default function MineralTexturesPage() {
  return (
    <ExteriorSubCollectionPlaceholder
      eyebrow="Mineral Textures"
      title="Mineral Textures"
      description="Architectural finishes inspired by natural materials and handcrafted surfaces. This collection is being prepared — contact our team for early guidance."
    />
  )
}
