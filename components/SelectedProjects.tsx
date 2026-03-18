'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    image: '/home_grid_1.png',
    height: 'tall', // First column: 1 tall image
  },
  {
    id: 2,
    image: '/home_grid_2.png',
    height: 'medium', // Second column: 2 stacked medium images
  },
  {
    id: 3,
    image: '/home_grid_3.png',
    height: 'medium', // Second column: 2 stacked medium images
  },
  {
    id: 4,
    image: '/home_grid_1.png',
    height: 'tall', // Third column: 1 tall image
  },
  {
    id: 5,
    image: '/home_grid_2.png',
    height: 'medium', // Third column: 2 stacked (if needed)
  },
]

export default function SelectedProjects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Only add animation if IntersectionObserver is supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true) // Fallback: make visible if IntersectionObserver not supported
      return
    }

    const currentSection = sectionRef.current
    if (!currentSection) {
      setIsVisible(true) // Fallback: make visible if ref not available
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

    // Fallback: make visible after a short delay if observer doesn't fire
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

  return (
    <section
      ref={sectionRef}
      className="projects-section page-section"
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
          marginLeft: '10vw', /* Same alignment as other sections */
        }}>
          Selected Projects & Surfaces
        </h2>

        {/* Masonry Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px', /* 40px gap between columns */
          marginLeft: '10vw',
          marginRight: '10vw',
        }}
        className="projects-masonry"
        >
          {/* Column 1: 1 tall image */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px', /* 40px vertical spacing */
          }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '3/4', /* Tall image */
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px', /* Very subtle rounded corners */
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
                src={projects[0].image}
                alt="Project 1"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          {/* Column 2: 2 stacked medium images */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px', /* 40px vertical spacing */
          }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '4/3', /* Medium image */
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
                src={projects[1].image}
                alt="Project 2"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <div
              style={{
                width: '100%',
                aspectRatio: '4/3', /* Medium image */
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
                src={projects[2].image}
                alt="Project 3"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          {/* Column 3: 1 tall image */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '3/4', /* Tall image */
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
                src={projects[3].image}
                alt="Project 4"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
