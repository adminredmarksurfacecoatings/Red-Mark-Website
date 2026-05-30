import Image from 'next/image'
import Link from 'next/link'
import {
  formatFinishApplications,
  type FinishCatalogEntry,
} from '@/lib/finishCatalog'

type FinishSubCollectionGridProps = {
  id: string
  heading: string
  intro: string
  collections: FinishCatalogEntry[]
  showApplications?: boolean
}

export default function FinishSubCollectionGrid({
  id,
  heading,
  intro,
  collections,
  showApplications = false,
}: FinishSubCollectionGridProps) {
  return (
    <section
      id={id}
      className="exterior-landing-grid page-section"
      aria-labelledby={`${id}-heading`}
    >
      <div className="exterior-landing-grid__container container">
        <header className="exterior-landing-grid__header">
          <h2 id={`${id}-heading`} className="exterior-landing-grid__heading">
            {heading}
          </h2>
          <p className="exterior-landing-grid__intro">{intro}</p>
        </header>

        <div className="exterior-landing-grid__cards">
          {collections.map((collection) => (
            <article key={collection.slug} className="exterior-landing-card">
              <Link href={collection.href} className="exterior-landing-card__link">
                <div className="exterior-landing-card__image-wrap">
                  <Image
                    src={collection.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    quality={75}
                    className="exterior-landing-card__image"
                  />
                </div>

                {showApplications ? (
                  <p className="exterior-landing-card__applications">
                    {formatFinishApplications(collection.applications)}
                  </p>
                ) : null}

                <p className="exterior-landing-card__eyebrow">{collection.eyebrow}</p>

                <p className="exterior-landing-card__description">{collection.description}</p>

                <span className="exterior-landing-card__cta">
                  {collection.available ? 'Explore Collection →' : 'View Collection →'}
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
