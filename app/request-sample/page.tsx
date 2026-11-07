import { Suspense } from 'react'
import RequestSampleFormLoader from '@/components/request-sample/RequestSampleFormLoader'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Request a Free Texture Sample',
  description: 'Choose a Red Mark shade card and shade, preview your texture, and arrange your free sample on WhatsApp. Samples up to 1 kg per item; courier charges apply.',
  path: '/request-sample',
})

export default function RequestSamplePage() {
  return (
    <section className="request-sample-page page-section page-section--first">
      <div className="request-sample-page__container container">
        <Suspense fallback={<h1 className="request-sample__heading">Request a Sample</h1>}>
          <RequestSampleFormLoader />
        </Suspense>
      </div>
    </section>
  )
}
