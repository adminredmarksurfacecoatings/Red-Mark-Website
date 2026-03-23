import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For Builders',
  description:
    'Reliable mineral finishes with practical application guidance for residential and commercial build projects.',
}

const whatBuildersNeed = [
  {
    heading: 'Reliable Performance',
    text: 'Finishes designed for durability and consistent application across large surfaces.',
  },
  {
    heading: 'Application Guidance',
    text: 'Support for surface preparation, material selection, and application techniques.',
  },
  {
    heading: 'Project Coordination',
    text: 'Working with builders to ensure finishes are delivered and applied efficiently within project timelines.',
  },
]

export default function BuildersPage() {
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
            For Builders
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
            Reliable surface coatings designed for residential, commercial, and architectural construction.
          </p>
        </div>
      </section>

      {/* Section 2 — Solutions for Construction Projects */}
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
            Solutions for Construction Projects
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
            Red Mark works with builders and contractors to provide reliable surface finishes for both interior and exterior applications. Our coating systems are designed to perform consistently across residential, commercial, and hospitality projects.
          </p>
        </div>
      </section>

      {/* Section 3 — What Builders Need */}
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
            {whatBuildersNeed.map((item) => (
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

      {/* Section 4 — Where Our Finishes Work */}
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
            Project Applications
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
            Red Mark finishes are suitable for a variety of construction environments including residential developments, commercial buildings, hospitality spaces, and exterior facades.
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
            Discuss Your Project
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
            If you're planning a project and would like to explore suitable surface finishes, our team would be happy to assist.
          </p>
          <Link href="/contact" className="btn">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
