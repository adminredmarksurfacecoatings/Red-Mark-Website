import type { Metadata } from 'next'
import { BUSINESS_OPERATOR, BUSINESS_ADDRESS } from '@/lib/business'
import SimpleContactForm from '@/components/contact/SimpleContactForm'
import { BRAND_TAGLINE } from '@/lib/brand'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_CANADA,
  CONTACT_PHONE_CANADA_DISPLAY,
  CONTACT_PHONE_INDIA,
  CONTACT_PHONE_INDIA_DISPLAY,
  CONTACT_WHATSAPP_HREF,
} from '@/lib/contact'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Contact for Projects & Enquiries',
  description:
    'Contact Red Mark Surface Coatings for project support, samples, finish guidance, or general enquiries. Call, WhatsApp, or send a short message.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <section className="page-section page-section--first contact-page-hero">
        <div className="container contact-page-hero__container">
          <h1 className="contact-page-hero__heading">Contact</h1>
          <p className="contact-page-hero__lead">{BRAND_TAGLINE}</p>
          <p className="contact-page-hero__support">
            Tell us about your project or ask a question about a finish.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container contact-page-grid material-detail-grid">
          <div className="contact-page-sidebar">
            <h2 className="contact-page-sidebar__heading">Get in Touch</h2><p className="contact-page-sidebar__text">{BUSINESS_OPERATOR}</p><address className="contact-page-sidebar__text">{BUSINESS_ADDRESS}</address><p className="contact-page-sidebar__text">Privacy, complaints and returns: use the email or India phone below. Confirm return shipping before sending goods to us.</p>
            <p className="contact-page-sidebar__text">
              Prefer to talk? Call or message us on WhatsApp, or send a short enquiry with the form.
            </p>

            <div className="contact-page-sidebar__reach">
              <div className="contact-page-sidebar__block">
                <span className="contact-page-sidebar__label">Email</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="collection-link">
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className="contact-page-sidebar__phones">
                <div className="contact-page-sidebar__block">
                  <span className="contact-page-sidebar__label">Phone — India</span>
                  <a href={`tel:${CONTACT_PHONE_INDIA}`} className="collection-link">
                    {CONTACT_PHONE_INDIA_DISPLAY}
                  </a>
                </div>

                <div className="contact-page-sidebar__block">
                  <span className="contact-page-sidebar__label">Phone — Canada</span>
                  <a href={`tel:${CONTACT_PHONE_CANADA}`} className="collection-link">
                    {CONTACT_PHONE_CANADA_DISPLAY}
                  </a>
                </div>
              </div>

              <a
                href={CONTACT_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-inquiry-btn"
                aria-label="WhatsApp Inquiry: chat now"
              >
                WhatsApp Inquiry →
              </a>
            </div>
          </div>

          <div>
            <h3 className="contact-page-form__heading">Send a Message</h3>
            <p className="contact-page-form__intro">
              Tell us about your project, then continue to WhatsApp.
            </p>
            <SimpleContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
