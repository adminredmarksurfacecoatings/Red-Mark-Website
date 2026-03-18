'use client'

import Image from 'next/image'

const finishes = [
  {
    id: 1,
    name: 'Sandstone',
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-03_52_52-PM.png',
  },
  {
    id: 2,
    name: 'Urban Grey',
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-03_55_38-PM.png',
  },
  {
    id: 3,
    name: 'Clay',
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-03_57_20-PM.png',
  },
  {
    id: 4,
    name: 'Slate',
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_05_15-PM.png',
  },
  {
    id: 5,
    name: 'Ash',
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_08_02-PM.png',
  },
  {
    id: 6,
    name: 'Limestone',
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_09_48-PM.png',
  },
]

export default function ExteriorFinishGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '40px',
      marginLeft: '10vw',
      marginRight: '10vw',
    }}
    className="finishes-grid"
    >
      {finishes.map((finish) => (
        <div
          key={finish.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
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
          {/* Image */}
          <div style={{
            width: '100%',
            aspectRatio: '4/3',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '4px',
            marginBottom: '1.5rem',
          }}>
            <Image
              src={finish.image}
              alt={finish.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Finish Name */}
          <h3 style={{
            fontSize: 'clamp(1.25rem, 1.75vw, 1.5rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            textAlign: 'center',
          }}>
            {finish.name}
          </h3>
        </div>
      ))}
    </div>
  )
}
