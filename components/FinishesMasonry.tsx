'use client'

import { useEffect, useRef, useState } from 'react'
import ImageModal from '@/components/ImageModal'
import GalleryImageTile from '@/components/GalleryImageTile'
import { useInfiniteBatch } from '@/lib/useInfiniteBatch'

const finishesImages = [
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
  '/Finishes/teal-textured-wall-coastal-living-room.png',
  '/Finishes/blue-venetian-plaster-living-room-wall.png',
  '/Finishes/sage-mineral-wall-texture-living-room.png',
  '/Finishes/navy-feature-wall-modern-bedroom.png',
  '/Finishes/charcoal-textured-facade-exterior-lighting.png',
  '/Finishes/beige-textured-exterior-walkway-sconces.png',
  '/Finishes/charcoal-dragged-plaster-exterior-wall.png',
  '/Finishes/taupe-textured-exterior-wall-lighting.png',
]

type FinishesMasonryProps = {
  images?: string[]
}

type MasonryColumnProps = {
  images: string[]
  getAspectRatio: (index: number) => string
  altOffset: number
  onImageClick: (src: string) => void
}

function MasonryColumn({ images, getAspectRatio, altOffset, onImageClick }: MasonryColumnProps) {
  return (
    <div className="finishes-masonry-column">
      {images.map((image, index) => (
        <GalleryImageTile
          key={image}
          src={image}
          alt={`Project ${altOffset + index + 1}`}
          aspectRatio={getAspectRatio(index)}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  )
}

export default function FinishesMasonry({ images }: FinishesMasonryProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const sourceImages = images !== undefined ? images : finishesImages
  const { visibleItems, sentinelRef, hasMore } = useInfiniteBatch(sourceImages)

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const currentSection = sectionRef.current
    if (!currentSection) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(currentSection)

    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => {
      clearTimeout(timeout)
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  if (sourceImages.length === 0) {
    return null
  }

  const column1Images = visibleItems.filter((_, i) => i % 3 === 0)
  const column2Images = visibleItems.filter((_, i) => i % 3 === 1)
  const column3Images = visibleItems.filter((_, i) => i % 3 === 2)
  const gallery = sourceImages.map((image, index) => ({ src: image, alt: `Project ${index + 1}` }))

  const openImage = (src: string) => {
    setActiveImageIndex(sourceImages.findIndex((item) => item === src))
  }

  return (
    <section
      ref={sectionRef}
      className="finishes-masonry-section page-section"
      style={{
        backgroundColor: 'var(--bg-primary)',
        opacity: 1,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'transform 0.6s ease',
      }}
    >
      <div className="container finishes-page__container finishes-masonry-section__container">
        <h2
          className="finishes-masonry-section__heading"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '4rem',
            marginLeft: '10vw',
          }}
        >
          Selected Projects & Surfaces
        </h2>

        <div className="finishes-masonry-grid">
          <MasonryColumn
            images={column1Images}
            getAspectRatio={(index) => (index % 2 === 0 ? '3/4' : '4/3')}
            altOffset={0}
            onImageClick={openImage}
          />
          <MasonryColumn
            images={column2Images}
            getAspectRatio={() => '4/3'}
            altOffset={column1Images.length}
            onImageClick={openImage}
          />
          <MasonryColumn
            images={column3Images}
            getAspectRatio={(index) => (index % 2 === 0 ? '3/4' : '4/3')}
            altOffset={column1Images.length + column2Images.length}
            onImageClick={openImage}
          />
        </div>

        {hasMore ? (
          <div
            ref={sentinelRef}
            className="gallery-load-sentinel"
            aria-hidden="true"
            style={{ height: 1, marginTop: '2rem' }}
          />
        ) : null}
      </div>
      <ImageModal
        isOpen={activeImageIndex !== null}
        images={gallery}
        currentIndex={activeImageIndex || 0}
        onNavigate={(nextIndex) => setActiveImageIndex(nextIndex)}
        onClose={() => setActiveImageIndex(null)}
      />
    </section>
  )
}
