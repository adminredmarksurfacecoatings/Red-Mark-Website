import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContactFormSection from '@/components/contact/ContactFormSection'
import { BRAND_TAGLINE } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Red Mark for architect and builder project support, dealer partnerships, or homeowner enquiries routed through authorized dealers.',
}

export default function ContactPage() {
  const whatsappHref =
    'https://wa.me/918968310500?text=Hello%2C%20I%E2%80%99m%20interested%20in%20your%20surface%20finishes.%20I%E2%80%99d%20like%20to%20discuss%20a%20project.'

  return (
    <>
      <section className="page-section page-section--first contact-page-hero">
        <div className="container contact-page-hero__container">
          <h1 className="contact-page-hero__heading">Contact</h1>
          <p className="contact-page-hero__lead">{BRAND_TAGLINE}</p>
          <p className="contact-page-hero__support">
            Architects, builders, and commercial projects work directly with Red Mark. Homeowners are
            typically connected through authorized local dealers.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="contact-page-quick-links">
            <Link href="/find-a-dealer" className="contact-page-quick-links__card">
              <span className="contact-page-quick-links__eyebrow">Homeowners</span>
              <strong>Get Connected to a Dealer</strong>
              <span>Request your local authorized partner</span>
            </Link>
            <Link href="/contact?audience=architect" className="contact-page-quick-links__card">
              <span className="contact-page-quick-links__eyebrow">Professionals</span>
              <strong>Request Project Support</strong>
              <span>Samples, specs, and technical guidance</span>
            </Link>
            <Link href="/for-professionals/dealers" className="contact-page-quick-links__card">
              <span className="contact-page-quick-links__eyebrow">Dealers</span>
              <strong>Become a Dealer</strong>
              <span>Distribution partnerships</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="contact-page-feature-image">
            <Image
              src="/Finishes/ChatGPT-Image-Feb-17-2026-04_15_19-PM.png"
              alt="Red Mark Surface Coatings"
              fill
              sizes="100vw"
              quality={75}
              style={{ objectFit: 'cover', filter: 'brightness(0.96) saturate(0.95)' }}
            />
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container contact-page-grid material-detail-grid">
          <div className="contact-page-sidebar">
            <h2 className="contact-page-sidebar__heading">Get in Touch</h2>
            <p className="contact-page-sidebar__text">
              Choose your enquiry type in the form. This helps us route your message to the right team
              — or to your nearest authorized dealer when appropriate.
            </p>

            <div className="contact-page-sidebar__block">
              <span className="contact-page-sidebar__label">Email</span>
              <a href="mailto:info@redmarksurfacecoatings.com" className="collection-link">
                info@redmarksurfacecoatings.com
              </a>
            </div>

            <div className="contact-page-sidebar__block">
              <span className="contact-page-sidebar__label">Phone — India</span>
              <a href="tel:+918968310500" className="collection-link">
                +91 89683 10500
              </a>
            </div>

            <div className="contact-page-sidebar__block">
              <span className="contact-page-sidebar__label">Phone — Canada</span>
              <a href="tel:+15144464255" className="collection-link">
                +1 514 446 4255
              </a>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-inquiry-btn"
              aria-label="WhatsApp Inquiry: chat now"
            >
              WhatsApp Inquiry →
            </a>
          </div>

          <div>
            <h3 className="contact-page-form__heading">Project Enquiry</h3>
            <p className="contact-page-form__intro">
              Tell us who you are and what you need. Large homeowner projects may also receive Red
              Mark technical support alongside dealer fulfillment.
            </p>
            <ContactFormSection />
          </div>
        </div>
      </section>
    </>
  )
}
