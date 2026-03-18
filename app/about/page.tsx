import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About - Red Mark Surface Coatings',
  description: 'A surface coatings company focused on mineral finishes, textures, and architectural materials.',
}

export default function AboutPage() {
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
            marginBottom: '3rem', /* Generous spacing between heading and subtext */
          }}>
            About Red Mark
          </h1>
          
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            A surface coatings company focused on mineral finishes, textures, and architectural materials.
          </p>
        </div>
      </section>

      {/* Section 2 — Founder Story */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            marginLeft: '10vw',
            marginRight: '10vw',
          }}
          className="material-detail-grid"
          >
            {/* Left: Text Content */}
            <div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                color: '#2B2B2B',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '2rem',
              }}>
                Our Beginning
              </h2>
              
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                fontWeight: 300,
                color: '#4A4A4A',
                lineHeight: 1.8,
                letterSpacing: '0.01em',
              }}>
                <p style={{
                  marginBottom: '1.5rem',
                }}>
                  Red Mark Surface Coatings was founded in 2006 by Rakesh Kumar, whose early career was shaped while working with a Japanese paint company. Years of hands-on experience with materials, finishes, and application techniques led to the idea of building an independent brand focused on textured surfaces and specialized coatings.
                </p>
                
                <p>
                  What began as a small initiative gradually grew into a company dedicated to creating distinctive wall finishes and surface coatings for residential, commercial, and architectural projects.
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '4px',
            }}>
              <Image
                src="/Finishes/ChatGPT-Image-Feb-17-2026-04_17_23-PM.png"
                alt="Red Mark Surface Coatings"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Material Philosophy */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
          }}>
            Material & Craft
          </h2>
          
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            <p style={{
              marginBottom: '1.5rem',
            }}>
              Today, Red Mark develops a wide range of mineral finishes, textures, and coating systems designed to transform interior and exterior surfaces. Each product is created with a focus on material depth, long-term performance, and refined aesthetics.
            </p>
            
            <p>
              Quality and reliability remain central to the company's philosophy. Every product undergoes careful quality checks and continuous improvement to ensure consistent results across projects of all scales.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Clients & Projects */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
          }}>
            Built for Real Spaces
          </h2>
          
          <p style={{
            fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            maxWidth: '700px',
            margin: '0 auto 3rem',
          }}>
            Over the years, Red Mark has built long-term relationships with architects, builders, designers, and homeowners who value surfaces that are both durable and visually distinctive.
          </p>
          
          <p style={{
            fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            maxWidth: '700px',
            margin: '0 auto 3rem',
          }}>
            From small residential spaces to large commercial and industrial projects, Red Mark continues to explore new materials, textures, and techniques — always focused on creating surfaces that stand the test of time.
          </p>

          <Link
            href="/projects"
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
            View Projects →
          </Link>
        </div>
      </section>
    </>
  )
}
