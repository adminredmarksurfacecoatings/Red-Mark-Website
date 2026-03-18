'use client'

const galleryItems = [
  { id: 1, title: 'Project Alpha', category: 'Branding' },
  { id: 2, title: 'Project Beta', category: 'Web Design' },
  { id: 3, title: 'Project Gamma', category: 'Digital Art' },
  { id: 4, title: 'Project Delta', category: 'UI/UX' },
]

export default function GallerySection() {
  return (
    <section className="section" style={{
      background: 'var(--gradient-bg-section)',
    }}>
      <div className="container">
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'var(--text-light)',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          Our Work
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {galleryItems.map((item) => (
            <div
              key={item.id}
              style={{
                aspectRatio: '4/3',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, var(--primary-red)22 0%, var(--dark-red) 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                <p style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--lighter-red)',
                }}>
                  {item.category}
                </p>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--text-light)',
                }}>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
