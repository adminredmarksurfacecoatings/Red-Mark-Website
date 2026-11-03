import type { Metadata } from 'next'
import BrochureDownloadSection from '@/components/BrochureDownloadSection'
import CatalogueCard from '@/components/CatalogueCard'
import { getAdditionalCatalogues } from '@/lib/catalogues'
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

      <section className="page-section" aria-labelledby="shade-cards-heading">
        <div className="container catalogue-library">
          <h2 id="shade-cards-heading" className="catalogues-grid-section__heading">Collection Shade Cards</h2>
          <div className="catalogues-grid">
            {getAdditionalCatalogues().map(item => <CatalogueCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>
    </>
  )
}
