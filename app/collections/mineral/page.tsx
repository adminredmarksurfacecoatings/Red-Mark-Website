import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import MineralCollectionGallery from '@/components/MineralCollectionGallery'
import MineralFinishGrid from '@/components/MineralFinishGrid'

export const metadata: Metadata = {
  title: 'Mineral Collection',
  description:
    'Soft mineral finishes with breathable matte texture and subtle tonal variation for calm architectural spaces.',
}

export default function MineralCollectionPage() {
  return (
    <>
      {/* Hero Section */}
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
            Mineral Collection
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
            Soft mineral surfaces with subtle tonal movement and breathable matte character.
          </p>
        </div>
      </section>

      {/* Feature Image Section */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '4px',
          }}>
            <Image
              src="/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png"
              alt="Mineral Collection Feature"
              fill
              sizes="100vw"
              quality={75}
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </section>

      {/* Finish Grid Section */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <MineralFinishGrid />
        </div>
      </section>

      {/* Material Detail Section */}
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
            {/* Left: Macro Texture Image */}
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '4px',
            }}>
              <Image
                src="/Finishes/ChatGPT-Image-Feb-17-2026-04_17_23-PM.png"
                alt="Mineral Collection Material Texture"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Right: Text Content */}
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
                Material Character
              </h2>
              
              <p style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                color: '#4A4A4A',
                lineHeight: 1.8,
                letterSpacing: '0.01em',
              }}>
                Mineral Collection surfaces are designed to bring layered mineral depth to architectural spaces. Each finish reveals subtle movement and tonal variation, creating surfaces that respond beautifully to natural light.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Gallery */}
      <MineralCollectionGallery />

      {/* CTA Section */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <Link
            href="/collections/exterior"
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
            Explore Exterior Collection →
          </Link>
        </div>
      </section>
    </>
  )
}
