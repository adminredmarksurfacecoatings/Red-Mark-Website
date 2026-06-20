import type { Metadata } from 'next'
import DealerConnectionPanel from '@/components/dealers/DealerConnectionPanel'
import { BRAND_TAGLINE } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'Find a Dealer',
  description:
    'Request connection with an authorized Red Mark dealer in your area for local product availability, shades, and project support.',
}

export default function FindADealerPage() {
  return (
    <>
      <section className="page-section page-section--first dealer-page-hero">
        <div className="container dealer-page-hero__container">
          <p className="dealer-page-hero__eyebrow">Authorized Network</p>
          <h1 className="dealer-page-hero__heading">Get Connected to a Dealer</h1>
          <p className="dealer-page-hero__lead">{BRAND_TAGLINE}</p>
          <p className="dealer-page-hero__support">
            Tell us where your project is located. Red Mark will connect you with the authorized
            dealer for your area — no public directory, just the right local partner for your
            enquiry.
          </p>
        </div>
      </section>

      <section className="page-section dealer-connection-section">
        <div className="container dealer-connection-section__container">
          <DealerConnectionPanel />
        </div>
      </section>
    </>
  )
}
