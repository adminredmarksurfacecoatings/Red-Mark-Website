'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProfessionalsMenu, setShowProfessionalsMenu] = useState(false)
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  
  // Check if we're on the Finishes, Projects, About, Contact, Thank You, For Professionals, or Collections pages (all use solid navbar)
  const isFinishesPage = pathname === '/finishes'
  const isProjectsPage = pathname === '/projects'
  const isAboutPage = pathname === '/about'
  const isContactPage = pathname === '/contact'
  const isThankYouPage = pathname === '/thank-you'
  const isForProfessionalsPage = pathname?.startsWith('/for-professionals') || false
  const isCollectionsPage = pathname?.startsWith('/collections') || false
  const isStructuredPage = isFinishesPage || isProjectsPage || isAboutPage || isContactPage || isThankYouPage || isForProfessionalsPage || isCollectionsPage

  useEffect(() => {
    if (isStructuredPage) {
      // On Finishes/Projects pages, always show solid navbar
      setIsScrolled(true)
      return
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    // Sync immediately on route change so navbar state is correct without requiring manual scroll.
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isStructuredPage])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout)
      }
    }
  }, [hideTimeout])

  // On Finishes/Projects pages: always solid, sticky, with border
  // On other pages: transparent over hero, solid on scroll
  const navBackground = isStructuredPage ? 'var(--bg-primary)' : (isScrolled ? 'var(--bg-primary)' : 'transparent')
  const navPosition = isStructuredPage ? 'sticky' : 'fixed'
  const navBorder = isStructuredPage ? '1px solid var(--border-subtle)' : 'none'
  const navTextColor = isStructuredPage ? 'var(--text-primary)' : (isScrolled ? 'var(--text-primary)' : '#F5F2ED')
  const isTransparentNav = !isStructuredPage && !isScrolled
  const logoFilter = isStructuredPage ? 'none' : (isScrolled ? 'none' : 'brightness(0) invert(1) drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.55))')

  return (
    <nav
      className={isTransparentNav ? 'site-nav nav--transparent' : 'site-nav nav--solid'}
      style={{
      position: navPosition,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: navBackground,
      borderBottom: navBorder,
      boxShadow: isScrolled || isStructuredPage ? '0 10px 30px rgba(20, 20, 20, 0.07)' : 'none',
      transition: 'background-color 0.3s ease, border-bottom 0.3s ease, box-shadow 0.3s ease',
      backdropFilter: 'none',
    }}
    >
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2.5rem 4rem',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Logo - RM Monogram (deep oxide red) */}
        <Link href="/" className="logo-link" style={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: '4rem', /* Generous breathing space */
        }}>
          <Image 
            src="/Logo.png" 
            alt="Red Mark Surface Coatings" 
            width={50} 
            height={50}
            quality={75}
            style={{ 
              objectFit: 'contain',
              filter: logoFilter,
              opacity: 1,
              transition: 'filter 0.3s ease',
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3.5rem',
        }}
        className="desktop-nav"
        >
          <Link href="/finishes" style={{
            fontSize: '0.875rem',
            letterSpacing: '0.07em',
            fontWeight: 500,
            color: navTextColor,
            textTransform: 'uppercase',
            position: 'relative',
            paddingBottom: '0.5rem',
            transition: 'color 0.2s ease',
            opacity: isStructuredPage || isScrolled ? 0.88 : 0.88,
          }}
          className="nav-link"
          >
            Finishes
          </Link>
          
          <Link href="/projects" style={{
            fontSize: '0.875rem',
            letterSpacing: '0.07em',
            fontWeight: 500,
            color: navTextColor,
            textTransform: 'uppercase',
            position: 'relative',
            paddingBottom: '0.5rem',
            transition: 'color 0.2s ease',
            opacity: isStructuredPage || isScrolled ? 0.88 : 0.88,
          }}
          className="nav-link"
          >
            Projects
          </Link>
          
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              paddingBottom: '4px',
            }}
            onMouseEnter={() => {
              // Clear any pending hide timeout
              if (hideTimeout) {
                clearTimeout(hideTimeout)
                setHideTimeout(null)
              }
              setShowProfessionalsMenu(true)
            }}
            onMouseLeave={() => {
              // Add delay before hiding
              const timeout = setTimeout(() => {
                setShowProfessionalsMenu(false)
              }, 200)
              setHideTimeout(timeout)
            }}
          >
            <Link href="/for-professionals" style={{
              fontSize: '0.875rem',
              letterSpacing: '0.07em',
              fontWeight: 500,
              color: navTextColor,
              textTransform: 'uppercase',
              position: 'relative',
              paddingBottom: '0.5rem',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              opacity: isStructuredPage || isScrolled ? 0.88 : 0.88,
            }}
            className="nav-link"
            >
              For Professionals
            </Link>
            
            {/* Invisible Hover Bridge */}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                height: '10px',
                marginTop: '4px',
                zIndex: 1002,
              }}
              onMouseEnter={() => {
                // Clear any pending hide timeout when entering bridge
                if (hideTimeout) {
                  clearTimeout(hideTimeout)
                  setHideTimeout(null)
                }
                setShowProfessionalsMenu(true)
              }}
            />
            
            {/* Dropdown Menu */}
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '4px',
                backgroundColor: 'var(--bg-primary)',
                minWidth: '220px',
                padding: '1.5rem 0',
                border: '1px solid var(--border-subtle)',
                opacity: showProfessionalsMenu ? 1 : 0,
                visibility: showProfessionalsMenu ? 'visible' : 'hidden',
                transition: 'opacity 0.2s ease, visibility 0.2s ease',
                pointerEvents: showProfessionalsMenu ? 'auto' : 'none',
                zIndex: 1001,
              }}
              onMouseEnter={() => {
                // Clear any pending hide timeout when entering dropdown
                if (hideTimeout) {
                  clearTimeout(hideTimeout)
                  setHideTimeout(null)
                }
                setShowProfessionalsMenu(true)
              }}
              onMouseLeave={() => {
                // Add delay before hiding when leaving dropdown
                const timeout = setTimeout(() => {
                  setShowProfessionalsMenu(false)
                }, 200)
                setHideTimeout(timeout)
              }}
            >
                <Link href="/for-professionals/architects" style={{
                  display: 'block',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(106, 30, 30, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
                >
                  Architects
                </Link>
                <Link href="/for-professionals/builders" style={{
                  display: 'block',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(106, 30, 30, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
                >
                  Builders
                </Link>
                <Link href="/for-professionals/dealers" style={{
                  display: 'block',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(106, 30, 30, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
                >
                  Dealers
                </Link>
              </div>
          </div>
          
          <Link href="/about" style={{
            fontSize: '0.875rem',
            letterSpacing: '0.07em',
            fontWeight: 500,
            color: navTextColor,
            textTransform: 'uppercase',
            position: 'relative',
            paddingBottom: '0.5rem',
            transition: 'color 0.2s ease',
            opacity: isStructuredPage || isScrolled ? 0.88 : 0.88,
          }}
          className="nav-link"
          >
            About
          </Link>
          
          <Link href="/contact" style={{
            fontSize: '0.875rem',
            letterSpacing: '0.07em',
            fontWeight: 500,
            color: navTextColor,
            textTransform: 'uppercase',
            position: 'relative',
            paddingBottom: '0.5rem',
            transition: 'color 0.2s ease',
            opacity: 1,
          }}
          className="nav-link"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: navTextColor,
            cursor: 'pointer',
            fontSize: '1.5rem',
            padding: '0.5rem',
          }}
          className="mobile-menu-btn"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          display: 'none',
          flexDirection: 'column',
          padding: '2rem 4rem',
          gap: '1.5rem',
          backgroundColor: 'var(--bg-primary)',
        }}
        className="mobile-menu"
        >
          <Link href="/finishes" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', fontSize: '1rem', opacity: 0.88 }}>Finishes</Link>
          <Link href="/projects" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', fontSize: '1rem', opacity: 0.88 }}>Projects</Link>
          <Link href="/for-professionals" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', fontSize: '1rem', opacity: 0.88 }}>For Professionals</Link>
          <Link href="/for-professionals/architects" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', fontSize: '0.875rem', paddingLeft: '1rem', opacity: 0.88 }}>Architects</Link>
          <Link href="/for-professionals/builders" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', fontSize: '0.875rem', paddingLeft: '1rem', opacity: 0.88 }}>Builders</Link>
          <Link href="/for-professionals/dealers" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', fontSize: '0.875rem', paddingLeft: '1rem', opacity: 0.88 }}>Dealers</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', fontSize: '1rem', opacity: 0.88 }}>About</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', fontSize: '1rem', opacity: 1 }}>Contact</Link>
        </div>
      )}

      <style jsx>{`
        .nav--transparent .logo-link {
          text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.55);
        }

        .nav--solid .logo-link {
          text-shadow: none;
        }

        .nav-link {
          position: relative;
        }

        .nav--transparent .nav-link {
          text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.55);
        }

        .nav--solid .nav-link {
          text-shadow: none;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: currentColor;
          opacity: 0.7;
          transition: width 0.25s ease;
        }
        
        .nav-link:hover::after,
        .nav-link:active::after {
          width: 100%;
        }
        
        /* Active state for current page */
        .nav-link.active::after {
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          
          .desktop-nav {
            display: none !important;
          }
          
          .mobile-menu {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  )
}
