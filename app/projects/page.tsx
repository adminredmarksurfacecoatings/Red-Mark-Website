import type { Metadata } from 'next'
import ProjectsGrid from '@/components/ProjectsGrid'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'View architectural projects featuring Red Mark mineral finishes across residential, commercial, and hospitality spaces.',
}

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-section page-section--first" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
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
        <div className="container" style={{ margin: '0 auto', padding: '0 4rem' }}>
          <ProjectsGrid />
        </div>
      </section>
    </>
  )
}
