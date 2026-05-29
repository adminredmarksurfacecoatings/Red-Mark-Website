import Image from 'next/image'
import Link from 'next/link'

const BROCHURE_PDF = '/brochure/REDMARKPPT.pdf'
const BROCHURE_COVER = '/brochure/collection-book-cover.webp'

export default function BrochureDownloadSection() {
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

            <p className="homepage-brochure__description">
              Explore our complete range of mineral finishes, decorative textures, exterior coatings,
              metallic effects, and surface solutions in one curated guide.
            </p>

            <ul className="homepage-brochure__meta" aria-label="Brochure details">
              <li>15 Pages</li>
              <li aria-hidden="true" className="homepage-brochure__meta-sep">
                •
              </li>
              <li>Decorative Finishes</li>
              <li aria-hidden="true" className="homepage-brochure__meta-sep">
                •
              </li>
              <li>Interior &amp; Exterior Applications</li>
            </ul>

            <div className="homepage-brochure__actions">
              <a
                href={BROCHURE_PDF}
                className="btn homepage-brochure__download"
                download="Red-Mark-Collection-Book.pdf"
                aria-label="Download the Red Mark Collection Book brochure (PDF)"
              >
                Download Brochure →
              </a>
              <Link href="/contact" className="homepage-brochure__contact">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="homepage-brochure__visual">
            <a
              href={BROCHURE_PDF}
              className="homepage-brochure__mockup-link"
              download="Red-Mark-Collection-Book.pdf"
              aria-label="Download the Red Mark Collection Book (PDF)"
            >
              <div className="homepage-brochure__mockup">
                <div className="homepage-brochure__mockup-page">
                  <span className="homepage-brochure__badge">2026 Edition</span>
                  <Image
                    src={BROCHURE_COVER}
                    alt=""
                    width={1350}
                    height={1800}
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
