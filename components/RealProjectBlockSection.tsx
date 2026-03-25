'use client'

import Image from 'next/image'

export default function RealProjectBlockSection() {
  return (
    <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '1.5rem',
            alignItems: 'start',
          }}
          className="real-project-grid"
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/10',
              overflow: 'hidden',
              borderRadius: '4px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            }}
          >
            <Image
              src="/Finishes/ChatGPT-Image-Feb-17-2026-04_08_31-PM.png"
              alt="Real project surface application"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              quality={75}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/3',
                overflow: 'hidden',
                borderRadius: '4px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                marginBottom: '1rem',
              }}
            >
              <Image
                src="/Finishes/ChatGPT-Image-Feb-17-2026-04_17_23-PM.png"
                alt="Architectural finish in real space"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={75}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <p
              style={{
                fontSize: 'clamp(1.25rem, 2.1vw, 1.7rem)',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                color: '#2B2B2B',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                textAlign: 'left',
              }}
            >
              Real surfaces. Real spaces.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
