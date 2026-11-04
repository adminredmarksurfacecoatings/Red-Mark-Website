import Link from 'next/link'
import { CONTACT_WHATSAPP_HREF } from '@/lib/contact'

export default function FinalCtaSection() {
  return (
    <section className="page-section final-cta-section">
      <div className="container final-cta-section__container">
        <div className="final-cta-section__inner">
          <h2 className="final-cta-section__heading">Find the right finish for your space.</h2>
          <p className="final-cta-section__text">
            Tell us what you’re planning. We can help with finish selection, samples, and project enquiries.
            Samples are free up to 1 kg per item; delivery is charged separately at the courier’s actual rate.
          </p>
          <div className="final-cta-section__actions">
            <a href={CONTACT_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn final-cta-btn">
              Talk to us on WhatsApp →
            </a>
            <Link href="/finishes#samples" className="final-cta-section__secondary">Request a free sample →</Link>
          </div>
          <p className="final-cta-section__alt">
            Have project details to share? <Link href="/contact" className="final-cta-section__inline-link">Send an enquiry</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
