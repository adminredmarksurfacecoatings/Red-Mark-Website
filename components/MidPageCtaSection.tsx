'use client'

import Link from 'next/link'

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
          Choose Your Material Direction
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
          }}
        >
          Start with curated finishes or explore built projects to quickly align style, texture, and application.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/finishes" className="btn">
            View Finishes
          </Link>
          <Link href="/projects" className="btn">
            View Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
