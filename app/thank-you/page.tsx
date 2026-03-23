import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Thank You',
  description:
    'Thank you for contacting Red Mark. Our team will review your inquiry and respond shortly.',
}

export default function ThankYouPage() {
  return (
    <>
      {/* Section 1 — Centered Message */}
      <section className="page-section page-section--first" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '3rem', /* Generous spacing between heading and subtext */
          }}>
            Thank You
          </h1>
          
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
            maxWidth: '600px',
            margin: '0 auto 4rem',
          }}>
            Your message has been sent successfully. Our team will review your inquiry and get back to you as soon as possible.
          </p>

          {/* Section 2 — Navigation Options */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}>
            <Link
              href="/"
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                color: '#2B2B2B',
                textDecoration: 'none',
                display: 'inline-block',
                position: 'relative',
                paddingBottom: '0.25rem',
              }}
              className="collection-link"
            >
              Return to Home →
            </Link>

            <Link
              href="/finishes"
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                color: '#2B2B2B',
                textDecoration: 'none',
                display: 'inline-block',
                position: 'relative',
                paddingBottom: '0.25rem',
              }}
              className="collection-link"
            >
              View Our Collections →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
