import { Suspense } from 'react'
import DealerConnectionFormLoader from '@/components/dealers/DealerConnectionFormLoader'
import {
  DEALER_CONNECTION_STEPS,
  DEALER_SERVICE_REGIONS,
} from '@/lib/dealerConnection'

function FormFallback() {
  return (
    <div className="dealer-connection-form dealer-connection-form--loading" aria-hidden>
      <p className="contact-form-hint">Loading form…</p>
    </div>
  )
}

export default function DealerConnectionPanel() {
  return (
    <div className="dealer-connection-section__grid">
      <div className="dealer-connection-section__intro">
        <p className="dealer-connection-section__eyebrow">How it works</p>
        <h2 className="dealer-connection-section__heading">We connect you with the right dealer</h2>
        <p className="dealer-connection-section__text">
          Red Mark finishes are supplied through authorized local partners. Share your location and
          project details — we&apos;ll assign the dealer for your area and they&apos;ll contact you
          directly.
        </p>

        <ol className="dealer-connection-section__steps">
          {DEALER_CONNECTION_STEPS.map((step, index) => (
            <li key={step.title}>
              <span className="dealer-connection-section__step-index">{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="dealer-connection-section__regions">
          <span className="dealer-connection-section__regions-label">Currently serving</span>
          <p>{DEALER_SERVICE_REGIONS.join(' · ')}</p>
        </div>
      </div>

      <div className="dealer-connection-section__form-wrap">
        <Suspense fallback={<FormFallback />}>
          <DealerConnectionFormLoader />
        </Suspense>
      </div>
    </div>
  )
}
