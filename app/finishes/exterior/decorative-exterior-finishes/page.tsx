import type { Metadata } from 'next'
import ExteriorSubCollectionPlaceholder from '@/components/exterior/ExteriorSubCollectionPlaceholder'

export const metadata: Metadata = {
  title: 'Decorative Exterior Finishes — Exterior Collection',
  description: 'Statement textures and specialty exterior finishes for premium architectural projects.',
}

export default function DecorativeExteriorFinishesPage() {
  return (
    <ExteriorSubCollectionPlaceholder
      eyebrow="Decorative Exterior Finishes"
      title="Decorative Exterior Finishes"
      description="Statement textures and specialty finishes for premium projects. This collection is being prepared — contact our team to discuss bespoke applications."
    />
  )
}
