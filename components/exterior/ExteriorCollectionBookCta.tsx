import Image from 'next/image'
import Link from 'next/link'
import { getExteriorCatalogue } from '@/lib/exteriorCollections'

export default function ExteriorCollectionBookCta() {
  const catalogue = getExteriorCatalogue()

  return (
    <section
      id="exterior-collection-book"
      className="exterior-landing-brochure page-section"
      aria-labelledby="exterior-brochure-heading"
    >
      <div className="exterior-landing-brochure__container container">
        <div className="exterior-landing-brochure__grid">
          <div className="exterior-landing-brochure__visual">
            <a
              href={catalogue.pdf}
              className="homepage-brochure__mockup-link"
              download={catalogue.downloadName}
              aria-label="Download the Exterior Collection Book (PDF)"
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
                    quality={75}
                    className="homepage-brochure__cover"
                  />
                </div>
              </div>
            </a>
          </div>

          <div className="exterior-landing-brochure__content">
            <h2 id="exterior-brochure-heading" className="exterior-landing-brochure__heading">
              Download The Exterior Collection Book
            </h2>

            <p className="exterior-landing-brochure__description">
              Explore available finishes, texture options, and recommended applications in a curated
              architectural guide.
            </p>

            <div className="exterior-landing-brochure__actions">
              <a
                href={catalogue.pdf}
                className="btn exterior-landing-brochure__download"
                download={catalogue.downloadName}
              >
                Download Collection Book
              </a>
              <Link href="/contact" className="homepage-brochure__contact">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
