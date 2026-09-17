import type { Metadata } from 'next'
import BrochureDownloadSection from '@/components/BrochureDownloadSection'
import FeaturedFinishesSection from '@/components/home/FeaturedFinishesSection'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Product Catalogues & Shade Guides Download',
  description:
    'Download Red Mark collection books, shade cards, and specification guides for decorative mineral finishes and architectural wall textures.',
  path: '/catalogues',
})

export default function CataloguesPage() {
  return (
    <>
      <section
        className="page-section page-section--first catalogues-hero"
        style={{ backgroundColor: '#f7f4ef', textAlign: 'center' }}
      >
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <p className="catalogues-hero__eyebrow">Product Literature</p>
          <h1 className="catalogues-hero__heading">Catalogues</h1>
          <p className="catalogues-hero__description">
            Curated collection books and product guides for specifying Red Mark mineral finishes,
            decorative textures, and exterior surface systems.
          </p>
        </div>
      </section>

      <BrochureDownloadSection />

      <FeaturedFinishesSection standalone />
    </>
  )
}
