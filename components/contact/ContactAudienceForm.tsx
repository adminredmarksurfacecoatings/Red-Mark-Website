'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type FormEvent, type RefObject, type Dispatch, type SetStateAction } from 'react'
import type { CountryCode } from 'libphonenumber-js'
import FormSubmitHiddenFields from '@/components/contact/FormSubmitHiddenFields'
import {
  CONTACT_AUDIENCE_OPTIONS,
  type ContactAudience,
  formSubjectForAudience,
  homeownerNeedsEscalation,
  isContactAudience,
} from '@/lib/contactAudience'
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRY_OPTIONS,
  countryFromIpIso2,
  dialStringForCountry,
} from '@/lib/phoneCountries'

const SURFACE_UNITS = ['sq ft', 'sq m', 'sq yd'] as const
type SurfaceUnit = (typeof SURFACE_UNITS)[number]

const PRODUCT_INTERESTS = [
  'Stone Finish',
  'Pebble Finish',
  'Limewash',
  'Mineral Textures',
  'Decorative Coatings',
  'Not sure yet',
] as const

type ContactAudienceFormProps = {
  initialAudience?: ContactAudience
}

export default function ContactAudienceForm({ initialAudience }: ContactAudienceFormProps) {
  const phoneLocalRef = useRef<HTMLInputElement | null>(null)
  const dialWrapRef = useRef<HTMLDivElement | null>(null)

  const [audience, setAudience] = useState<ContactAudience>(initialAudience ?? 'architect')
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY)
  const [phoneLocal, setPhoneLocal] = useState('')
  const [surfaceValue, setSurfaceValue] = useState('')
  const [surfaceUnit, setSurfaceUnit] = useState<SurfaceUnit>('sq ft')
  const [dialOpen, setDialOpen] = useState(false)

  useEffect(() => {
    if (initialAudience) setAudience(initialAudience)
  }, [initialAudience])

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
      .catch(() => {})
      .finally(() => window.clearTimeout(timeoutId))

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
  const showHomeownerEscalation =
    audience === 'homeowner' && homeownerNeedsEscalation(surfaceValue, surfaceUnit)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!phoneLocal.trim()) {
      e.preventDefault()
      phoneLocalRef.current?.focus()
    }
  }

  return (
    <div className="contact-audience-form">
      <fieldset className="contact-audience-form__selector">
        <legend className="contact-form-label">I am a</legend>
        <div className="contact-audience-form__chips" role="radiogroup" aria-label="Enquiry type">
          {CONTACT_AUDIENCE_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={audience === option.id}
              className={`contact-audience-chip${audience === option.id ? ' is-active' : ''}`}
              onClick={() => setAudience(option.id)}
            >
              <span className="contact-audience-chip__label">{option.label}</span>
            </button>
          ))}
        </div>
        <p className="contact-audience-form__hint">
          {CONTACT_AUDIENCE_OPTIONS.find((option) => option.id === audience)?.description}
        </p>
      </fieldset>

      {audience === 'homeowner' ? (
        <div className="contact-audience-banner contact-audience-banner--dealer">
          <p>
            For most home projects, your nearest authorized dealer can confirm availability, shades,
            and local support faster.
          </p>
          <Link href="/find-a-dealer" className="contact-audience-banner__link">
            Find a Dealer in Ludhiana →
          </Link>
        </div>
      ) : null}

      {showHomeownerEscalation ? (
        <div className="contact-audience-banner contact-audience-banner--escalation">
          <p>
            Based on your project size, our technical team may also assist alongside your local
            dealer for finish selection and coordination.
          </p>
        </div>
      ) : null}

      <form
        key={audience}
        className="contact-form"
        action="https://formsubmit.co/info@redmarksurfacecoatings.com"
        method="POST"
        onSubmit={handleSubmit}
      >
        <FormSubmitHiddenFields subject={formSubjectForAudience(audience)} />
        <input type="hidden" name="userType" value={audience} readOnly />
        <input type="hidden" name="phone" value={phoneSubmitted} readOnly aria-hidden />
        <input type="hidden" name="approximateArea" value={surfaceSubmitted} readOnly aria-hidden />
        {showHomeownerEscalation ? (
          <input type="hidden" name="routingNote" value="Large residential — Red Mark technical support + dealer fulfillment" readOnly />
        ) : null}

        <p className="contact-form-hint">
          Fields marked with <span className="contact-form-required-star">*</span> are required.
        </p>

        <div>
          <label htmlFor="name" className="contact-form-label">
            Name <span className="contact-form-required-star">*</span>
          </label>
          <input type="text" id="name" name="name" required autoComplete="name" placeholder="Your full name" className="contact-form-input" />
        </div>

        <PhoneField
          dialWrapRef={dialWrapRef}
          dialOpen={dialOpen}
          setDialOpen={setDialOpen}
          dialDisplay={dialDisplay}
          phoneCountry={phoneCountry}
          setPhoneCountry={setPhoneCountry}
          phoneLocal={phoneLocal}
          setPhoneLocal={setPhoneLocal}
          phoneLocalRef={phoneLocalRef}
        />

        <div>
          <label htmlFor="email" className="contact-form-label">
            Email
          </label>
          <input type="email" id="email" name="email" autoComplete="email" placeholder="you@company.com" className="contact-form-input" />
        </div>

        {audience === 'architect' ? (
          <>
            <div>
              <label htmlFor="firmName" className="contact-form-label">
                Firm Name <span className="contact-form-required-star">*</span>
              </label>
              <input type="text" id="firmName" name="firmName" required className="contact-form-input" placeholder="Studio or practice name" />
            </div>
            <div>
              <label htmlFor="city" className="contact-form-label">
                City <span className="contact-form-required-star">*</span>
              </label>
              <input type="text" id="city" name="city" required className="contact-form-input" placeholder="City" />
            </div>
            <div>
              <label htmlFor="state" className="contact-form-label">
                State
              </label>
              <input type="text" id="state" name="state" className="contact-form-input" placeholder="State" />
            </div>
            <ProjectTypeField />
            <ProductInterestField />
          </>
        ) : null}

        {audience === 'builder' ? (
          <>
            <div>
              <label htmlFor="companyName" className="contact-form-label">
                Company Name <span className="contact-form-required-star">*</span>
              </label>
              <input type="text" id="companyName" name="companyName" required className="contact-form-input" placeholder="Company name" />
            </div>
            <div>
              <label htmlFor="city" className="contact-form-label">
                City <span className="contact-form-required-star">*</span>
              </label>
              <input type="text" id="city" name="city" required className="contact-form-input" placeholder="City" />
            </div>
            <div>
              <label htmlFor="state" className="contact-form-label">
                State
              </label>
              <input type="text" id="state" name="state" className="contact-form-input" placeholder="State" />
            </div>
            <div>
              <label htmlFor="projectSize" className="contact-form-label">
                Project Size
              </label>
              <input type="text" id="projectSize" name="projectSize" className="contact-form-input" placeholder="e.g. 12-unit residential, 40,000 sq ft commercial" />
            </div>
            <ProjectTypeField />
            <ProductInterestField />
          </>
        ) : null}

        {audience === 'contractor' ? (
          <>
            <div>
              <label htmlFor="companyName" className="contact-form-label">
                Company Name <span className="contact-form-required-star">*</span>
              </label>
              <input type="text" id="companyName" name="companyName" required className="contact-form-input" placeholder="Company name" />
            </div>
            <div>
              <label htmlFor="city" className="contact-form-label">
                City <span className="contact-form-required-star">*</span>
              </label>
              <input type="text" id="city" name="city" required className="contact-form-input" placeholder="City" />
            </div>
            <div>
              <label htmlFor="state" className="contact-form-label">
                State
              </label>
              <input type="text" id="state" name="state" className="contact-form-input" placeholder="State" />
            </div>
            <ProductInterestField />
          </>
        ) : null}

        {audience === 'dealer' ? (
          <>
            <div>
              <label htmlFor="businessName" className="contact-form-label">
                Business Name <span className="contact-form-required-star">*</span>
              </label>
              <input type="text" id="businessName" name="businessName" required className="contact-form-input" placeholder="Business name" />
            </div>
            <div>
              <label htmlFor="location" className="contact-form-label">
                Location <span className="contact-form-required-star">*</span>
              </label>
              <input type="text" id="location" name="location" required className="contact-form-input" placeholder="City, state" />
            </div>
            <div>
              <label htmlFor="existingCategories" className="contact-form-label">
                Existing Product Categories
              </label>
              <input type="text" id="existingCategories" name="existingCategories" className="contact-form-input" placeholder="e.g. paints, textures, waterproofing" />
            </div>
            <div>
              <label htmlFor="monthlyVolume" className="contact-form-label">
                Monthly Volume (approx.)
              </label>
              <input type="text" id="monthlyVolume" name="monthlyVolume" className="contact-form-input" placeholder="Optional estimate" />
            </div>
          </>
        ) : null}

        {audience === 'homeowner' ? (
          <>
            <div>
              <label htmlFor="city" className="contact-form-label">
                City <span className="contact-form-required-star">*</span>
              </label>
              <input type="text" id="city" name="city" required className="contact-form-input" placeholder="City" />
            </div>
            <div>
              <label htmlFor="state" className="contact-form-label">
                State
              </label>
              <input type="text" id="state" name="state" className="contact-form-input" placeholder="State" />
            </div>
            <ProjectTypeField />
            <SurfaceAreaField
              surfaceValue={surfaceValue}
              setSurfaceValue={setSurfaceValue}
              surfaceUnit={surfaceUnit}
              setSurfaceUnit={setSurfaceUnit}
            />
            <ProductInterestField />
          </>
        ) : null}

        {(audience === 'architect' || audience === 'builder' || audience === 'contractor') && (
          <SurfaceAreaField
            surfaceValue={surfaceValue}
            setSurfaceValue={setSurfaceValue}
            surfaceUnit={surfaceUnit}
            setSurfaceUnit={setSurfaceUnit}
            optional
          />
        )}

        <div>
          <label htmlFor="requirement" className="contact-form-label">
            {audience === 'homeowner' ? 'Requirement' : 'Project details'}
          </label>
          <textarea
            id="requirement"
            name="requirement"
            rows={6}
            placeholder="Tell us about your project, finishes of interest, or timeline…"
            className="contact-form-textarea"
          />
        </div>

        <button type="submit" className="contact-form-submit">
          {submitLabelForAudience(audience)}
        </button>

        <p className="contact-form-trust">
          We typically respond within 24 hours. Your details remain confidential.
        </p>
      </form>
    </div>
  )
}

