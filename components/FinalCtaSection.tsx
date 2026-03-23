'use client'

import Link from 'next/link'

export default function FinalCtaSection() {
  return (
    <section
      className="page-section final-cta-section"
      style={{
        background:
          'linear-gradient(180deg, rgba(245,242,237,1) 0%, rgba(240,232,224,0.34) 100%)',
        textAlign: 'center',
        paddingTop: '140px',
        paddingBottom: '140px',
      }}
    >
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(2.6rem, 5vw, 4.4rem)',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              color: '#2B2B2B',
              lineHeight: 1.16,
              letterSpacing: '-0.02em',
              marginBottom: '1.8rem',
            }}
          >
            Ready To Begin Your Project Conversation?
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.98rem, 1.2vw, 1.1rem)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              color: '#4A4A4A',
              lineHeight: 1.8,
              letterSpacing: '0.01em',
              marginBottom: '3rem',
              maxWidth: '640px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Let&apos;s discuss your project and find the right material direction for your space.
          </p>
          <Link href="/contact" className="btn final-cta-btn">
            Book a Consultation
          </Link>
        </div>
      </div>

      <style jsx>{`
        .final-cta-btn {
          padding: 1.1rem 2.6rem;
        }
      `}</style>
    </section>
  )
}
