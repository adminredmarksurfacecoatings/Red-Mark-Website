import type { Metadata } from 'next'
import FinishesMasonry from '@/components/FinishesMasonry'
import FinishesCollectionsGrid from '@/components/FinishesCollectionsGrid'

export const metadata: Metadata = {
  title: 'Finishes',
  description:
    'Explore curated mineral finish collections with layered texture, tonal depth, and architectural character.',
}

export default function FinishesPage() {
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
            Our Collections
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
            Architectural mineral surfaces crafted for depth, durability, and refined character.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <FinishesCollectionsGrid />

      {/* Editorial Masonry Grid */}
      <FinishesMasonry />

    </>
  )
}
