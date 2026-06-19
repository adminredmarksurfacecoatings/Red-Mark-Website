import FinishCollectionShadeSwatch from '@/components/finish-collection/FinishCollectionShadeSwatch'
import type { FinishCollectionConfig } from '@/lib/finishCollection/types'

type FinishCollectionShadesGridProps = {
  config: FinishCollectionConfig
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

        <div className="stone-finish-shades__grid">
          {config.shades.map((shade) => (
            <FinishCollectionShadeSwatch
              key={shade.code}
              code={shade.code}
              name={shade.name}
              image={shade.image}
              fallbackImage={shade.fallbackImage}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
