import type { Metadata } from 'next'
import ProjectsGrid from '@/components/ProjectsGrid'
import { createPageMetadata } from '@/lib/seo'
import { fetchEnabledMediaUrls, folderPathFromId } from '@/lib/supabase/mediaLibrary'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = createPageMetadata({
  title: 'Wall Texture Projects Across India',
  description:
    'Browse real wall texture and mineral finish projects across India — residential, commercial, and hospitality spaces finished with Red Mark surface coatings.',
  path: '/projects',
  image: '/home_grid_3.png',
  imageAlt: 'Red Mark wall texture project in India',
})

export default async function ProjectsPage() {
  const projectImages = await fetchEnabledMediaUrls(folderPathFromId('projects'))
  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="page-section page-section--first" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container projects-page__container">
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '3rem', /* Generous spacing between heading and subtext */
          }}>
            Projects
          </h1>
          
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#4A4A4A',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            A selection of architectural spaces featuring our mineral surfaces.
          </p>
        </div>
      </section>

      {/* Editorial Masonry Grid */}
      <section className="page-section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container projects-page__container">
          <ProjectsGrid images={projectImages} />
        </div>
      </section>
    </div>
  )
}
