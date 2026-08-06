'use client'

import Image from 'next/image'

// Curated selection of 9 images from /public/Finishes/ for the Mineral Collection gallery
const galleryImages = [
  {
    id: 1,
    image: '/Finishes/sand-textured-plaster-wall-interior.png',
    aspectRatio: '3/4' as const,
  },
  {
    id: 2,
    image: '/Finishes/taupe-mineral-wall-texture-bedroom.png',
    aspectRatio: '4/3' as const,
  },
  {
    id: 3,
    image: '/Finishes/teal-textured-wall-coastal-living-room.png',
    aspectRatio: '3/4' as const,
  },
  {
    id: 4,
    image: '/Finishes/blue-venetian-plaster-living-room-wall.png',
    aspectRatio: '4/3' as const,
  },
  {
    id: 5,
    image: '/Finishes/sage-mineral-wall-texture-living-room.png',
    aspectRatio: '3/4' as const,
  },
  {
    id: 6,
    image: '/Finishes/navy-feature-wall-modern-bedroom.png',
    aspectRatio: '4/3' as const,
  },
  {
    id: 7,
    image: '/Finishes/charcoal-textured-facade-exterior-lighting.png',
    aspectRatio: '4/3' as const,
  },
  {
    id: 8,
    image: '/Finishes/beige-textured-exterior-walkway-sconces.png',
    aspectRatio: '3/4' as const,
  },
  {
    id: 9,
    image: '/Finishes/charcoal-dragged-plaster-exterior-wall.png',
    aspectRatio: '4/3' as const,
  },
]

type MineralCollectionGalleryProps = {
  images?: string[]
}

export default function MineralCollectionGallery({ images }: MineralCollectionGalleryProps) {
  const source = (images !== undefined ? images : galleryImages.map((item) => item.image)).map(
    (image, index) => ({
      id: index + 1,
      image,
      aspectRatio: index % 2 === 0 ? ('3/4' as const) : ('4/3' as const),
    }),
  )

  if (source.length === 0) {
    return null
  }

  // Distribute images into 3 columns for masonry layout
  const column1 = source.filter((_, i) => i % 3 === 0)
  const column2 = source.filter((_, i) => i % 3 === 1)
  const column3 = source.filter((_, i) => i % 3 === 2)

  return (
    <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
          marginLeft: '10vw',
          marginRight: '10vw',
        }}
        className="projects-masonry-grid"
        >
          {/* Column 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {column1.map((item) => (
              <div
                key={item.id}
                style={{
                  width: '100%',
                  aspectRatio: item.aspectRatio,
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
                  alt={`Mineral Collection Application ${item.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {column2.map((item) => (
              <div
                key={item.id}
                style={{
                  width: '100%',
                  aspectRatio: item.aspectRatio,
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
                  alt={`Mineral Collection Application ${item.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {column3.map((item) => (
              <div
                key={item.id}
                style={{
                  width: '100%',
                  aspectRatio: item.aspectRatio,
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
                  alt={`Mineral Collection Application ${item.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
