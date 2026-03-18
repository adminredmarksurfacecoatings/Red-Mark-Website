'use client'

import Image from 'next/image'

const finishes = [
  {
    id: 1,
    image: '/home_grid_1.png',
    title: 'Stone Collection',
    descriptor: 'Layered mineral surfaces with architectural depth.',
  },
  {
    id: 2,
    image: '/home_grid_2.png',
    title: 'Exterior Collection',
    descriptor: 'Refined surfaces engineered for enduring exteriors.',
  },
  {
    id: 3,
    image: '/home_grid_3.png',
    title: 'Mineral Collection',
    descriptor: 'Soft tonal movement with breathable matte character.',
  },
]

export default function SectionThree() {
  return (
    <section className="page-section" style={{ backgroundColor: '#F8F4EE' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        {/* Section Heading */}
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          color: '#2B2B2B', /* Deep charcoal */
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginBottom: '90px', /* Increased by 20px (from 70px to 90px) */
          marginLeft: '10vw', /* Same alignment as Section 2 content */
        }}>
          Explore Our Collections
        </h2>

        {/* Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3rem', /* Generous spacing between columns */
          marginLeft: '10vw',
          marginRight: '10vw',
          alignItems: 'start', /* Ensure tiles align at top */
        }}
        className="finishes-grid"
        >
          {finishes.map((finish) => (
            <div
              key={finish.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.4s ease',
                cursor: 'pointer',
                height: '100%', /* Ensure consistent height for alignment */
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              {/* Image */}
              <div style={{
                width: '100%',
                aspectRatio: '3.5/4', /* Slightly taller for more confident presence */
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px', /* Very subtle rounded corners */
                marginBottom: '28px', /* Consistent spacing between image and title */
              }}>
                <Image
                  src={finish.image}
                  alt={finish.title}
                  fill
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
              <h3 style={{
                fontSize: 'clamp(1.5rem, 2vw, 1.75rem)',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                color: '#2B2B2B',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
                marginBottom: '0.75rem', /* Consistent spacing between title and descriptor */
                minHeight: '2.5rem', /* Ensure consistent baseline alignment */
              }}>
                {finish.title}
              </h3>

              {/* Descriptor */}
              <p style={{
                fontSize: '0.9375rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                color: '#4A4A4A',
                lineHeight: 1.6,
                letterSpacing: '0.01em',
                marginTop: 0, /* Ensure consistent spacing */
              }}>
                {finish.descriptor}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .finishes-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.5rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .finishes-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          h2 {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
