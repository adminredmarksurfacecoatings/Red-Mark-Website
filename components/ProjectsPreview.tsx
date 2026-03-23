'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const imagePool = [
  {
    id: 1,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-03_52_52-PM.png',
    alt: 'Project Preview 1',
  },
  {
    id: 2,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-03_55_38-PM.png',
    alt: 'Project Preview 2',
  },
  {
    id: 3,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-03_57_20-PM.png',
    alt: 'Project Preview 3',
  },
  {
    id: 4,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_05_15-PM.png',
    alt: 'Project Preview 4',
  },
  {
    id: 5,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_08_02-PM.png',
    alt: 'Project Preview 5',
  },
  {
    id: 6,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_09_48-PM.png',
    alt: 'Project Preview 6',
  },
  {
    id: 7,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png',
    alt: 'Project Preview 7',
  },
  {
    id: 8,
    image: '/Finishes/ChatGPT-Image-Feb-5-2026-05_09_59-PM.png',
    alt: 'Project Preview 8',
  },
]

type ProjectsPreviewProps = {
  onImageClick?: (gallery: { src: string; alt: string }[], index: number) => void
}

export default function ProjectsPreview({ onImageClick }: ProjectsPreviewProps) {
  const previewImages = useMemo(() => {
    const shuffled = [...imagePool].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 4)
  }, [])

  const gallery = previewImages.map((item) => ({ src: item.image, alt: item.alt }))

  return (
    <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        {/* Section Heading */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '5rem',
          marginLeft: '10vw',
          marginRight: '10vw',
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            Selected Projects & Surfaces
          </h2>
          
          <Link
            href="/finishes"
            style={{
              fontSize: '0.9375rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              color: '#2B2B2B',
              textDecoration: 'none',
              position: 'relative',
              transition: 'color 0.2s ease',
            }}
            className="explore-link"
          >
            View All →
          </Link>
        </div>

        {/* Preview Grid - 4 images, relaxed editorial rhythm */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '40px',
          marginLeft: '10vw',
          marginRight: '10vw',
        }}
        className="projects-preview-grid"
        >
          {previewImages.map((item) => (
            <div
              key={item.id}
              style={{
                width: '100%',
                aspectRatio: item.id % 2 === 0 ? '4/3' : '3.6/4',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                marginTop: item.id % 2 === 0 ? '0.85rem' : 0,
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                style={{
                  objectFit: 'cover',
                  cursor: onImageClick ? 'zoom-in' : 'pointer',
                }}
                onClick={() => onImageClick?.(gallery, previewImages.findIndex((img) => img.id === item.id))}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
