'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ImageModal from '@/components/ImageModal'

// Only images from /public/Finishes/ folder
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

export default function FinishesMasonry() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

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

  // Organize images into masonry layout: Column 1 (tall), Column 2 (2 medium), Column 3 (tall)
  // Distribute images evenly across columns
  const column1Images = finishesImages.slice(0, 7) // Tall images
  const column2Images = finishesImages.slice(7, 14) // Medium images (will be stacked)
  const column3Images = finishesImages.slice(14, 20) // Tall images
  const gallery = finishesImages.map((image, index) => ({ src: image, alt: `Project ${index + 1}` }))

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
        {/* Section Heading */}
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          color: '#2B2B2B',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginBottom: '4rem',
          marginLeft: '10vw',
        }}>
          Selected Projects & Surfaces
        </h2>

        {/* Masonry Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
          marginLeft: '10vw',
          marginRight: '10vw',
        }}
        className="finishes-masonry-grid"
        >
          {/* Column 1: Tall images */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}>
            {column1Images.map((image, index) => (
              <div
                key={`col1-${index}`}
                style={{
                  width: '100%',
                  aspectRatio: index % 2 === 0 ? '3/4' : '4/3', // Mix of tall and medium
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <Image
                  src={image}
                  alt={`Project ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  style={{
                    objectFit: 'cover',
                  }}
                  onClick={() => setActiveImageIndex(index)}
                />
              </div>
            ))}
          </div>

          {/* Column 2: Medium images (stacked) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}>
            {column2Images.map((image, index) => (
              <div
                key={`col2-${index}`}
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <Image
                  src={image}
                  alt={`Project ${index + 8}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  style={{
                    objectFit: 'cover',
                  }}
                  onClick={() => setActiveImageIndex(index + 7)}
                />
              </div>
            ))}
          </div>

          {/* Column 3: Tall images */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}>
            {column3Images.map((image, index) => (
              <div
                key={`col3-${index}`}
                style={{
                  width: '100%',
                  aspectRatio: index % 2 === 0 ? '3/4' : '4/3', // Mix of tall and medium
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <Image
                  src={image}
                  alt={`Project ${index + 15}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  style={{
                    objectFit: 'cover',
                  }}
                  onClick={() => setActiveImageIndex(index + 14)}
                />
              </div>
            ))}
          </div>
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
