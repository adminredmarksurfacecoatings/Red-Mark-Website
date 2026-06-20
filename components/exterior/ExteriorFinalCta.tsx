import Link from 'next/link'

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

        <div className="exterior-landing-final__actions">
          <Link href="/contact?audience=architect" className="btn exterior-landing-final__btn">
            Request Project Support →
          </Link>
          <Link href="/find-a-dealer" className="exterior-landing-final__secondary">
            Get Connected
          </Link>
        </div>
      </div>
    </section>
  )
}