function submitLabelForAudience(audience: ContactAudience): string {
  switch (audience) {
    case 'architect':
      return 'Request Project Support →'
    case 'builder':
      return 'Discuss a Project →'
    case 'contractor':
      return 'Send Enquiry →'
    case 'homeowner':
      return 'Submit Enquiry →'
    case 'dealer':
      return 'Partner With Us →'
  }
}

function ProjectTypeField() {
  return (
    <div>
      <label htmlFor="projectType" className="contact-form-label">
        Project Type
      </label>
      <select id="projectType" name="projectType" className="contact-form-select">
        <option value="">Select project type</option>
        <option value="Residential Interiors">Residential Interiors</option>
        <option value="Residential Exteriors">Residential Exteriors</option>
        <option value="Exterior Facades">Exterior Facades</option>
        <option value="Commercial Spaces">Commercial Spaces</option>
        <option value="Hospitality Projects">Hospitality Projects</option>
        <option value="Not Sure / Need Guidance">Not Sure / Need Guidance</option>
      </select>
    </div>
  )
}

function ProductInterestField() {
  return (
    <div>
      <label htmlFor="productInterest" className="contact-form-label">
        Product Interest
      </label>
      <select id="productInterest" name="productInterest" className="contact-form-select">
        <option value="">Select finish range</option>
        {PRODUCT_INTERESTS.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

function SurfaceAreaField({
  surfaceValue,
  setSurfaceValue,
  surfaceUnit,
  setSurfaceUnit,
  optional = false,
}: {
  surfaceValue: string
  setSurfaceValue: (value: string) => void
  surfaceUnit: SurfaceUnit
  setSurfaceUnit: (value: SurfaceUnit) => void
  optional?: boolean
}) {
  return (
    <div>
      <label htmlFor="surfaceAreaInput" className="contact-form-label">
        Approximate Area {optional ? null : <span className="contact-form-required-star">*</span>}
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
          required={!optional}
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
  )
}

function PhoneField({
  dialWrapRef,
  dialOpen,
  setDialOpen,
  dialDisplay,
  phoneCountry,
  setPhoneCountry,
  phoneLocal,
  setPhoneLocal,
  phoneLocalRef,
}: {
  dialWrapRef: RefObject<HTMLDivElement>
  dialOpen: boolean
  setDialOpen: Dispatch<SetStateAction<boolean>>
  dialDisplay: string
  phoneCountry: CountryCode
  setPhoneCountry: (value: CountryCode) => void
  phoneLocal: string
  setPhoneLocal: (value: string) => void
  phoneLocalRef: RefObject<HTMLInputElement>
}) {
  return (
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
  )
}

export function parseAudienceFromSearchParam(value: string | null): ContactAudience | undefined {
  return isContactAudience(value) ? value : undefined
}
