'use client'

import Link from 'next/link'

const secondaryLinkStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.8125rem',
  fontWeight: 400,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#2b2b2b',
  textDecoration: 'none',
  borderBottom: '1px solid rgba(43, 43, 43, 0.25)',
  paddingBottom: '0.15rem',
}

export default function MidPageCtaSection() {
  return (
    <section className="page-section" style={{ backgroundColor: '#F8F4EE', textAlign: 'center' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        <h2
          style={{
            fontSize: 'clamp(2.1rem, 4.1vw, 3.4rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '1.2rem',
          }}
        >
          Find the Right Finish
        </h2>
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            marginBottom: '2.2rem',
            maxWidth: '560px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Browse curated mineral finishes by texture and application — then see how they look in real projects.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/finishes" className="btn">
            Explore Finishes
          </Link>
          <Link href="/projects" style={secondaryLinkStyle}>
            View Projects →
          </Link>
        </div>
      </div>
    </section>
  )
}
