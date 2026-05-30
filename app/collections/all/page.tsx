import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import MineralCollectionGallery from '@/components/MineralCollectionGallery'
import MineralFinishGrid from '@/components/MineralFinishGrid'
import { getCollection, getNextCollection } from '@/lib/collections'
import { fetchFinishesPageImages } from '@/lib/supabase/mediaLibrary'

export const dynamic = 'force-dynamic'

const collection = getCollection('all')!

export const metadata: Metadata = {
  title: collection.title,
  description: collection.description,
}

export default async function AllCollectionPage() {
  const allImages = await fetchFinishesPageImages()
  const nextCollection = getNextCollection('all')

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
              src="/Finishes/ChatGPT-Image-Feb-17-2026-04_08_31-PM.png"
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
          <MineralFinishGrid images={allImages} />
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
                Complete Range
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
                Browse every enabled finish across interior and exterior applications — decorative
                textures, mineral coatings, and surface systems curated in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MineralCollectionGallery images={allImages} />

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
