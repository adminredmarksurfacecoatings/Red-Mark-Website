'use client'

import { useEffect, useState } from 'react'

type FormSubmitHiddenFieldsProps = {
  subject: string
  autoresponse?: string
}

export default function FormSubmitHiddenFields({
  subject,
  autoresponse = 'Thank you for contacting Red Mark Surface Coatings. Our team will review your enquiry and respond shortly.',
}: FormSubmitHiddenFieldsProps) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  const [siteUrl, setSiteUrl] = useState(configuredUrl || 'https://www.redmarksurfacecoatings.com')

  useEffect(() => {
    if (!configuredUrl) setSiteUrl(window.location.origin)
  }, [configuredUrl])

  return (
    <>
      <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_next" value={`${siteUrl}/thank-you`} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_autoresponse" value={autoresponse} />
    </>
  )
}
