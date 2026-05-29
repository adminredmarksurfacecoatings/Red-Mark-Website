'use client'

import { useState } from 'react'
import ImageModal from '@/components/ImageModal'
import GalleryImageTile from '@/components/GalleryImageTile'

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

type ProjectsGridProps = {
  images?: string[]
}

type ProjectItem = {
  id: number
  image: string
  aspectRatio: '3/4' | '4/3'
}

function ProjectColumn({
  projects,
  onImageClick,
}: {
  projects: ProjectItem[]
  onImageClick: (id: number) => void
}) {
  return (
    <div className="projects-masonry-column">
      {projects.map((project) => (
        <GalleryImageTile
          key={project.id}
          src={project.image}
          alt={`Project ${project.id}`}
          aspectRatio={project.aspectRatio}
          onClick={() => onImageClick(project.id)}
        />
      ))}
    </div>
  )
}

export default function ProjectsGrid({ images }: ProjectsGridProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const imageList = images !== undefined ? images : projectImages.map((item) => item.image)
  const sourceImages: ProjectItem[] = imageList.map((image, index) => ({
    id: index + 1,
    image,
    aspectRatio: index % 2 === 0 ? '3/4' : '4/3',
  }))
  const gallery = sourceImages.map((project) => ({ src: project.image, alt: `Project ${project.id}` }))

  if (sourceImages.length === 0) {
    return (
      <p className="admin-media-note" style={{ marginLeft: '10vw', marginRight: '10vw' }}>
        No project images yet. Upload images in the admin panel under Projects.
      </p>
    )
  }

  const column1 = sourceImages.filter((_, i) => i % 3 === 0)
  const column2 = sourceImages.filter((_, i) => i % 3 === 1)
  const column3 = sourceImages.filter((_, i) => i % 3 === 2)

  const openProject = (id: number) => {
    setActiveImageIndex(sourceImages.findIndex((item) => item.id === id))
  }

  return (
    <div
      className="projects-masonry-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '40px',
        marginLeft: '10vw',
        marginRight: '10vw',
      }}
    >
      <ProjectColumn projects={column1} onImageClick={openProject} />
      <ProjectColumn projects={column2} onImageClick={openProject} />
      <ProjectColumn projects={column3} onImageClick={openProject} />
      <ImageModal
        isOpen={activeImageIndex !== null}
        images={gallery}
        currentIndex={activeImageIndex || 0}
        onNavigate={(nextIndex) => setActiveImageIndex(nextIndex)}
        onClose={() => setActiveImageIndex(null)}
      />
    </div>
  )
}
