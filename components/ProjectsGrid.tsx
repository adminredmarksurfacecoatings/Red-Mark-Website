'use client'

import Image from 'next/image'

// Curated selection of 9 images from /public/Finishes/ for the Projects page
const projectImages = [
  {
    id: 1,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-03_52_52-PM.png',
    aspectRatio: '3/4' as const,
  },
  {
    id: 2,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-03_55_38-PM.png',
    aspectRatio: '4/3' as const,
  },
  {
    id: 3,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-03_57_20-PM.png',
    aspectRatio: '3/4' as const,
  },
  {
    id: 4,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_05_15-PM.png',
    aspectRatio: '4/3' as const,
  },
  {
    id: 5,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_08_02-PM.png',
    aspectRatio: '3/4' as const,
  },
  {
    id: 6,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_09_48-PM.png',
    aspectRatio: '4/3' as const,
  },
  {
    id: 7,
    image: '/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png',
    aspectRatio: '4/3' as const,
  },
  {
    id: 8,
    image: '/Finishes/ChatGPT-Image-Feb-5-2026-05_09_59-PM.png',
    aspectRatio: '3/4' as const,
  },
  {
    id: 9,
    image: '/Finishes/ChatGPT-Image-Feb-7-2026-10_25_26-AM.png',
    aspectRatio: '4/3' as const,
  },
]

export default function ProjectsGrid() {
  // Distribute images into 3 columns for masonry layout
  const column1 = projectImages.filter((_, i) => i % 3 === 0)
  const column2 = projectImages.filter((_, i) => i % 3 === 1)
  const column3 = projectImages.filter((_, i) => i % 3 === 2)

  return (
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
        {column1.map((project) => (
          <div
            key={project.id}
            style={{
              width: '100%',
              aspectRatio: project.aspectRatio,
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
              src={project.image}
              alt={`Project ${project.id}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>

      {/* Column 2 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {column2.map((project) => (
          <div
            key={project.id}
            style={{
              width: '100%',
              aspectRatio: project.aspectRatio,
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
              src={project.image}
              alt={`Project ${project.id}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>

      {/* Column 3 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {column3.map((project) => (
          <div
            key={project.id}
            style={{
              width: '100%',
              aspectRatio: project.aspectRatio,
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
              src={project.image}
              alt={`Project ${project.id}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
