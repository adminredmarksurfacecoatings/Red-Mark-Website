import Link from 'next/link'
import FinishCollectionAssetImage from '@/components/finish-collection/FinishCollectionAssetImage'
import type { FinishCollectionConfig } from '@/lib/finishCollection/types'

type FinishCollectionShadeCardCtaProps = {
  config: FinishCollectionConfig
}

export default function FinishCollectionShadeCardCta({ config }: FinishCollectionShadeCardCtaProps) {
  const headingId = `${config.slug}-shade-card-heading`

  return (
    <section
      id={config.shadeCardSectionId}
      className="stone-finish-cta page-section"
      aria-labelledby={headingId}
    >
      <div className="stone-finish-cta__container container">
        <div className="stone-finish-cta__banner">
          <div className="stone-finish-cta__visual">
            <a
              href={config.shadeCard.pdf}
              className="stone-finish-cta__mockup-link"
              download={config.shadeCard.downloadName}
              aria-label={`Download the ${config.title} shade card (PDF)`}
            >
              <div className="stone-finish-cta__mockup">
                <FinishCollectionAssetImage
                  primarySrc={config.shadeCard.cover}
                  fallbackSrc={config.shadeCard.coverFallback}
                  alt=""
                  width={config.shadeCard.coverWidth}
                  height={config.shadeCard.coverHeight}
                  className="stone-finish-cta__cover"
                />
              </div>
            </a>
          </div>

          <div className="stone-finish-cta__content">
            <p className="stone-finish-cta__eyebrow">{config.ctaSection.eyebrow}</p>
            <h2 id={headingId} className="stone-finish-cta__heading">
              {config.ctaSection.heading}
            </h2>
            <p className="stone-finish-cta__description">{config.ctaSection.description}</p>
          </div>

          <div className="stone-finish-cta__actions">
            <a
              href={config.shadeCard.pdf}
              className="btn stone-finish-cta__download"
              download={config.shadeCard.downloadName}
            >
              Download Shade Card
            </a>
            <Link href={config.requestSampleHref} className="stone-finish-cta__sample">
              Request Sample
            </Link>
            <Link
              href={`/find-a-dealer?finish=${encodeURIComponent(config.title)}`}
              className="stone-finish-cta__dealer"
            >
              Get Connected
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
