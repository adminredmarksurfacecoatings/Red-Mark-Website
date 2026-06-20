'use client'

import Link from 'next/link'

export default function FinalCtaSection() {
  return (
    <section className="page-section final-cta-section">
      <div className="container final-cta-section__container">
        <div className="final-cta-section__inner">
          <h2 className="final-cta-section__heading">Ready to Specify or Source a Finish?</h2>
          <p className="final-cta-section__text">
            Professionals can request samples and project support directly. Homeowners can get
            connected with an authorized dealer for local availability.
          </p>
          <div className="final-cta-section__actions">
            <Link href="/contact?audience=architect" className="btn final-cta-btn">
              Request Project Support
            </Link>
            <Link href="/find-a-dealer" className="final-cta-section__secondary">
              Get Connected →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
