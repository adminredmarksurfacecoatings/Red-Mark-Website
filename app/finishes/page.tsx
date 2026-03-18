import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FinishesMasonry from '@/components/FinishesMasonry'

export const metadata: Metadata = {
  title: 'Our Collections - Red Mark Surface Coatings',
  description: 'Architectural mineral surfaces crafted for depth, durability, and refined character.',
}

const finishes = [
  {
    id: 1,
    image: '/home_grid_1.png',
    title: 'Stone Collection',
    description: 'Layered mineral surfaces with architectural depth.',
    href: '/collections/stone',
  },
  {
    id: 2,
    image: '/home_grid_2.png',
    title: 'Exterior Collection',
    description: 'Refined surfaces engineered for enduring exteriors.',
    href: '/collections/exterior',
  },
  {
    id: 3,
    image: '/home_grid_3.png',
    title: 'Mineral Collection',
    description: 'Soft tonal movement with breathable matte character.',
    href: '/collections/mineral',
  },
]

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
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '60px', /* Minimum 60px gap between columns */
            rowGap: '80px', /* Generous spacing between rows */
          }}
          className="finishes-grid"
          >
            {finishes.map((finish) => (
              <div
                key={finish.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Image */}
                <div style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '4px', /* Very subtle rounded corners */
                  marginBottom: '2rem', /* Large spacing between image and title */
                }}>
                  <Image
                    src={finish.image}
                    alt={finish.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {/* Collection Label */}
                <div style={{
                  fontSize: '0.6875rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  color: '#6A6A6A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: '0.5rem',
                }}>
                  COLLECTION
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 2vw, 1.75rem)',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  color: '#2B2B2B',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  marginBottom: '1rem', /* Spacing between title and description */
                }}>
                  {finish.title}
                </h2>

                {/* Description */}
                <p style={{
                  fontSize: '1rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  color: '#4A4A4A',
                  lineHeight: 1.7,
                  letterSpacing: '0.01em',
                  marginBottom: '1.5rem', /* Spacing before link */
                }}>
                  {finish.description}
                </p>

                {/* Explore Collection Link */}
                <Link
                  href={finish.href}
                  style={{
                    fontSize: '0.9375rem',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    color: '#2B2B2B',
                    textDecoration: 'none',
                    display: 'inline-block',
                    width: 'fit-content',
                    position: 'relative',
                    transition: 'color 0.2s ease',
                  }}
                  className="explore-link"
                >
                  Explore Collection →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Masonry Grid */}
      <FinishesMasonry />

    </>
  )
}
