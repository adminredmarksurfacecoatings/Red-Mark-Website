import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import StoneCollectionGallery from '@/components/StoneCollectionGallery'
import StoneFinishGrid from '@/components/StoneFinishGrid'
import { getCollection, getNextCollection } from '@/lib/collections'
import { fetchEnabledMediaUrls, folderPathFromId } from '@/lib/supabase/mediaLibrary'

export const dynamic = 'force-dynamic'

const collection = getCollection('interior')!

export const metadata: Metadata = {
  title: collection.title,
  description: collection.description,
}

export default async function InteriorCollectionPage() {
  const interiorImages = await fetchEnabledMediaUrls(folderPathFromId(collection.storageId!))
  const nextCollection = getNextCollection('interior')

  return (
    <>
      <section className="page-section page-section--first" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <h1
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              color: '#2B2B2B',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '3rem',
            }}
          >
            {collection.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              color: '#4A4A4A',
              lineHeight: 1.7,
              letterSpacing: '0.01em',
              maxWidth: '650px',
              margin: '0 auto',
            }}
          >
            {collection.description}
          </p>
        </div>
      </section>

      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <div
            style={{
              width: '100%',
              aspectRatio: '16/9',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '4px',
            }}
          >
            <Image
              src="/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png"
              alt={`${collection.title} feature`}
              fill
              sizes="100vw"
              quality={75}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <StoneFinishGrid images={interiorImages} />
        </div>
      </section>

      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <div
            className="material-detail-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center',
              marginLeft: '10vw',
              marginRight: '10vw',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '4/3',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px',
              }}
            >
              <Image
                src="/Finishes/ChatGPT-Image-Feb-17-2026-04_17_23-PM.png"
                alt={`${collection.title} material texture`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  color: '#2B2B2B',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  marginBottom: '2rem',
                }}
              >
                Material Character
              </h2>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  color: '#4A4A4A',
                  lineHeight: 1.8,
                  letterSpacing: '0.01em',
                }}
              >
                Interior finishes are composed to bring layered mineral depth and soft tonal movement to
                residential and commercial spaces — surfaces that respond beautifully to natural and
                architectural light.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StoneCollectionGallery images={interiorImages} />

      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <Link href={nextCollection.href} className="collection-link" style={collectionLinkStyle}>
            Explore {nextCollection.title} →
          </Link>
        </div>
      </section>
    </>
  )
}

const collectionLinkStyle = {
  fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  color: '#2B2B2B',
  textDecoration: 'none',
  display: 'inline-block',
  position: 'relative' as const,
  paddingBottom: '0.25rem',
}
