import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--gradient-footer)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '6rem 0 3rem',
      marginTop: '8rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '4rem',
          marginBottom: '4rem',
        }}>
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
            }}>
              Navigation
            </h4>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <li><Link href="/finishes" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Finishes</Link></li>
              <li><Link href="/projects" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Projects</Link></li>
              <li><Link href="/for-professionals" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>For Professionals</Link></li>
              <li><Link href="/about" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>About</Link></li>
              <li><Link href="/contact" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
            }}>
              For Professionals
            </h4>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <li><Link href="/for-professionals/architects" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Architects</Link></li>
              <li><Link href="/for-professionals/builders" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Builders</Link></li>
              <li><Link href="/for-professionals/dealers" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Dealers</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '2rem',
          textAlign: 'center',
        }}>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            fontFamily: "'Inter', sans-serif",
          }}>
            © {new Date().getFullYear()} Red Mark Surface Coatings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
