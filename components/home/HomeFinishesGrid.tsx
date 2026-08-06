'use client'

import Link from 'next/link'
import GalleryImageTile from '@/components/GalleryImageTile'
import ImageModal from '@/components/ImageModal'
import { useState } from 'react'

const FALLBACK_IMAGES = [
  '/Finishes/ochre-mineral-wall-texture-living-room.png',
  '/Finishes/mustard-limewash-wall-dining-room.png',
  '/Finishes/ochre-stucco-exterior-patio-finish.png',
  '/Finishes/sage-green-mineral-wall-living-room.png',
  '/Finishes/sage-stucco-exterior-patio-dining.png',
  '/Finishes/blue-limewash-wall-modern-bedroom.png',
  '/Finishes/textured-stucco-poolside-fire-pit-patio.png',
  '/Finishes/sand-plaster-wall-kitchen-island.png',
  '/Finishes/mediterranean-textured-wall-arched-loggia.png',
  '/Finishes/cream-stucco-outdoor-living-wicker-patio.png',
  '/Finishes/sand-textured-plaster-wall-interior.png',
  '/Finishes/taupe-mineral-wall-texture-bedroom.png',
]

const GRID_COUNT = 12

type HomeFinishesGridProps = {
  images?: string[]
}

export default function HomeFinishesGrid({ images }: HomeFinishesGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const source =
    images && images.length > 0
      ? images.slice(0, GRID_COUNT)
      : FALLBACK_IMAGES.slice(0, GRID_COUNT)

  const gallery = source.map((src, index) => ({
    src,
    alt: `Finish surface ${index + 1}`,
  }))

  return (
    <section className="page-section home-finishes-grid-section">
      <div className="container home-finishes-grid-section__container">
        <div className="home-finishes-grid-section__header">
          <h2 className="home-finishes-grid-section__heading">Finishes</h2>
          <p className="home-finishes-grid-section__intro">
            A glimpse of our mineral surfaces — texture, tone, and architectural character.
          </p>
        </div>

        <div className="home-finishes-grid">
          {gallery.map((item, index) => (
            <GalleryImageTile
              key={`${item.src}-${index}`}
              src={item.src}
              alt={item.alt}
              aspectRatio="4/3"
              sizes="(max-width: 768px) 33vw, (max-width: 1024px) 33vw, 28vw"
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="home-finishes-grid-section__cta">
          <Link href="/finishes">Explore all finishes →</Link>
        </div>
      </div>

      <ImageModal
        isOpen={activeIndex !== null}
        images={gallery}
        currentIndex={activeIndex || 0}
        onNavigate={(nextIndex) => setActiveIndex(nextIndex)}
        onClose={() => setActiveIndex(null)}
      />

      <style jsx>{`
        .home-finishes-grid-section {
          background-color: var(--bg-primary);
        }

        .home-finishes-grid-section__container {
          margin: 0 auto;
          padding: 0 4rem;
        }

        .home-finishes-grid-section__header {
          margin: 0 10vw 2.5rem;
          max-width: 640px;
        }

        .home-finishes-grid-section__heading {
          font-size: clamp(2.25rem, 4.5vw, 3.5rem);
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          color: #2b2b2b;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0 0 0.85rem;
        }

        .home-finishes-grid-section__intro {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          font-weight: 300;
          color: #4a4a4a;
          line-height: 1.75;
          letter-spacing: 0.01em;
          margin: 0;
        }

        .home-finishes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 0 10vw;
        }

        .home-finishes-grid-section__cta {
          margin: 2rem 10vw 0;
        }

        .home-finishes-grid-section__cta :global(a) {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          color: #2b2b2b;
          letter-spacing: 0.06em;
          text-decoration: none;
          border-bottom: 1px solid rgba(43, 43, 43, 0.35);
          padding-bottom: 2px;
        }

        @media (max-width: 768px) {
          .home-finishes-grid-section__container {
            padding: 0 0.75rem;
          }

          .home-finishes-grid-section__header,
          .home-finishes-grid,
          .home-finishes-grid-section__cta {
            margin-left: 0;
            margin-right: 0;
          }

          .home-finishes-grid {
            gap: 0.5rem;
          }

          .home-finishes-grid-section__header {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
