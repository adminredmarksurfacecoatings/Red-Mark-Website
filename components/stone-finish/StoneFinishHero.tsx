import Link from 'next/link'
import StoneFinishAssetImage from '@/components/stone-finish/StoneFinishAssetImage'
import StoneFinishBreadcrumbs from '@/components/stone-finish/StoneFinishBreadcrumbs'
import {
  STONE_FINISH_HERO_FEATURES,
  STONE_FINISH_HERO_FALLBACK,
  STONE_FINISH_HERO_IMAGE,
  STONE_FINISH_SHADE_CARD,
} from '@/lib/stoneFinishShades'

function HeroFeatureIcon({ type }: { type: (typeof STONE_FINISH_HERO_FEATURES)[number]['icon'] }) {
  const stroke = 'currentColor'

  switch (type) {
    case 'weather':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path
            d="M6 15h10a3.5 3.5 0 0 0 .25-7A5 5 0 0 0 7.5 8.5 3 3 0 0 0 6 15Z"
            stroke={stroke}
            strokeWidth="1.1"
          />
        </svg>
      )
    case 'uv':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="3.5" stroke={stroke} strokeWidth="1.1" />
          <path
            d="M11 3v2M11 17v2M3 11h2M17 11h2M5.5 5.5l1.4 1.4M15.1 15.1l1.4 1.4M5.5 16.5l1.4-1.4M15.1 6.9l1.4-1.4"
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'durable':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path
            d="M11 4.5 5.5 7.5v5c0 3.8 2.6 6.4 5.5 7 2.9-.6 5.5-3.2 5.5-7v-5L11 4.5Z"
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path d="M8.5 11.5 10 13l3.5-3.5" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
  }
}

export default function StoneFinishHero() {
  return (
    <section className="stone-finish-hero page-section page-section--first">
      <div className="stone-finish-hero__container container">
        <StoneFinishBreadcrumbs />

        <div className="stone-finish-hero__grid">
          <div className="stone-finish-hero__content">
            <p className="stone-finish-hero__eyebrow">Exterior Collection</p>

            <h1 className="stone-finish-hero__heading">Stone Finish Collection</h1>

            <p className="stone-finish-hero__lead">
              Timeless stone textures crafted for exterior walls, facades, and architectural surfaces
              — offering natural depth, weather resistance, and enduring appeal.
            </p>

            <ul className="stone-finish-hero__features">
              {STONE_FINISH_HERO_FEATURES.map((feature) => (
                <li key={feature.label} className="stone-finish-hero__feature">
                  <span className="stone-finish-hero__feature-icon">
                    <HeroFeatureIcon type={feature.icon} />
                  </span>
                  <span className="stone-finish-hero__feature-label">{feature.label}</span>
                </li>
              ))}
            </ul>

            <div className="stone-finish-hero__actions">
              <a
                href={STONE_FINISH_SHADE_CARD.pdf}
                className="btn stone-finish-hero__download"
                download={STONE_FINISH_SHADE_CARD.downloadName}
              >
                <DownloadIcon />
                Download Shade Card
              </a>
              <Link
                href="/finishes/exterior/stone-finish/request-sample"
                className="stone-finish-hero__sample"
              >
                Request Sample
              </Link>
            </div>
          </div>

          <div className="stone-finish-hero__visual">
            <div className="stone-finish-hero__image-wrap">
              <StoneFinishAssetImage
                primarySrc={STONE_FINISH_HERO_IMAGE}
                fallbackSrc={STONE_FINISH_HERO_FALLBACK}
                alt="Stone finish exterior on a contemporary facade"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
                className="stone-finish-hero__image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 2.5v7.5M5 7l3 3 3-3M3 12.5h10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
