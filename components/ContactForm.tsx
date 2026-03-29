'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'

const DEFAULT_DIAL = '+91'

const DIAL_OPTIONS: { value: string; label: string }[] = [
  { value: '+91', label: '+91' },
  { value: '+1', label: '+1' },
  { value: '+44', label: '+44' },
  { value: '+971', label: '+971' },
]

function dialFromCountryCode(iso2: string | undefined | null): string {
  if (!iso2) return DEFAULT_DIAL
  const u = iso2.toUpperCase()
  if (u === 'IN') return '+91'
  if (u === 'US' || u === 'CA') return '+1'
  if (u === 'GB') return '+44'
  if (u === 'AE') return '+971'
  return DEFAULT_DIAL
}

const SURFACE_UNITS = ['sq ft', 'sq m', 'sq yd'] as const
type SurfaceUnit = (typeof SURFACE_UNITS)[number]

const inputBaseStyle: CSSProperties = {
  fontSize: '1rem',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 300,
  color: '#2B2B2B',
  backgroundColor: 'transparent',
  outline: 'none',
}

const inputFieldStyle: CSSProperties = {
  width: '100%',
  minHeight: 52,
  padding: '0.95rem 1.05rem',
  ...inputBaseStyle,
  border: '1px solid rgba(106, 30, 30, 0.2)',
  borderRadius: '2px',
  transition: 'border-color 0.22s ease, box-shadow 0.22s ease',
}

export default function ContactForm() {
  const phoneLocalRef = useRef<HTMLInputElement | null>(null)
  const [dialCode, setDialCode] = useState(DEFAULT_DIAL)
  const [phoneLocal, setPhoneLocal] = useState('')
  const [surfaceValue, setSurfaceValue] = useState('')
  const [surfaceUnit, setSurfaceUnit] = useState<SurfaceUnit>('sq ft')

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
        const next = dialFromCountryCode(data?.country_code)
        setDialCode(next)
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

  const phoneSubmitted = useMemo(() => {
    const local = phoneLocal.trim()
    if (!local) return ''
    return `${dialCode} ${local}`.trim()
  }, [dialCode, phoneLocal])

  const surfaceSubmitted = useMemo(() => {
    const v = surfaceValue.trim()
    if (!v) return ''
    return `${v} ${surfaceUnit}`
  }, [surfaceValue, surfaceUnit])

  return (
    <form
      action="https://formsubmit.co/info@redmarksurfacecoatings.com"
      method="POST"
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
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

      {/* Name Field */}
      <p
        style={{
          fontSize: '0.8125rem',
          fontFamily: "'Inter', sans-serif",
          color: '#6A6A6A',
          letterSpacing: '0.01em',
        }}
      >
        Fields marked with <span style={{ color: '#6A1E1E' }}>*</span> are required.
      </p>

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: '#2B2B2B',
            marginBottom: '0.5rem',
          }}
        >
          Name <span style={{ color: '#6A1E1E' }}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Your full name"
          style={inputFieldStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--oxide-red)'
            e.currentTarget.style.boxShadow = '0 0 0 1px rgba(106, 30, 30, 0.06)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.2)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Phone: country code + local number */}
      <div>
        <label
          htmlFor="phoneLocal"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: '#2B2B2B',
            marginBottom: '0.5rem',
          }}
        >
          Phone <span style={{ color: '#6A1E1E' }}>*</span>
        </label>
        <div
          className="contact-form-composite"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            overflow: 'hidden',
          }}
        >
          <select
            id="phoneDial"
            className="contact-form-dial-select"
            aria-label="Country code"
            value={dialCode}
            onChange={(e) => setDialCode(e.target.value)}
          >
            {DIAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
            style={{
              flex: 1,
              minWidth: 0,
              padding: '0.95rem 1.05rem',
              ...inputBaseStyle,
              border: 'none',
              borderRadius: 0,
            }}
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: '#2B2B2B',
            marginBottom: '0.5rem',
          }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          style={inputFieldStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--oxide-red)'
            e.currentTarget.style.boxShadow = '0 0 0 1px rgba(106, 30, 30, 0.06)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.2)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Project Type Field */}
      <div>
        <label
          htmlFor="projectType"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: '#2B2B2B',
            marginBottom: '0.5rem',
          }}
        >
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
        <label
          htmlFor="projectLocation"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: '#2B2B2B',
            marginBottom: '0.5rem',
          }}
        >
          Project Location
        </label>
        <input
          type="text"
          id="projectLocation"
          name="projectLocation"
          autoComplete="address-level2"
          placeholder="City, Region, Country"
          style={inputFieldStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--oxide-red)'
            e.currentTarget.style.boxShadow = '0 0 0 1px rgba(106, 30, 30, 0.06)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.2)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Surface Area + inline unit */}
      <div>
        <label
          htmlFor="surfaceAreaInput"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: '#2B2B2B',
            marginBottom: '0.5rem',
          }}
        >
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
        <label
          htmlFor="message"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: '#2B2B2B',
            marginBottom: '0.5rem',
          }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell us about your project…"
          style={{
            width: '100%',
            padding: '0.95rem 1.05rem',
            ...inputBaseStyle,
            border: '1px solid rgba(106, 30, 30, 0.2)',
            borderRadius: '2px',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 0.22s ease, box-shadow 0.22s ease',
            minHeight: '120px',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--oxide-red)'
            e.currentTarget.style.boxShadow = '0 0 0 1px rgba(106, 30, 30, 0.06)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.2)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        style={{
          padding: '0.875rem 2rem',
          fontSize: '0.9375rem',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          color: '#2B2B2B',
          backgroundColor: 'transparent',
          border: '1px solid rgba(106, 30, 30, 0.3)',
          borderRadius: '2px',
          cursor: 'pointer',
          transition: 'border-color 0.2s ease, color 0.2s ease',
          alignSelf: 'flex-start',
          marginTop: '0.5rem',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--oxide-red)'
          e.currentTarget.style.color = 'var(--oxide-red)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.3)'
          e.currentTarget.style.color = '#2B2B2B'
        }}
      >
        Start Your Project &rarr;
      </button>

      {/* Trust Text */}
      <p
        style={{
          fontSize: '0.8125rem',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          color: '#6A6A6A',
          marginTop: '0.5rem',
          lineHeight: 1.6,
        }}
      >
        We typically respond within 24 hours. Your details remain confidential.
      </p>
    </form>
  )
}
