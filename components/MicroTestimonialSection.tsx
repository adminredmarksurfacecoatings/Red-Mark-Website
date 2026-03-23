'use client'

export default function MicroTestimonialSection() {
  return (
    <section className="page-section" style={{ backgroundColor: '#F8F4EE', textAlign: 'center' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        <blockquote
          style={{
            fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            maxWidth: '760px',
            margin: '0 auto 1rem',
          }}
        >
          “The finish quality and depth is unmatched.”
        </blockquote>
        <p
          style={{
            fontSize: '0.85rem',
            fontFamily: "'Inter', sans-serif",
            color: '#6A6A6A',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          — Project Architect
        </p>
      </div>
    </section>
  )
}
