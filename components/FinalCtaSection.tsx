'use client'

import Link from 'next/link'
import ContactWhatsAppActions from '@/components/ContactWhatsAppActions'

export default function FinalCtaSection() {
  return (
    <section className="page-section final-cta-section">
      <div className="container final-cta-section__container">
        <div className="final-cta-section__inner">
          <h2 className="final-cta-section__heading">Ready to Specify or Source a Finish?</h2>
          <p className="final-cta-section__text">
            Reach out for samples, project support, or finish guidance — we typically respond within
            24 hours.
          </p>
          <ContactWhatsAppActions
            className="final-cta-section__actions contact-whatsapp-actions"
            contactLabel="Contact Us →"
            whatsappLabel="WhatsApp →"
            contactClassName="btn final-cta-btn"
            whatsappClassName="final-cta-section__secondary"
          />
          <p className="final-cta-section__alt">
            Or browse{' '}
            <Link href="/finishes" className="final-cta-section__inline-link">
              finishes
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
