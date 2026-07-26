import type { Metadata } from 'next'
import { Suspense } from 'react'
import RequestSampleFormLoader from '@/components/request-sample/RequestSampleFormLoader'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Request a Pebble Finish Sample',
  description:
    'Request a physical sample of Red Mark Pebble Finish shades. Select your shade code, preview the swatch, and submit for delivery through our dealer network.',
  path: '/finishes/exterior/pebble-finish/request-sample',
  image: '/home_hero_2.png',
  imageAlt: 'Request a Red Mark Pebble Finish sample',
})

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
