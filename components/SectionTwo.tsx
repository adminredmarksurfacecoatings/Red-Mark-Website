export default function SectionTwo() {
  return (
    <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div
        className="container"
        style={{
          margin: '0 auto',
          padding: '0 4rem',
          textAlign: 'center',
          maxWidth: '980px',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2.8rem, 5.4vw, 4.6rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            marginBottom: '2rem',
            color: '#2B2B2B',
            lineHeight: 1.16,
            letterSpacing: '-0.02em',
          }}
        >
          Quiet Materials. Enduring Atmosphere.
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
            lineHeight: 1.95,
            color: '#4A4A4A',
            fontWeight: 300,
            letterSpacing: '0.01em',
            maxWidth: '760px',
            margin: '0 auto',
          }}
        >
          Mineral surfaces with soft tonal depth, refined texture, and a calm architectural presence designed to age with grace in contemporary interiors and exteriors.
        </p>

        <div
          style={{
            width: '70px',
            height: '1px',
            backgroundColor: 'var(--oxide-red)',
            opacity: 0.55,
            margin: '2.75rem auto 0',
          }}
        />
      </div>
    </section>
  )
}
