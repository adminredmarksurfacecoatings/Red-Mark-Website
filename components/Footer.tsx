import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        background: 'var(--gradient-footer)',
        padding: '7rem 0 2.5rem',
        marginTop: '10rem',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          background: 'linear-gradient(180deg, rgba(245, 242, 237, 0) 0%, rgba(106, 30, 30, 0.08) 100%)',
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="footer-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr',
            gap: '4rem',
            marginBottom: '3.75rem',
            alignItems: 'start',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
                marginBottom: '0.9rem',
              }}
            >
              Red Mark Surface Coatings
            </h3>
            <p
              style={{
                maxWidth: '400px',
                fontSize: '0.975rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                letterSpacing: '0.01em',
              }}
            >
              Crafted mineral finishes with depth, texture, and permanence.
            </p>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.2rem',
                color: 'var(--text-primary)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
              }}
            >
              Navigation
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem',
              }}
            >
              <li><Link href="/finishes" className="footer-link">Finishes</Link></li>
              <li><Link href="/projects" className="footer-link">Projects</Link></li>
              <li><Link href="/for-professionals" className="footer-link">For Professionals</Link></li>
              <li><Link href="/about" className="footer-link">About</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.2rem',
                color: 'var(--text-primary)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
              }}
            >
              For Professionals
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem',
              }}
            >
              <li><Link href="/for-professionals/architects" className="footer-link">Architects</Link></li>
              <li><Link href="/for-professionals/builders" className="footer-link">Builders</Link></li>
              <li><Link href="/for-professionals/dealers" className="footer-link">Dealers</Link></li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(106, 30, 30, 0.12)',
            paddingTop: '1.5rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.84rem',
              fontFamily: "'Inter', sans-serif",
              marginBottom: '0.35rem',
              letterSpacing: '0.01em',
            }}
          >
            © {new Date().getFullYear()} Red Mark Surface Coatings. All rights reserved.
          </p>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.01em',
              opacity: 0.9,
            }}
          >
            Crafted for enduring interiors and timeless spaces.
          </p>
        </div>
      </div>

    </footer>
  )
}
