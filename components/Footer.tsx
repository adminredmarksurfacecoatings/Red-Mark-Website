import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import { BRAND_SHORT } from '@/lib/brand'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__fade" />

      <div className="container site-footer__container">
        <div className="footer-main-grid site-footer__grid">
          <div>
            <h3 className="site-footer__brand">Red Mark Surface Coatings</h3>
            <p className="site-footer__tagline">{BRAND_SHORT}</p><p className="site-footer__tagline">Ludhiana, Punjab, India · <Link href="/contact">Business details and contact</Link></p>
          </div>

          <div>
            <h4 className="site-footer__heading">Explore</h4>
            <ul className="site-footer__list">
              <li><Link href="/finishes" className="footer-link">Finishes</Link></li>
              <li><Link href="/request-sample" className="footer-link">Request a sample</Link></li>
              <li><Link href="/projects" className="footer-link">Projects</Link></li>
              <li><Link href="/catalogues" className="footer-link">Catalogues</Link></li>
              <li><Link href="/about" className="footer-link">About</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="site-footer__heading">Professionals</h4>
            <ul className="site-footer__list">
              <li><Link href="/for-professionals" className="footer-link">For Professionals</Link></li>
              <li><Link href="/for-professionals/architects" className="footer-link">Architect Resources</Link></li>
              <li><Link href="/for-professionals/builders" className="footer-link">Builders</Link></li>
              <li><Link href="/for-professionals/dealers" className="footer-link">Dealer Partnerships</Link></li>
            </ul>
          </div>
        </div>

        <nav aria-label="Policies and accessibility" className="policy-links"><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-and-conditions">Terms and Conditions</Link><Link href="/cookie-policy">Cookie Policy</Link><Link href="/refund-policy">Returns and Refund Policy</Link><Link href="/accessibility">Accessibility</Link></nav><ThemeToggle />
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Red Mark Surface Coatings. All rights reserved.</p>
          <p>Crafted for enduring architecture — interior and exterior.</p>
        </div>
      </div>
    </footer>
  )
}
