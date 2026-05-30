import { EXTERIOR_WHY_CHOOSE } from '@/lib/exteriorCollections'

function ExteriorWhyIcon({ type }: { type: (typeof EXTERIOR_WHY_CHOOSE)[number]['icon'] }) {
  const stroke = 'currentColor'

  switch (type) {
    case 'weather':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M8 18h12a4 4 0 0 0 .3-8 5.5 5.5 0 0 0-10.6-1.5A3.5 3.5 0 0 0 8 18Z"
            stroke={stroke}
            strokeWidth="1.2"
          />
          <path d="M10 21v2M14 21v2M18 21v2" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )
    case 'uv':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="4.5" stroke={stroke} strokeWidth="1.2" />
          <path
            d="M14 4v3M14 21v3M4 14h3M21 14h3M7.05 7.05l2.12 2.12M18.83 18.83l2.12 2.12M7.05 20.95l2.12-2.12M18.83 9.17l2.12-2.12"
            stroke={stroke}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'durable':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M14 4 6 8v7c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V8l-8-4Z"
            stroke={stroke}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M11 14.5 13 16.5 17.5 12" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )
    case 'appeal':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M8 22V10l6-4 6 4v12" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M11 22v-6h6v6" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M12 12h2M16 12h2" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )
  }
}

export default function ExteriorWhyChoose() {
  return (
    <section className="exterior-landing-why page-section" aria-labelledby="exterior-why-heading">
      <div className="exterior-landing-why__container container">
        <h2 id="exterior-why-heading" className="exterior-landing-why__heading">
          Why Choose Red Mark Exterior Finishes
        </h2>

        <div className="exterior-landing-why__grid">
          {EXTERIOR_WHY_CHOOSE.map((item) => (
            <article key={item.title} className="exterior-landing-why__card">
              <div className="exterior-landing-why__icon">
                <ExteriorWhyIcon type={item.icon} />
              </div>
              <h3 className="exterior-landing-why__title">{item.title}</h3>
              <p className="exterior-landing-why__description">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
