import { STONE_FINISH_SPECS } from '@/lib/stoneFinishShades'

function SpecIcon({ type }: { type: (typeof STONE_FINISH_SPECS)[number]['icon'] }) {
  const stroke = 'currentColor'

  switch (type) {
    case 'ideal':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="8" width="6" height="12" stroke={stroke} strokeWidth="1.1" />
          <rect x="14" y="4" width="6" height="16" stroke={stroke} strokeWidth="1.1" />
        </svg>
      )
    case 'character':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 8h16M4 12h16M4 16h16" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
    case 'performance':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3 5 6.5v6c0 4.2 3 7.2 7 8 4-0.8 7-3.8 7-8v-6L12 3Z"
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'application':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 18 14 9l3 3-9 9H5v-3Z"
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path d="M13 8l3-3 3 3-3 3-3-3Z" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      )
  }
}

export default function StoneFinishSpecBar() {
  return (
    <section className="stone-finish-spec page-section" aria-label="Stone finish specifications">
      <div className="stone-finish-spec__container container">
        <div className="stone-finish-spec__bar">
          {STONE_FINISH_SPECS.map((spec, index) => (
            <article
              key={spec.label}
              className={`stone-finish-spec__item${index < STONE_FINISH_SPECS.length - 1 ? ' stone-finish-spec__item--divider' : ''}`}
            >
              <div className="stone-finish-spec__icon">
                <SpecIcon type={spec.icon} />
              </div>
              <p className="stone-finish-spec__label">{spec.label}</p>
              <p className="stone-finish-spec__value">{spec.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
