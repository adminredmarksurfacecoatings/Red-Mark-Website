'use client'

import { useState } from 'react'
import Link from 'next/link'
import ImageModal from '@/components/ImageModal'
import GalleryImageTile from '@/components/GalleryImageTile'
import { useInfiniteBatch } from '@/lib/useInfiniteBatch'

const fallbackProjectImages = [
  '/Finishes/ochre-mineral-wall-texture-living-room.png',
  '/Finishes/mustard-limewash-wall-dining-room.png',
  '/Finishes/ochre-stucco-exterior-patio-finish.png',
  '/Finishes/sage-green-mineral-wall-living-room.png',
  '/Finishes/blue-limewash-wall-modern-bedroom.png',
  '/Finishes/sand-plaster-wall-kitchen-island.png',
  '/Finishes/mediterranean-textured-wall-arched-loggia.png',
  '/Finishes/sand-textured-plaster-wall-interior.png',
  '/Finishes/blue-venetian-plaster-living-room-wall.png',
]

type ProjectItem = {
  id: number
  image: string
  aspectRatio: '3/4' | '4/3'
}

type ProjectsGridProps = {
  images?: string[]
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

  const imageList = images !== undefined && images.length > 0 ? images : fallbackProjectImages

  const allProjects: ProjectItem[] = imageList.map((image, index) => ({
    id: index + 1,
    image,
    aspectRatio: index % 2 === 0 ? '3/4' : '4/3',
  }))

  const { visibleItems, sentinelRef, hasMore } = useInfiniteBatch(allProjects)

  const gallery = allProjects.map((project) => ({
    src: project.image,
    alt: `Project ${project.id}`,
  }))

  if (allProjects.length === 0) {
    return (
      <p className="admin-media-note" style={{ marginLeft: '10vw', marginRight: '10vw' }}>
        No project images yet. Upload images in the admin panel under Projects.
      </p>
    )
  }

  const column1 = visibleItems.filter((_, i) => i % 3 === 0)
  const column2 = visibleItems.filter((_, i) => i % 3 === 1)
  const column3 = visibleItems.filter((_, i) => i % 3 === 2)

  const openProject = (id: number) => {
    setActiveImageIndex(allProjects.findIndex((item) => item.id === id))
  }

  return (
    <div className="projects-page-grid-wrap">
      <div className="projects-masonry-grid">
        <ProjectColumn projects={column1} onImageClick={openProject} />
        <ProjectColumn projects={column2} onImageClick={openProject} />
        <ProjectColumn projects={column3} onImageClick={openProject} />
      </div>

      {hasMore ? (
        <div
          ref={sentinelRef}
          className="gallery-load-sentinel"
          aria-hidden="true"
          style={{ height: 1, marginTop: '2rem' }}
        />
      ) : null}

      <div className="projects-page-cta">
        <p>Planning a similar space?</p>
        <Link href="/contact?audience=architect" className="btn">
          Discuss a Similar Project
        </Link>
      </div>

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
