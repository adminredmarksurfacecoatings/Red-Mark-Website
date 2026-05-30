'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/finishes', label: 'Finishes' },
  { href: '/projects', label: 'Projects' },
  { href: '/catalogues', label: 'Catalogues' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isStructuredPage =
    pathname === '/finishes' ||
    pathname === '/projects' ||
    pathname === '/about' ||
    pathname === '/contact' ||
    pathname === '/thank-you' ||
    pathname === '/catalogues' ||
    pathname?.startsWith('/for-professionals') ||
    pathname?.startsWith('/collections') ||
    pathname?.startsWith('/finishes/exterior') ||
    pathname?.startsWith('/finishes/interior') ||
    pathname?.startsWith('/finishes/all')

  useEffect(() => {
    if (isStructuredPage) {
      setIsScrolled(true)
      return
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isStructuredPage])

  const navBackground = isStructuredPage ? 'var(--bg-primary)' : isScrolled ? 'var(--bg-primary)' : 'transparent'
  const navPosition = isStructuredPage ? 'sticky' : 'fixed'
  const navBorder = isStructuredPage ? '1px solid var(--border-subtle)' : 'none'
  const navTextColor = isStructuredPage ? 'var(--text-primary)' : isScrolled ? 'var(--text-primary)' : '#F5F2ED'
  const isTransparentNav = !isStructuredPage && !isScrolled
  const logoFilter = isStructuredPage ? 'none' : isScrolled ? 'none' : 'brightness(0) invert(1) drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.55))'

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
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2.5rem 4rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <Link
          href="/"
          className="logo-link"
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingRight: '4rem',
          }}
        >
          <Image
            src="/Logo.svg"
            alt="Red Mark Surface Coatings"
            width={50}
            height={50}
            quality={75}
            style={{
              objectFit: 'contain',
              transform: 'scale(1.1)',
              transformOrigin: 'left center',
              filter: logoFilter,
              opacity: 1,
              transition: 'filter 0.3s ease',
            }}
          />
        </Link>

        <div
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.875rem',
                letterSpacing: '0.07em',
                fontWeight: 500,
                color: navTextColor,
                textTransform: 'uppercase',
                position: 'relative',
                paddingBottom: '0.5rem',
                transition: 'color 0.2s ease',
                opacity: 0.88,
              }}
              className={`nav-link${pathname === link.href ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className={`btn nav-contact-btn${isTransparentNav ? ' nav-contact-btn--light' : ''}`}
          >
            Contact
          </Link>
        </div>

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

      {isMenuOpen ? (
        <div
          className="mobile-menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            padding: '2rem 4rem',
            gap: '1.5rem',
            backgroundColor: 'var(--bg-primary)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{ color: 'var(--text-primary)', fontSize: '1rem', opacity: 0.88 }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="btn"
            style={{ width: 'fit-content' }}
          >
            Contact
          </Link>
        </div>
      ) : null}

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
        .nav-link:active::after,
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
