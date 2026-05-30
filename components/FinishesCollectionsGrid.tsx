'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getCollectionsForNav } from '@/lib/collections'

export default function FinishesCollectionsGrid() {
  const finishes = getCollectionsForNav()

  return (
    <>
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '60px',
              rowGap: '80px',
            }}
            className="finishes-grid"
          >
            {finishes.map((finish) => (
              <Link
                key={finish.slug}
                href={finish.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    marginBottom: '2rem',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={finish.image}
                    alt={finish.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: '0.6875rem',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    color: '#6A6A6A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: '0.5rem',
                  }}
                >
                  COLLECTION
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(1.5rem, 2vw, 1.75rem)',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    color: '#2B2B2B',
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                    marginBottom: '1rem',
                  }}
                >
                  {finish.title}
                </h2>

                <p
                  style={{
                    fontSize: '1rem',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    color: '#4A4A4A',
                    lineHeight: 1.7,
                    letterSpacing: '0.01em',
                    marginBottom: '1.5rem',
                  }}
                >
                  {finish.description}
                </p>

                <span
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
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
