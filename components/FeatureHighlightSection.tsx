'use client'

import Link from 'next/link'

export default function FeatureHighlightSection() {
  return (
    <section
      className="page-section"
      style={{
        backgroundColor: 'var(--bg-primary)',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div
        style={{
          position: 'relative',
          minHeight: '78vh',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/section_2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.01)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 38%, rgba(0,0,0,0.12) 62%, rgba(0,0,0,0) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '7rem 9vw',
            maxWidth: '820px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.72rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                color: 'rgba(245, 242, 237, 0.78)',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                marginBottom: '1.2rem',
              }}
            >
              Feature Highlight
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                color: '#F5F2ED',
                lineHeight: 1.14,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
              }}
            >
              Materials Designed For Lasting Spaces
            </h2>
            <p
              style={{
                fontSize: 'clamp(0.96rem, 1.2vw, 1.1rem)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                color: 'rgba(245, 242, 237, 0.85)',
                lineHeight: 1.8,
                letterSpacing: '0.01em',
                maxWidth: '560px',
                marginBottom: '2rem',
              }}
            >
              Expressive finishes with balanced texture, depth, and tone curated to elevate modern architecture without visual noise.
            </p>

            <Link href="/contact" className="feature-cta">
              Request Material Consultation
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .feature-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(245, 242, 237, 0.55);
          color: #f5f2ed;
          padding: 0.85rem 1.5rem;
          font-size: 0.78rem;
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: background-color 0.25s ease, border-color 0.25s ease;
        }

        .feature-cta:hover {
          background: rgba(245, 242, 237, 0.12);
          border-color: rgba(245, 242, 237, 0.75);
          color: #f5f2ed;
        }

        @media (max-width: 768px) {
          .feature-cta {
            padding: 0.78rem 1.2rem;
          }
        }
      `}</style>
    </section>
  )
}
