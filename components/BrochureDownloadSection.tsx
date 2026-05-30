import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { getFeaturedCatalogue } from '@/lib/catalogues'

type BrochureDownloadSectionProps = {
  showCataloguesLink?: boolean
}

export default function BrochureDownloadSection({ showCataloguesLink = false }: BrochureDownloadSectionProps) {
  const catalogue = getFeaturedCatalogue()

  return (
    <section
      id="homepage-brochure"
      className="homepage-brochure page-section"
      aria-labelledby="homepage-brochure-heading"
    >
      <div className="homepage-brochure__container container">
        <div className="homepage-brochure__grid">
          <div className="homepage-brochure__content">
            <p className="homepage-brochure__eyebrow">Collection Book</p>

            <h2 id="homepage-brochure-heading" className="homepage-brochure__heading">
              Download the Red Mark Collection Book
            </h2>

            <p className="homepage-brochure__description">{catalogue.description}</p>

            <ul className="homepage-brochure__meta" aria-label="Brochure details">
              {catalogue.meta.map((entry, index) => (
                <Fragment key={entry}>
                  {index > 0 ? (
                    <li aria-hidden="true" className="homepage-brochure__meta-sep">
                      •
                    </li>
                  ) : null}
                  <li>{entry}</li>
                </Fragment>
              ))}
            </ul>

            <div className="homepage-brochure__actions">
              <a
                href={catalogue.pdf}
                className="btn homepage-brochure__download"
                download={catalogue.downloadName}
                aria-label="Download the Red Mark Collection Book brochure (PDF)"
              >
                Download Brochure →
              </a>
              <Link href="/contact" className="homepage-brochure__contact">
                Contact Us
              </Link>
            </div>

            {showCataloguesLink ? (
              <Link href="/catalogues" className="homepage-brochure__catalogues-link">
                View all catalogues →
              </Link>
            ) : null}
          </div>

          <div className="homepage-brochure__visual">
            <a
              href={catalogue.pdf}
              className="homepage-brochure__mockup-link"
              download={catalogue.downloadName}
              aria-label="Download the Red Mark Collection Book (PDF)"
            >
              <div className="homepage-brochure__mockup">
                <div className="homepage-brochure__mockup-page">
                  {catalogue.badge ? (
                    <span className="homepage-brochure__badge">{catalogue.badge}</span>
                  ) : null}
                  <Image
                    src={catalogue.cover}
                    alt=""
                    width={catalogue.coverWidth}
                    height={catalogue.coverHeight}
                    sizes="(max-width: 768px) 68vw, 300px"
                    quality={90}
                    loading="lazy"
                    className="homepage-brochure__cover"
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
