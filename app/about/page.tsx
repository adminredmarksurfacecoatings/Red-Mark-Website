import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'About Our Craft & Material Philosophy',
  description:
    'Discover Red Mark Surface Coatings — our story, material philosophy, and craft approach to architectural mineral finishes and textured wall surfaces in India.',
  path: '/about',
  image: '/home_grid_1.png',
  imageAlt: 'Red Mark mineral finish craftsmanship',
})

export default function AboutPage() {
  return (
    <div className="editorial-page">
      {/* Section 1 — Hero */}
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
            About Red Mark
          </h1>
          
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: 'var(--palette-4a4a4a)',
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
                color: 'var(--palette-2b2b2b)',
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
                color: 'var(--palette-4a4a4a)',
                lineHeight: 1.8,
                letterSpacing: '0.01em',
              }}>
                <p style={{
                  marginBottom: '1.5rem',
                }}>
                  Red Mark Surface Coatings is a Ludhiana-based business operated by Rakesh Kumar, offering textured wall finishes and decorative surface coatings.
                </p>
                
                <p>
                  Our range includes Stone Finish, Pebble Finish, Create Art and Farry. Contact us to discuss the finish, shade and preparation suitable for your project.
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
                src="/Finishes/cream-stucco-outdoor-living-wicker-patio.png"
                alt="Cream textured walls surrounding an outdoor seating area"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={75}
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
            color: 'var(--palette-2b2b2b)',
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
            color: 'var(--palette-4a4a4a)',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            <p style={{
              marginBottom: '1.5rem',
            }}>
              Today, Red Mark develops a wide range of mineral finishes, textures, and coating systems designed to transform interior and exterior surfaces. Each product is created with a focus on texture, colour, and the character of the finished surface.
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
            color: 'var(--palette-2b2b2b)',
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
            color: 'var(--palette-4a4a4a)',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            maxWidth: '700px',
            margin: '0 auto 3rem',
          }}>
            Red Mark welcomes enquiries from architects, builders, designers and homeowners planning textured surfaces.
          </p>
          
          <p style={{
            fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: 'var(--palette-4a4a4a)',
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
              color: 'var(--palette-2b2b2b)',
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
    </div>
  )
}
