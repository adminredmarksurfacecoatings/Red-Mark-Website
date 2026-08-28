'use client'

import FinishCollectionShadeSwatch from '@/components/finish-collection/FinishCollectionShadeSwatch'
import type { FinishCollectionConfig, FinishShade } from '@/lib/finishCollection/types'

type FinishCollectionShadesGridProps = {
  config: FinishCollectionConfig
}

function ShadeGrid({ shades }: { shades: FinishShade[] }) {
  return (
    <div className="stone-finish-shades__grid">
      {shades.map((shade) => (
        <FinishCollectionShadeSwatch
          key={shade.code}
          code={shade.code}
          name={shade.name}
          image={shade.image}
          fallbackImage={shade.fallbackImage}
        />
      ))}
    </div>
  )
}

export default function FinishCollectionShadesGrid({ config }: FinishCollectionShadesGridProps) {
  const headingId = `${config.slug}-shades-heading`

  return (
    <section className="stone-finish-shades page-section" aria-labelledby={headingId}>
      <div className="stone-finish-shades__container container">
        <div className="stone-finish-shades__header">
          <div className="stone-finish-shades__header-main">
            <p className="stone-finish-shades__eyebrow">{config.shadesSection.eyebrow}</p>
            <h2 id={headingId} className="stone-finish-shades__heading">
              {config.shadesSection.heading}
            </h2>
          </div>
          <p className="stone-finish-shades__intro">{config.shadesSection.intro}</p>
        </div>

        {config.shadesSection.note ? (
          <div className="stone-finish-shades__warning" role="alert">
            <p className="stone-finish-shades__warning-text">{config.shadesSection.note}</p>
          </div>
        ) : null}

        {config.shadeGroups && config.shadeGroups.length > 0 ? (
          <div className="stone-finish-shades__groups">
            {config.shadeGroups.map((group) => (
              <div key={group.id} className="stone-finish-shades__group">
                <h3 className="stone-finish-shades__group-heading">{group.heading}</h3>
                <ShadeGrid shades={group.shades} />
              </div>
            ))}
          </div>
        ) : (
          <ShadeGrid shades={config.shades} />
        )}
      </div>

      <style jsx>{`
        .stone-finish-shades__groups {
          display: grid;
          gap: 4rem;
        }

        .stone-finish-shades__group-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.75rem, 2.4vw, 2.25rem);
          font-weight: 500;
          color: #2b2b2b;
          letter-spacing: -0.01em;
          margin: 0 0 2rem;
        }

        .stone-finish-shades__warning {
          margin: -1.25rem 0 2.5rem;
          max-width: 46rem;
          padding: 1rem 1.15rem;
          border-left: 3px solid #8b4513;
          background: rgba(139, 69, 19, 0.06);
        }

        .stone-finish-shades__warning-text {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.55;
          color: #4a3a32;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .stone-finish-shades__groups {
            gap: 3rem;
          }
        }
      `}</style>
    </section>
  )
}
