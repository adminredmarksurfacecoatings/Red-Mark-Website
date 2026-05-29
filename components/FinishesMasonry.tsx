'use client'

import { useEffect, useRef, useState } from 'react'
import ImageModal from '@/components/ImageModal'
import GalleryImageTile from '@/components/GalleryImageTile'

const finishesImages = [
  '/Finishes/ChatGPT-Image-Feb-17-2026-03_52_52-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-03_55_38-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-03_57_20-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_05_15-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_06_06-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_08_02-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_08_31-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_09_48-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png',
  '/Finishes/ChatGPT-Image-Feb-17-2026-04_17_23-PM.png',
  '/Finishes/ChatGPT-Image-Feb-5-2026-05_09_59-PM.png',
  '/Finishes/ChatGPT-Image-Feb-5-2026-05_11_10-PM.png',
  '/Finishes/ChatGPT-Image-Feb-6-2026-11_10_55-AM.png',
  '/Finishes/ChatGPT-Image-Feb-7-2026-10_25_26-AM.png',
  '/Finishes/ChatGPT-Image-Feb-7-2026-10_56_00-AM.png',
  '/Finishes/ChatGPT-Image-Feb-7-2026-11_02_53-AM.png',
  '/Finishes/ChatGPT-Image-Feb-7-2026-11_21_40-AM.png',
  '/Finishes/ChatGPT-Image-Feb-7-2026-11_24_39-AM.png',
  '/Finishes/ChatGPT-Image-Feb-7-2026-11_28_05-AM.png',
  '/Finishes/ChatGPT-Image-Feb-7-2026-11_31_15-AM.png',
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

  const column1Images = sourceImages.filter((_, i) => i % 3 === 0)
  const column2Images = sourceImages.filter((_, i) => i % 3 === 1)
  const column3Images = sourceImages.filter((_, i) => i % 3 === 2)
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
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        <h2
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

        <div
          className="finishes-masonry-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
            marginLeft: '10vw',
            marginRight: '10vw',
          }}
        >
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
