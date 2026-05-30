import Image from 'next/image'
import { Fragment } from 'react'
import type { CatalogueItem } from '@/lib/catalogues'

type CatalogueCardProps = {
  item: CatalogueItem
}

export default function CatalogueCard({ item }: CatalogueCardProps) {
  return (
    <article className="catalogue-card">
      <a
        href={item.pdf}
        className="catalogue-card__mockup-link"
        download={item.downloadName}
        aria-label={`Download ${item.title} (PDF)`}
      >
        <div className="catalogue-card__mockup">
          <div className="catalogue-card__mockup-page">
            {item.badge ? <span className="catalogue-card__badge">{item.badge}</span> : null}
            <Image
              src={item.cover}
              alt=""
              width={item.coverWidth}
              height={item.coverHeight}
              sizes="(max-width: 768px) 100vw, 280px"
              quality={88}
              loading="lazy"
              className="catalogue-card__cover"
            />
          </div>
        </div>
      </a>

      <div className="catalogue-card__body">
        <h3 className="catalogue-card__title">{item.title}</h3>
        <p className="catalogue-card__description">{item.description}</p>
        <ul className="catalogue-card__meta" aria-label={`${item.title} details`}>
          {item.meta.map((entry, index) => (
            <Fragment key={entry}>
              {index > 0 ? (
                <li aria-hidden="true" className="catalogue-card__meta-sep">
                  •
                </li>
              ) : null}
              <li>{entry}</li>
            </Fragment>
          ))}
        </ul>
        <a
          href={item.pdf}
          className="catalogue-card__download"
          download={item.downloadName}
          aria-label={`Download ${item.title} (PDF)`}
        >
          Download PDF →
        </a>
      </div>
    </article>
  )
}
