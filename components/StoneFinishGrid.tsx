'use client'

import Image from 'next/image'

const finishes = [
  {
    id: 1,
    name: 'Terra',
    image: '/Finishes/ochre-mineral-wall-texture-living-room.png',
  },
  {
    id: 2,
    name: 'Ochre',
    image: '/Finishes/mustard-limewash-wall-dining-room.png',
  },
  {
    id: 3,
    name: 'Basalt',
    image: '/Finishes/ochre-stucco-exterior-patio-finish.png',
  },
  {
    id: 4,
    name: 'Travertine',
    image: '/Finishes/sage-green-mineral-wall-living-room.png',
  },
  {
    id: 5,
    name: 'Sand',
    image: '/Finishes/blue-limewash-wall-modern-bedroom.png',
  },
  {
    id: 6,
    name: 'Clay',
    image: '/Finishes/sand-plaster-wall-kitchen-island.png',
  },
]

type StoneFinishGridProps = {
  images?: string[]
}

export default function StoneFinishGrid({ images }: StoneFinishGridProps) {
  const source = images !== undefined ? images : finishes.map((item) => item.image)

  if (source.length === 0) {
    return null
  }
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
      {source.map((image, index) => {
        const finish = finishes[index] ?? { id: index + 1, name: `Finish ${index + 1}`, image }
        return (
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
              src={image}
              alt={finish.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={75}
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
        )
      })}
    </div>
  )
}
