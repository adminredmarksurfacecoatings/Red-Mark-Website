import Link from 'next/link'
import { BRAND_SHORT } from '@/lib/brand'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__fade" />

      <div className="container site-footer__container">
        <div className="footer-main-grid site-footer__grid">
          <div>
            <h3 className="site-footer__brand">Red Mark Surface Coatings</h3>
            <p className="site-footer__tagline">{BRAND_SHORT}</p>
            <p className="site-footer__dealer-note">
              Manufactured by Red Mark. Supplied through authorized dealers across India.
            </p>
          </div>

          <div>
            <h4 className="site-footer__heading">Explore</h4>
            <ul className="site-footer__list">
              <li><Link href="/finishes" className="footer-link">Finishes</Link></li>
              <li><Link href="/projects" className="footer-link">Projects</Link></li>
              <li><Link href="/catalogues" className="footer-link">Catalogues</Link></li>
              <li><Link href="/about" className="footer-link">About</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="site-footer__heading">Professionals & Dealers</h4>
            <ul className="site-footer__list">
              <li><Link href="/for-professionals" className="footer-link">For Professionals</Link></li>
              <li><Link href="/for-professionals/architects" className="footer-link">Architect Resources</Link></li>
              <li><Link href="/find-a-dealer" className="footer-link">Find a Dealer</Link></li>
              <li><Link href="/for-professionals/dealers" className="footer-link">Become a Dealer</Link></li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Red Mark Surface Coatings. All rights reserved.</p>
          <p>Crafted for enduring architecture — interior and exterior.</p>
        </div>
      </div>
    </footer>
  )
}
