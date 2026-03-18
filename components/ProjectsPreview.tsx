'use client'

import Image from 'next/image'
import Link from 'next/link'

// Manually curated preview - max 4 images
const previewImages = [
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
]

export default function ProjectsPreview() {
  return (
    <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        {/* Section Heading */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '4rem',
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

        {/* Preview Grid - 4 images, 2x2 on desktop */}
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
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
