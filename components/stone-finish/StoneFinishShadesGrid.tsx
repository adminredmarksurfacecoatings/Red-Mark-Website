import StoneFinishShadeSwatch from '@/components/stone-finish/StoneFinishShadeSwatch'
import { STONE_FINISH_SHADES } from '@/lib/stoneFinishShades'

export default function StoneFinishShadesGrid() {
  return (
    <section className="stone-finish-shades page-section" aria-labelledby="stone-finish-shades-heading">
      <div className="stone-finish-shades__container container">
        <div className="stone-finish-shades__header">
          <div className="stone-finish-shades__header-main">
            <p className="stone-finish-shades__eyebrow">Stone Finish Shades</p>
            <h2 id="stone-finish-shades-heading" className="stone-finish-shades__heading">
              Natural tones. Timeless appeal.
            </h2>
          </div>
          <p className="stone-finish-shades__intro">
            A curated palette of stone-inspired textures designed for modern exteriors.
          </p>
        </div>

        <div className="stone-finish-shades__grid">
          {STONE_FINISH_SHADES.map((shade) => (
            <StoneFinishShadeSwatch
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
