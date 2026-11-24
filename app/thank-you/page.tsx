import type { Metadata } from 'next'
import Link from 'next/link'

import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Thank You for Contacting Red Mark',
  description:
    'Thank you for contacting Red Mark Surface Coatings. Our team will review your enquiry and respond shortly.',
  path: '/thank-you',
  noIndex: true,
})

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
            color: 'var(--palette-2b2b2b)',
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
            color: 'var(--palette-4a4a4a)',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
            maxWidth: '600px',
            margin: '0 auto 4rem',
          }}>
            If you opened WhatsApp, review your draft and tap Send there. This website cannot confirm whether a WhatsApp message was delivered.
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
                color: 'var(--palette-2b2b2b)',
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
                color: 'var(--palette-2b2b2b)',
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
