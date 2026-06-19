import type { Metadata } from 'next'
import DealerLocator from '@/components/dealers/DealerLocator'
import { BRAND_TAGLINE } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'Find a Dealer',
  description:
    'Locate authorized Red Mark Surface Coatings dealers in Ludhiana for local product availability and support.',
}

export default function FindADealerPage() {
  return (
    <>
      <section className="page-section page-section--first dealer-page-hero">
        <div className="container dealer-page-hero__container">
          <p className="dealer-page-hero__eyebrow">Authorized Network</p>
          <h1 className="dealer-page-hero__heading">Find a Dealer</h1>
          <p className="dealer-page-hero__lead">{BRAND_TAGLINE}</p>
          <p className="dealer-page-hero__support">
            For homeowners and contractors, your local authorized dealer is the fastest way to confirm
            shades, availability, and project support.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <DealerLocator />
        </div>
      </section>
    </>
  )
}
