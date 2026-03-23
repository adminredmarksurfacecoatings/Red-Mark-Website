'use client'

const trustPoints = [
  'Hand-applied mineral finishes',
  'Breathable and long-lasting surfaces',
  'Custom textures for every project',
  'Crafted for architects, builders, and refined spaces',
]

export default function WhyRedMarkSection() {
  return (
    <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.2vw, 3.5rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            textAlign: 'center',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '3rem',
          }}
        >
          Why Red Mark
        </h2>

        <div
          className="why-red-mark-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
        >
          {trustPoints.map((point) => (
            <div
              key={point}
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '1rem',
                paddingRight: '0.5rem',
              }}
            >
              <p
                style={{
                  fontSize: '1rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  color: '#4A4A4A',
                  lineHeight: 1.8,
                  letterSpacing: '0.01em',
                }}
              >
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
