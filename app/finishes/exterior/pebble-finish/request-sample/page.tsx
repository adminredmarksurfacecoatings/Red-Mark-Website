import type { Metadata } from 'next'
import { Suspense } from 'react'
import RequestSampleFormLoader from '@/components/request-sample/RequestSampleFormLoader'

export const metadata: Metadata = {
  title: 'Request Sample — Pebble Finish',
  description:
    'Request a physical sample of Red Mark Pebble Finish shades. Select your shade and preview the swatch before submitting.',
}

function RequestSampleFallback() {
  return (
    <div className="request-sample request-sample--loading" aria-hidden>
      <div className="request-sample__header">
        <p className="request-sample__eyebrow">Exterior Collection</p>
        <h1 className="request-sample__heading">Request a Sample</h1>
      </div>
    </div>
  )
}

export default function PebbleFinishRequestSamplePage() {
  return (
    <section className="request-sample-page page-section page-section--first">
      <div className="request-sample-page__container container">
        <Suspense fallback={<RequestSampleFallback />}>
          <RequestSampleFormLoader collectionSlug="pebble-finish" />
        </Suspense>
      </div>
    </section>
  )
}
