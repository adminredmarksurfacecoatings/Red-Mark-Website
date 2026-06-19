import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For Architects',
  description:
    'Surface systems for architects seeking depth, light responsiveness, and refined material expression.',
}

const whatWeProvide = [
  {
    heading: 'Material Guidance',
    text: 'Support in selecting the right finishes and textures for specific architectural contexts.',
  },
  {
    heading: 'Sample Support',
    text: 'Texture samples to help evaluate finishes during the design process.',
  },
  {
    heading: 'Surface Consultation',
    text: 'Recommendations for application methods and surface preparation.',
  },
]

export default function ArchitectsPage() {
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
            For Architects
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
            Surface materials designed to work with architecture, light, and spatial atmosphere.
          </p>
        </div>
      </section>

      {/* Section 2 — Collaborating With Designers */}
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
            Collaborating With Designers
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
            Red Mark works closely with architects and interior designers to create distinctive surfaces for residential, commercial, and hospitality spaces. Our mineral finishes are developed to complement architectural materials and respond beautifully to natural light.
          </p>
        </div>
      </section>

      {/* Section 3 — What We Provide */}
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
            {whatWeProvide.map((item) => (
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

      {/* Section 4 — Applications */}
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
            Architectural Applications
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
            Red Mark finishes can be used across a variety of architectural spaces including residential interiors, hospitality environments, commercial spaces, and exterior facades.
          </p>
        </div>
      </section>

      <section className="page-section architect-resources">
        <div className="container architect-resources__container">
          <p className="architect-resources__eyebrow">Architect Resource Center</p>
          <h2 className="architect-resources__heading">Specification-ready resources</h2>
          <p className="architect-resources__intro">
            Tools and references to help you evaluate, specify, and present Red Mark finishes on
            active projects.
          </p>

          <div className="architect-resources__grid">
            <Link href="/catalogues" className="architect-resources__card">
              <h3>Product Catalogues</h3>
              <p>Downloadable catalogues and finish overviews.</p>
            </Link>
            <Link href="/finishes" className="architect-resources__card">
              <h3>Texture Collections</h3>
              <p>Explore interior, exterior, and complete finish ranges.</p>
            </Link>
            <Link href="/finishes/exterior/stone-finish" className="architect-resources__card">
              <h3>Stone Finish Shades</h3>
              <p>Full shade catalogue with samples and shade cards.</p>
            </Link>
            <Link href="/projects" className="architect-resources__card">
              <h3>Project Inspiration</h3>
              <p>Reference installations across residential and commercial work.</p>
            </Link>
            <Link href="/finishes/exterior/stone-finish/request-sample" className="architect-resources__card">
              <h3>Sample Requests</h3>
              <p>Order physical samples for client presentations and mock-ups.</p>
            </Link>
            <Link href="/contact?audience=architect" className="architect-resources__card">
              <h3>Technical Support</h3>
              <p>Discuss specifications, applications, and project requirements.</p>
            </Link>
          </div>

          <p className="architect-resources__note">
            Technical data sheets and CAD resources will be added as they become available.
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
            Request Samples or Project Consultation
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
            If you are working on a project and would like to explore our surface finishes, our team would be happy to assist.
          </p>
          <Link href="/contact?audience=architect" className="btn">
            Request Samples
          </Link>
        </div>
      </section>
    </>
  )
}
