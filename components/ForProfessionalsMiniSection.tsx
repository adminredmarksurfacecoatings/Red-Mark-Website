'use client'

import Link from 'next/link'

const professionalCards = [
  {
    title: 'Architects',
    description: 'Material support and specification-ready guidance.',
    href: '/for-professionals/architects',
  },
  {
    title: 'Builders',
    description: 'Reliable systems for durable, high-quality execution.',
    href: '/for-professionals/builders',
  },
  {
    title: 'Dealers',
    description: 'Curated product partnerships for regional distribution.',
    href: '/for-professionals/dealers',
  },
]

export default function ForProfessionalsMiniSection() {
  return (
    <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        <h2
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            marginBottom: '0.8rem',
          }}
        >
          Designed for Professionals
        </h2>
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}
        >
          For architects, builders, and dealers who value material depth and detail.
        </p>

        <div
          className="for-pro-mini-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {professionalCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="for-pro-mini-card"
              style={{
                border: '1px solid var(--border-subtle)',
                padding: '1.4rem 1.2rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
                backgroundColor: 'rgba(255,255,255,0.3)',
              }}
            >
              <h3
                style={{
                  fontSize: 'clamp(1.35rem, 2vw, 1.7rem)',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  color: '#2B2B2B',
                  marginBottom: '0.45rem',
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '0.94rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  color: '#4A4A4A',
                  lineHeight: 1.7,
                  letterSpacing: '0.01em',
                }}
              >
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
