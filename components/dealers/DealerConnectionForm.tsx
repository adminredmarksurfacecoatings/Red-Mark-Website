'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import type { CountryCode } from 'libphonenumber-js'
import FormSubmitHiddenFields from '@/components/contact/FormSubmitHiddenFields'
import { homeownerNeedsEscalation } from '@/lib/contactAudience'
import {
  DEALER_CONNECTION_AUTORESPONSE,
  DEALER_CONNECTION_FORM_SUBJECT,
  DEALER_FINISH_INTERESTS,
  DEALER_PROJECT_TYPES,
} from '@/lib/dealerConnection'
import {
  DEFAULT_PHONE_COUNTRY,
  countryFromIpIso2,
  dialStringForCountry,
} from '@/lib/phoneCountries'

const SURFACE_UNITS = ['sq ft', 'sq m', 'sq yd'] as const
type SurfaceUnit = (typeof SURFACE_UNITS)[number]

type DealerConnectionFormProps = {
  initialCity?: string
  initialFinish?: string
}

export default function DealerConnectionForm({
  initialCity = '',
  initialFinish = '',
}: DealerConnectionFormProps) {
  const phoneLocalRef = useRef<HTMLInputElement | null>(null)
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY)
  const [phoneLocal, setPhoneLocal] = useState('')
  const [surfaceValue, setSurfaceValue] = useState('')
  const [surfaceUnit, setSurfaceUnit] = useState<SurfaceUnit>('sq ft')

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

  const surfaceSubmitted = useMemo(() => {
    const value = surfaceValue.trim()
    if (!value) return ''
    return `${value} ${surfaceUnit}`
  }, [surfaceValue, surfaceUnit])

  const showEscalation = homeownerNeedsEscalation(surfaceValue, surfaceUnit)
  const dialDisplay = dialStringForCountry(phoneCountry)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!phoneLocal.trim()) {
      e.preventDefault()
      phoneLocalRef.current?.focus()
    }
  }

  return (
    <form
      className="contact-form dealer-connection-form"
      action="https://formsubmit.co/info@redmarksurfacecoatings.com"
      method="POST"
      onSubmit={handleSubmit}
    >
      <FormSubmitHiddenFields
        subject={DEALER_CONNECTION_FORM_SUBJECT}
        autoresponse={DEALER_CONNECTION_AUTORESPONSE}
      />
      <input type="hidden" name="userType" value="dealer-connection" readOnly />
      <input type="hidden" name="phone" value={phoneSubmitted} readOnly aria-hidden />
      <input type="hidden" name="approximateArea" value={surfaceSubmitted} readOnly aria-hidden />
      {showEscalation ? (
        <input
          type="hidden"
          name="routingNote"
          value="Large project — Red Mark technical support + assigned dealer"
          readOnly
        />
      ) : null}

      <p className="contact-form-hint">
        Fields marked with <span className="contact-form-required-star">*</span> are required.
      </p>

      <div>
        <label htmlFor="dealer-connection-name" className="contact-form-label">
          Name <span className="contact-form-required-star">*</span>
        </label>
        <input
          type="text"
          id="dealer-connection-name"
          name="name"
          required
          autoComplete="name"
          className="contact-form-input"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="dealer-connection-phone" className="contact-form-label">
          Phone <span className="contact-form-required-star">*</span>
        </label>
        <input
          ref={phoneLocalRef}
          type="tel"
          id="dealer-connection-phone"
          value={phoneLocal}
          onChange={(e) => setPhoneLocal(e.target.value)}
          className="contact-form-input"
          placeholder={`${dialDisplay} …`}
          autoComplete="tel-national"
        />
      </div>

      <div>
        <label htmlFor="dealer-connection-email" className="contact-form-label">
          Email
        </label>
        <input
          type="email"
          id="dealer-connection-email"
          name="email"
          autoComplete="email"
          className="contact-form-input"
          placeholder="you@email.com"
        />
      </div>

      <div className="dealer-connection-form__row">
        <div>
          <label htmlFor="dealer-connection-city" className="contact-form-label">
            City <span className="contact-form-required-star">*</span>
          </label>
          <input
            type="text"
            id="dealer-connection-city"
            name="city"
            required
            defaultValue={initialCity}
            className="contact-form-input"
            placeholder="City"
          />
        </div>
        <div>
          <label htmlFor="dealer-connection-state" className="contact-form-label">
            State
          </label>
          <input
            type="text"
            id="dealer-connection-state"
            name="state"
            className="contact-form-input"
            placeholder="State"
          />
        </div>
      </div>

      <div>
        <label htmlFor="dealer-connection-pincode" className="contact-form-label">
          Pincode
        </label>
        <input
          type="text"
          id="dealer-connection-pincode"
          name="pincode"
          inputMode="numeric"
          className="contact-form-input"
          placeholder="Helps us route you faster"
        />
      </div>

      <div>
        <label htmlFor="dealer-connection-project-type" className="contact-form-label">
          Project Type
        </label>
        <select id="dealer-connection-project-type" name="projectType" className="contact-form-select">
          <option value="">Select project type</option>
          {DEALER_PROJECT_TYPES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="dealer-connection-finish" className="contact-form-label">
          Finish Interest
        </label>
        <select
          id="dealer-connection-finish"
          name="productInterest"
          className="contact-form-select"
          defaultValue={initialFinish}
        >
          <option value="">Select finish range</option>
          {DEALER_FINISH_INTERESTS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="dealer-connection-area" className="contact-form-label">
          Approximate Area
        </label>
        <div className="contact-form-composite contact-form-surface-split">
          <input
            type="text"
            id="dealer-connection-area"
            className="contact-form-surface-input"
            inputMode="decimal"
            value={surfaceValue}
            onChange={(e) => setSurfaceValue(e.target.value)}
            placeholder="e.g. 500"
          />
          <div className="contact-form-surface-divider" aria-hidden="true" />
          <select
            className="contact-form-unit-select"
            aria-label="Surface area unit"
            value={surfaceUnit}
            onChange={(e) => setSurfaceUnit(e.target.value as SurfaceUnit)}
          >
            {SURFACE_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showEscalation ? (
        <div className="contact-audience-banner contact-audience-banner--escalation">
          <p>
            For larger projects, our technical team may also assist alongside your assigned dealer
            for finish selection and coordination.
          </p>
        </div>
      ) : null}

      <div>
        <label htmlFor="dealer-connection-message" className="contact-form-label">
          Additional Details
        </label>
        <textarea
          id="dealer-connection-message"
          name="requirement"
          rows={5}
          className="contact-form-textarea"
          placeholder="Shades, timeline, site address, or anything else that helps us connect you…"
        />
      </div>

      <button type="submit" className="contact-form-submit">
        Request Dealer Connection →
      </button>

      <p className="contact-form-trust">
        We typically respond within 24 hours. Your details are shared only with the authorized
        dealer assigned to your enquiry.
      </p>
    </form>
  )
}
