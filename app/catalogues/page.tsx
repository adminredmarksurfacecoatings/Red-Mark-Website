import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import BrochureDownloadSection from '@/components/BrochureDownloadSection'
import CatalogueCard from '@/components/CatalogueCard'
import { getAdditionalCatalogues } from '@/lib/catalogues'

export const metadata: Metadata = {
  title: 'Catalogues',
  description:
    'Download Red Mark product literature, collection books, and specification guides for decorative and architectural surface finishes.',
}

const professionalLinks = [
  { label: 'Architects', href: '/for-professionals/architects' },
  { label: 'Builders', href: '/for-professionals/builders' },
  { label: 'Dealers', href: '/for-professionals/dealers' },
]

export default function CataloguesPage() {
  const additionalCatalogues = getAdditionalCatalogues()

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

      {additionalCatalogues.length > 0 ? (
        <section className="page-section catalogues-grid-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
            <h2 className="catalogues-grid-section__heading">Additional Literature</h2>
            <div className="catalogues-grid">
              {additionalCatalogues.map((item) => (
                <CatalogueCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-section catalogues-professionals" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container catalogues-professionals__inner">
          <div className="catalogues-professionals__content">
            <p className="catalogues-professionals__eyebrow">For Professionals</p>
            <h2 className="catalogues-professionals__heading">Specification &amp; project support</h2>
            <p className="catalogues-professionals__description">
              Architects, builders, and dealers can access tailored guidance, samples, and partnership
              information for specifying Red Mark surfaces.
            </p>
            <ul className="catalogues-professionals__links">
              {professionalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="catalogues-professionals__link">
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="catalogues-professionals__visual" aria-hidden="true">
            <div className="catalogues-professionals__frame">
              <Image
                src="/brochure/collection-book-cover.webp"
                alt=""
                width={1350}
                height={1800}
                sizes="(max-width: 768px) 70vw, 240px"
                quality={85}
                loading="lazy"
                className="catalogues-professionals__image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
