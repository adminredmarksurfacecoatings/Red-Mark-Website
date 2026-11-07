import type { Metadata } from 'next'
import FinishesMasonry from '@/components/FinishesMasonry'
import { createPageMetadata } from '@/lib/seo'
import { fetchFinishesPageImages } from '@/lib/supabase/mediaLibrary'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = createPageMetadata({
  title: 'Mineral Finishes & Wall Texture Collections',
  description:
    'Explore Red Mark mineral finish collections — layered wall textures with tonal depth for interiors and exteriors. Browse selected surfaces and project imagery.',
  path: '/finishes',
  image: '/home_grid_2.png',
  imageAlt: 'Red Mark mineral finish collection surfaces',
})

export default async function FinishesPage() {
  const finishesImages = await fetchFinishesPageImages()
  return (
    <div className="finishes-page">
      <section className="page-section page-section--first" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container finishes-page__container">
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '3rem',
          }}>
            Finishes
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

      <FinishesMasonry images={finishesImages} />
    </div>
  )
}
