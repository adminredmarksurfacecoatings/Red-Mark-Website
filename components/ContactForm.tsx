'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { CountryCode } from 'libphonenumber-js'
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRY_OPTIONS,
  countryFromIpIso2,
  dialStringForCountry,
} from '@/lib/phoneCountries'

const SURFACE_UNITS = ['sq ft', 'sq m', 'sq yd'] as const
type SurfaceUnit = (typeof SURFACE_UNITS)[number]

export default function ContactForm() {
  const phoneLocalRef = useRef<HTMLInputElement | null>(null)
  const dialWrapRef = useRef<HTMLDivElement | null>(null)

  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY)
  const [phoneLocal, setPhoneLocal] = useState('')
  const [surfaceValue, setSurfaceValue] = useState('')
  const [surfaceUnit, setSurfaceUnit] = useState<SurfaceUnit>('sq ft')
  const [dialOpen, setDialOpen] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!phoneLocal.trim()) {
      e.preventDefault()
      phoneLocalRef.current?.focus()
    }
  }

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 4500)

    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('ip lookup failed'))))
      .then((data: { country_code?: string }) => {
        if (cancelled) return
        setPhoneCountry(countryFromIpIso2(data?.country_code))
      })
      .catch(() => {
        /* keep default +91 — non-blocking */
      })
      .finally(() => {
        window.clearTimeout(timeoutId)
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  useEffect(() => {
    if (!dialOpen) return
    function handlePointer(e: MouseEvent) {
      if (dialWrapRef.current && !dialWrapRef.current.contains(e.target as Node)) {
        setDialOpen(false)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setDialOpen(false)
    }
    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [dialOpen])

  const phoneSubmitted = useMemo(() => {
    const local = phoneLocal.trim()
    if (!local) return ''
    return `${dialStringForCountry(phoneCountry)} ${local}`.trim()
  }, [phoneCountry, phoneLocal])

  const surfaceSubmitted = useMemo(() => {
    const v = surfaceValue.trim()
    if (!v) return ''
    return `${v} ${surfaceUnit}`
  }, [surfaceValue, surfaceUnit])

  const dialDisplay = dialStringForCountry(phoneCountry)

  return (
    <form
      className="contact-form"
      action="https://formsubmit.co/info@redmarksurfacecoatings.com"
      method="POST"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="phone" value={phoneSubmitted} readOnly aria-hidden />
      <input type="hidden" name="surfaceArea" value={surfaceSubmitted} readOnly aria-hidden />

      {/* Honeypot field for spam protection */}
      <input
        type="text"
        name="_honey"
        style={{
          display: 'none',
        }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Redirect URL */}
      <input
        type="hidden"
        name="_next"
        value={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/thank-you`}
      />

      {/* Disable captcha */}
      <input type="hidden" name="_captcha" value="false" />

      {/* Email subject */}
      <input type="hidden" name="_subject" value="New inquiry from Red Mark website" />

      {/* Email template */}
      <input type="hidden" name="_template" value="table" />

      {/* Auto-response message */}
      <input
        type="hidden"
        name="_autoresponse"
        value="Thank you for contacting Red Mark Surface Coatings. Our team will review your inquiry and respond shortly."
      />

      <p className="contact-form-hint">
        Fields marked with <span className="contact-form-required-star">*</span> are required.
      </p>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="contact-form-label">
          Name <span className="contact-form-required-star">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Your full name"
          className="contact-form-input"
        />
      </div>

      {/* Phone: country code + local number */}
      <div>
        <label htmlFor="phoneLocal" className="contact-form-label">
          Phone <span className="contact-form-required-star">*</span>
        </label>
        <div className="contact-form-composite contact-form-phone-composite">
          <div className="contact-form-dial-wrap" ref={dialWrapRef}>
            <button
              type="button"
              id="phoneDial"
              className="contact-form-dial-trigger"
              aria-label="Country code"
              aria-expanded={dialOpen}
              aria-haspopup="listbox"
              aria-controls="phone-dial-listbox"
              onClick={() => setDialOpen((o) => !o)}
            >
              <span className="contact-form-dial-value">{dialDisplay}</span>
              <span className="contact-form-chevron" aria-hidden />
            </button>
            {dialOpen ? (
              <ul id="phone-dial-listbox" className="contact-form-dial-panel" role="listbox">
                {PHONE_COUNTRY_OPTIONS.map(({ iso, dial, name }) => (
                  <li key={iso} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={phoneCountry === iso}
                      className={
                        phoneCountry === iso
                          ? 'contact-form-dial-option is-selected'
                          : 'contact-form-dial-option'
                      }
                      onClick={() => {
                        setPhoneCountry(iso)
                        setDialOpen(false)
                      }}
                    >
                      <span className="contact-form-dial-option-code">{dial}</span>
                      <span className="contact-form-dial-option-country">{name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="contact-form-phone-divider" aria-hidden="true" />
          <input
            ref={phoneLocalRef}
            type="tel"
            id="phoneLocal"
            autoComplete="tel-national"
            inputMode="tel"
            value={phoneLocal}
            onChange={(e) => setPhoneLocal(e.target.value)}
            placeholder="Phone number"
            aria-required="true"
            className="contact-form-phone-local"
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="contact-form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          className="contact-form-input"
        />
      </div>

      {/* Project Type Field */}
      <div>
        <label htmlFor="projectType" className="contact-form-label">
          Project Type
        </label>
        <select id="projectType" name="projectType" className="contact-form-select">
          <option value="">Select project type</option>
          <option value="Residential Interiors">Residential Interiors</option>
          <option value="Exterior Facades">Exterior Facades</option>
          <option value="Commercial Spaces">Commercial Spaces</option>
          <option value="Hospitality Projects">Hospitality Projects</option>
          <option value="Not Sure / Need Guidance">Not Sure / Need Guidance</option>
        </select>
      </div>

      {/* Project Location Field */}
      <div>
        <label htmlFor="projectLocation" className="contact-form-label">
          Project Location
        </label>
        <input
          type="text"
          id="projectLocation"
          name="projectLocation"
          autoComplete="address-level2"
          placeholder="City, Region, Country"
          className="contact-form-input"
        />
      </div>

      {/* Surface Area + inline unit */}
      <div>
        <label htmlFor="surfaceAreaInput" className="contact-form-label">
          Surface Area (Approx.)
        </label>
        <div className="contact-form-composite contact-form-surface-split">
          <input
            type="text"
            id="surfaceAreaInput"
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
            {SURFACE_UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="contact-form-label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell us about your project…"
          className="contact-form-textarea"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="contact-form-submit">
        Start Your Project &rarr;
      </button>

      <p className="contact-form-trust">
        We typically respond within 24 hours. Your details remain confidential.
      </p>
    </form>
  )
}
