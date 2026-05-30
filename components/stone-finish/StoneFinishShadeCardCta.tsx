import Link from 'next/link'
import StoneFinishAssetImage from '@/components/stone-finish/StoneFinishAssetImage'
import { STONE_FINISH_SHADE_CARD } from '@/lib/stoneFinishShades'

export default function StoneFinishShadeCardCta() {
  return (
    <section
      id="stone-finish-shade-card"
      className="stone-finish-cta page-section"
      aria-labelledby="stone-finish-cta-heading"
    >
      <div className="stone-finish-cta__container container">
        <div className="stone-finish-cta__banner">
          <div className="stone-finish-cta__visual">
            <a
              href={STONE_FINISH_SHADE_CARD.pdf}
              className="stone-finish-cta__mockup-link"
              download={STONE_FINISH_SHADE_CARD.downloadName}
              aria-label="Download the Stone Finish shade card (PDF)"
            >
              <div className="stone-finish-cta__mockup">
                <StoneFinishAssetImage
                  primarySrc={STONE_FINISH_SHADE_CARD.cover}
                  fallbackSrc={STONE_FINISH_SHADE_CARD.coverFallback}
                  alt=""
                  width={STONE_FINISH_SHADE_CARD.coverWidth}
                  height={STONE_FINISH_SHADE_CARD.coverHeight}
                  className="stone-finish-cta__cover"
                />
              </div>
            </a>
          </div>

          <div className="stone-finish-cta__content">
            <p className="stone-finish-cta__eyebrow">Explore the Complete Range</p>
            <h2 id="stone-finish-cta-heading" className="stone-finish-cta__heading">
              Stone Finish Shade Card
            </h2>
            <p className="stone-finish-cta__description">
              View all shades in detail and find the perfect tone for your project.
            </p>
          </div>

          <div className="stone-finish-cta__actions">
            <a
              href={STONE_FINISH_SHADE_CARD.pdf}
              className="btn stone-finish-cta__download"
              download={STONE_FINISH_SHADE_CARD.downloadName}
            >
              Download Shade Card
            </a>
            <Link href="/finishes/exterior/stone-finish/request-sample" className="stone-finish-cta__sample">
              Request Sample
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
