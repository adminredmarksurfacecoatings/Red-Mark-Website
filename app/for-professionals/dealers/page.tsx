import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For Dealers - Red Mark Surface Coatings',
  description: 'Partner with Red Mark to bring distinctive surface finishes to your market.',
}

const whyBecomeADealer = [
  {
    heading: 'Distinctive Products',
    text: 'Offer clients unique texture finishes and mineral surfaces that stand out from standard paint solutions.',
  },
  {
    heading: 'Technical Support',
    text: 'Guidance on product usage, application methods, and customer recommendations.',
  },
  {
    heading: 'Growing Market Demand',
    text: 'Decorative surface finishes are increasingly popular in residential, commercial, and hospitality projects.',
  },
]

export default function DealersPage() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className="page-section page-section--first" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '3rem',
          }}>
            For Dealers
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
            maxWidth: '650px',
            margin: '0 auto',
          }}>
            Partner with Red Mark to bring distinctive surface finishes to your market.
          </p>
        </div>
      </section>

      {/* Section 2 — Distribution Partnerships */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            marginLeft: '10vw',
            marginRight: '10vw',
          }}>
            Growing Together
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            marginLeft: '10vw',
            marginRight: '10vw',
            maxWidth: 'none',
          }}>
            Red Mark collaborates with dealers and distributors to expand the availability of specialized texture finishes across new markets. Our goal is to build long-term partnerships with businesses that value high-quality surface materials.
          </p>
        </div>
      </section>

      {/* Section 3 — Why Become a Dealer */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '60px',
            marginLeft: '10vw',
            marginRight: '10vw',
          }}
          className="finishes-grid"
          >
            {whyBecomeADealer.map((item) => (
              <div
                key={item.heading}
                style={{
                  paddingBottom: '2rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 2vw, 1.75rem)',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  color: '#2B2B2B',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  marginBottom: '1rem',
                }}>
                  {item.heading}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  color: '#4A4A4A',
                  lineHeight: 1.7,
                  letterSpacing: '0.01em',
                }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Ideal Partners */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            marginLeft: '10vw',
            marginRight: '10vw',
          }}>
            Ideal Partners
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            marginLeft: '10vw',
            marginRight: '10vw',
          }}>
            We work with paint stores, building material suppliers, design studios, and surface finish showrooms that want to offer distinctive architectural coatings to their customers.
          </p>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}>
            Become a Dealer Partner
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
          }}>
            If you're interested in distributing Red Mark products in your region, we would be happy to discuss partnership opportunities.
          </p>
          <Link href="/contact" className="btn">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
