'use client'

import { useMemo, useRef, useState, useEffect, type FormEvent } from 'react'
import type { CountryCode } from 'libphonenumber-js'
import FormSubmitHiddenFields from '@/components/contact/FormSubmitHiddenFields'
import {
  DEFAULT_PHONE_COUNTRY,
  countryFromIpIso2,
  dialStringForCountry,
} from '@/lib/phoneCountries'

export default function BecomeDealerForm() {
  const phoneLocalRef = useRef<HTMLInputElement | null>(null)
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY)
  const [phoneLocal, setPhoneLocal] = useState('')
  const [dialOpen, setDialOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { country_code?: string }) => {
        if (!cancelled) setPhoneCountry(countryFromIpIso2(data?.country_code))
      })
      .catch(() => {})
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  const phoneSubmitted = useMemo(() => {
    const local = phoneLocal.trim()
    if (!local) return ''
    return `${dialStringForCountry(phoneCountry)} ${local}`.trim()
  }, [phoneCountry, phoneLocal])

  const dialDisplay = dialStringForCountry(phoneCountry)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!phoneLocal.trim()) {
      e.preventDefault()
      phoneLocalRef.current?.focus()
    }
  }

  return (
    <form
      className="contact-form"
      action="https://formsubmit.co/info@redmarksurfacecoatings.com"
      method="POST"
      onSubmit={handleSubmit}
    >
      <FormSubmitHiddenFields subject="[Dealer Application] Red Mark website enquiry" />
      <input type="hidden" name="userType" value="dealer-application" readOnly />
      <input type="hidden" name="phone" value={phoneSubmitted} readOnly aria-hidden />

      <div>
        <label htmlFor="dealer-name" className="contact-form-label">
          Contact Name <span className="contact-form-required-star">*</span>
        </label>
        <input type="text" id="dealer-name" name="name" required className="contact-form-input" />
      </div>

      <div>
        <label htmlFor="dealer-business" className="contact-form-label">
          Business Name <span className="contact-form-required-star">*</span>
        </label>
        <input type="text" id="dealer-business" name="businessName" required className="contact-form-input" />
      </div>

      <div>
        <label htmlFor="dealer-location" className="contact-form-label">
          Location <span className="contact-form-required-star">*</span>
        </label>
        <input type="text" id="dealer-location" name="location" required className="contact-form-input" placeholder="City, state" />
      </div>

      <div>
        <label htmlFor="dealer-phone" className="contact-form-label">
          Phone <span className="contact-form-required-star">*</span>
        </label>
        <input
          ref={phoneLocalRef}
          type="tel"
          id="dealer-phone"
          value={phoneLocal}
          onChange={(e) => setPhoneLocal(e.target.value)}
          className="contact-form-input"
          placeholder={`${dialDisplay} …`}
        />
      </div>

      <div>
        <label htmlFor="dealer-categories" className="contact-form-label">
          Existing Product Categories
        </label>
        <input type="text" id="dealer-categories" name="existingCategories" className="contact-form-input" />
      </div>

      <div>
        <label htmlFor="dealer-volume" className="contact-form-label">
          Monthly Volume (approx.)
        </label>
        <input type="text" id="dealer-volume" name="monthlyVolume" className="contact-form-input" />
      </div>

      <div>
        <label htmlFor="dealer-message" className="contact-form-label">
          Tell us about your business
        </label>
        <textarea id="dealer-message" name="message" rows={5} className="contact-form-textarea" />
      </div>

      <button type="submit" className="contact-form-submit">
        Submit Partnership Enquiry →
      </button>
    </form>
  )
}
