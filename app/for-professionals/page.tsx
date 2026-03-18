import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For Professionals - Red Mark Surface Coatings',
  description: 'Partnering with architects, builders, and dealers to deliver distinctive architectural surfaces.',
}

const professionalGroups = [
  {
    title: 'Architects',
    description: 'Material support, samples, and technical guidance for specifying surface finishes.',
    href: '/for-professionals/architects',
  },
  {
    title: 'Builders',
    description: 'Reliable coating systems and application guidance for residential and commercial projects.',
    href: '/for-professionals/builders',
  },
  {
    title: 'Dealers',
    description: 'Distribution partnerships for bringing Red Mark surfaces to new regions.',
    href: '/for-professionals/dealers',
  },
]

const whyPoints = [
  'Specialized texture finishes',
  'Consistent product quality',
  'Technical guidance for projects',
  'Custom surface solutions',
]

export default function ForProfessionalsPage() {
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
            For Professionals
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
            Partnering with architects, builders, and dealers to deliver distinctive architectural surfaces.
          </p>
        </div>
      </section>

      {/* Section 2 — Professional Groups */}
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
            {professionalGroups.map((group) => (
              <Link
                key={group.href}
                href={group.href}
                className="professional-card-link"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '2rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 0.2s ease',
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
                  {group.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  color: '#4A4A4A',
                  lineHeight: 1.7,
                  letterSpacing: '0.01em',
                  marginBottom: '1.25rem',
                }}>
                  {group.description}
                </p>
                <span style={{
                  fontSize: '0.9375rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  color: '#2B2B2B',
                  position: 'relative',
                  display: 'inline-block',
                  width: 'fit-content',
                }}
                className="collection-link"
                >
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Why Work With Red Mark */}
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
            Why Work With Us
          </h2>
          <ul style={{
            listStyle: 'none',
            marginLeft: '10vw',
            marginRight: '10vw',
            padding: 0,
          }}>
            {whyPoints.map((point, index) => (
              <li
                key={index}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                  fontWeight: 300,
                  color: '#4A4A4A',
                  lineHeight: 1.8,
                  letterSpacing: '0.01em',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span style={{
                  color: 'var(--oxide-red)',
                  fontSize: '0.5em',
                  lineHeight: 1,
                }}>•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 4 — CTA */}
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
            Start a Conversation
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
            If you are working on a project or interested in partnership opportunities, our team would be happy to assist.
          </p>
          <Link href="/contact" className="btn">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
