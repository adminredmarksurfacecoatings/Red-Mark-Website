'use client'

export default function BreakSection() {
  return (
    <section
      className="page-section home-break-section"
      style={{
        background:
          'linear-gradient(180deg, rgba(245,242,237,0.95) 0%, rgba(240,232,224,0.35) 100%)',
        textAlign: 'center',
        paddingTop: '140px',
        paddingBottom: '140px',
      }}
    >
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        <h2
          style={{
            fontSize: 'clamp(2.7rem, 5vw, 4.5rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#222222',
            marginBottom: '1.3rem',
          }}
        >
          Materials are not applied.
          <br />
          They are composed.
        </h2>
        <p
          style={{
            fontSize: '0.92rem',
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(43, 43, 43, 0.66)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Crafted with intention. Designed to endure.
        </p>
      </div>
    </section>
  )
}
