'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ContactAudienceForm, { parseAudienceFromSearchParam } from '@/components/contact/ContactAudienceForm'

function ContactFormInner() {
  const searchParams = useSearchParams()
  const audience = parseAudienceFromSearchParam(searchParams.get('audience'))

  return <ContactAudienceForm initialAudience={audience} />
}

export default function ContactFormSection() {
  return (
    <Suspense fallback={<ContactAudienceForm />}>
      <ContactFormInner />
    </Suspense>
  )
}
