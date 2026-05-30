import Image from 'next/image'
import Link from 'next/link'
import { getExteriorCatalogue } from '@/lib/exteriorCollections'

export default function ExteriorLandingHero() {
  const catalogue = getExteriorCatalogue()

  return (
    <section className="exterior-landing-hero page-section page-section--first">
      <div className="exterior-landing-hero__container container">
        <div className="exterior-landing-hero__grid">
          <div className="exterior-landing-hero__content">
            <p className="exterior-landing-hero__eyebrow">Exterior Collection</p>

            <h1 className="exterior-landing-hero__heading">
              Exterior Finishes Designed For Enduring Architecture
            </h1>

            <p className="exterior-landing-hero__lead">
              Explore Red Mark&apos;s curated range of exterior surface finishes crafted for
              durability, weather resistance, texture, and timeless architectural appeal.
            </p>

            <p className="exterior-landing-hero__support">
              Mineral textures, stone finishes, pebble finishes, and decorative exterior coatings
              for residential, commercial, and hospitality projects.
            </p>

            <div className="exterior-landing-hero__actions">
              <a href="#explore-exterior-collections" className="btn exterior-landing-hero__primary">
                Browse Collections →
              </a>
              <a
                href={catalogue.pdf}
                className="exterior-landing-hero__secondary"
                download={catalogue.downloadName}
              >
                Download Collection Book
              </a>
            </div>
          </div>

          <div className="exterior-landing-hero__visual">
            <div className="exterior-landing-hero__image-wrap">
              <Image
                src="/home_grid_2.png"
                alt="Contemporary exterior wall with textured mineral finish"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                quality={75}
                priority
                className="exterior-landing-hero__image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
