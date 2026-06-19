'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const primaryLinks = [
  { href: '/finishes', label: 'Finishes' },
  { href: '/projects', label: 'Projects' },
  { href: '/catalogues', label: 'Catalogues' },
  { href: '/for-professionals', label: 'For Professionals' },
]

const menuLinks = [
  ...primaryLinks,
  { href: '/find-a-dealer', label: 'Find a Dealer' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
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
    pathname === '/find-a-dealer' ||
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

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

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
      }}
    >
      <div className="site-nav__inner container">
        <Link href="/" className="logo-link site-nav__logo">
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
              transition: 'filter 0.3s ease',
            }}
          />
        </Link>

        <div className="site-nav__desktop">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: navTextColor }}
              className={`nav-link site-nav__link${pathname === link.href || pathname?.startsWith(`${link.href}/`) ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/find-a-dealer"
            style={{ color: navTextColor }}
            className={`nav-link site-nav__link site-nav__link--dealer${pathname === '/find-a-dealer' ? ' active' : ''}`}
          >
            Find a Dealer
          </Link>
          <Link
            href="/contact"
            className={`btn nav-contact-btn${isTransparentNav ? ' nav-contact-btn--light' : ''}`}
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className="site-nav__menu-btn"
          style={{ color: navTextColor }}
        >
          Menu
        </button>
      </div>

      {isMenuOpen ? (
        <div className="site-nav__drawer" role="dialog" aria-label="Site menu">
          <div className="site-nav__drawer-panel">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`site-nav__drawer-link${pathname === link.href ? ' is-active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/for-professionals/dealers" className="site-nav__drawer-link">
              Become a Dealer
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
