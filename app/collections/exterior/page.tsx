import type { Metadata } from 'next'
import Image from 'next/image'
import ExteriorCollectionGallery from '@/components/ExteriorCollectionGallery'
import ExteriorFinishGrid from '@/components/ExteriorFinishGrid'
import { fetchEnabledMediaUrls, folderPathFromId } from '@/lib/supabase/mediaLibrary'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Exterior Collection',
  description:
    'Durable mineral finish systems engineered for refined architectural exteriors and long-term performance.',
}

export default async function ExteriorCollectionPage() {
  const exteriorImages = await fetchEnabledMediaUrls(folderPathFromId('exterior'))
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
            Exterior Collection
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
            Durable mineral surfaces engineered for refined architectural exteriors.
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
              alt="Exterior Collection Feature"
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
          <ExteriorFinishGrid images={exteriorImages} />
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
                alt="Exterior Collection Material Texture"
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
                Exterior Collection surfaces are designed to bring layered mineral depth to architectural spaces. Each finish reveals subtle movement and tonal variation, creating surfaces that respond beautifully to natural light.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Gallery */}
      <ExteriorCollectionGallery images={exteriorImages} />
    </>
  )
}
