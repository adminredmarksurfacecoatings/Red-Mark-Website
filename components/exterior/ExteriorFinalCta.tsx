import ContactWhatsAppActions from '@/components/ContactWhatsAppActions'

export default function ExteriorFinalCta() {
  return (
    <section className="exterior-landing-final page-section" aria-labelledby="exterior-final-heading">
      <div className="exterior-landing-final__container container">
        <h2 id="exterior-final-heading" className="exterior-landing-final__heading">
          Need Help Selecting The Right Finish?
        </h2>

        <p className="exterior-landing-final__text">
          Our team can recommend finishes based on project type, climate, and design direction.
        </p>

        <ContactWhatsAppActions
          className="exterior-landing-final__actions contact-whatsapp-actions"
          contactLabel="Contact Us →"
          whatsappLabel="WhatsApp →"
          contactClassName="btn exterior-landing-final__btn"
          whatsappClassName="exterior-landing-final__secondary"
        />
      </div>
    </section>
  )
}
