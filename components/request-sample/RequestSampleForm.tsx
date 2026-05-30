'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { CountryCode } from 'libphonenumber-js'
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRY_OPTIONS,
  countryFromIpIso2,
  dialStringForCountry,
} from '@/lib/phoneCountries'
import { matchFinishShade, type FinishRequestSampleConfig, type FinishShade } from '@/lib/finishCollection/types'

type RequestSampleFormProps = {
  config: FinishRequestSampleConfig
  initialShadeCode?: string
}

export default function RequestSampleForm({ config, initialShadeCode }: RequestSampleFormProps) {
  const matchShade = (query: string) =>
    matchFinishShade(config.shades, query, config.shadeCodePattern)

  const phoneLocalRef = useRef<HTMLInputElement | null>(null)
  const dialWrapRef = useRef<HTMLDivElement | null>(null)

  const [shadeQuery, setShadeQuery] = useState(initialShadeCode ?? '')
  const [selectedShade, setSelectedShade] = useState<FinishShade | undefined>(() =>
    initialShadeCode ? matchShade(initialShadeCode) : undefined
  )
  const [previewSrc, setPreviewSrc] = useState(selectedShade?.image ?? '')
  const [shadeError, setShadeError] = useState('')

  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY)
  const [phoneLocal, setPhoneLocal] = useState('')
  const [dialOpen, setDialOpen] = useState(false)

  useEffect(() => {
    if (!initialShadeCode) return
    const shade = matchShade(initialShadeCode)
    if (!shade) return
    setSelectedShade(shade)
    setShadeQuery(`${shade.code} — ${shade.name}`)
    setPreviewSrc(shade.image)
  }, [initialShadeCode, config])

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
        /* keep default */
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

  const dialDisplay = dialStringForCountry(phoneCountry)

  function applyShadeSelection(value: string) {
    setShadeQuery(value)
    const shade = matchShade(value)
    if (shade) {
      setSelectedShade(shade)
      setPreviewSrc(shade.image)
      setShadeError('')
      return
    }

    setSelectedShade(undefined)
    setPreviewSrc('')
  }

  function handleShadeSelectChange(value: string) {
    if (!value) {
      setShadeQuery('')
      setSelectedShade(undefined)
      setPreviewSrc('')
      setShadeError('')
      return
    }

    const shade = config.shades.find((item) => item.code === value)
    if (!shade) return
    setShadeQuery(`${shade.code} — ${shade.name}`)
    setSelectedShade(shade)
    setPreviewSrc(shade.image)
    setShadeError('')
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!selectedShade) {
      e.preventDefault()
      setShadeError('Please select or enter a valid shade code.')
      return
    }

    if (!phoneLocal.trim()) {
      e.preventDefault()
      phoneLocalRef.current?.focus()
    }
  }

  return (
    <div className="request-sample">
      <nav className="stone-finish-breadcrumbs request-sample__breadcrumbs" aria-label="Breadcrumb">
        <ol className="stone-finish-breadcrumbs__list">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href="/finishes">Finishes</Link>
          </li>
          {config.collectionHubHref && config.collectionHubLabel ? (
            <>
              <li aria-hidden="true">›</li>
              <li>
                <Link href={config.collectionHubHref}>{config.collectionHubLabel}</Link>
              </li>
            </>
          ) : null}
          <li aria-hidden="true">›</li>
          <li>
            <Link href={config.backHref}>{config.breadcrumbLabel}</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page">Request Sample</li>
        </ol>
      </nav>

      <header className="request-sample__header">
        <p className="request-sample__eyebrow">{config.eyebrow}</p>
        <h1 className="request-sample__heading">Request a Sample</h1>
        <p className="request-sample__intro">
          Enter a shade code or select from the {config.title} range. Your chosen swatch preview
          appears alongside the form.
        </p>
      </header>

      <div className="request-sample__layout">
        <form
          className="contact-form request-sample__form"
          action="https://formsubmit.co/info@redmarksurfacecoatings.com"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="phone" value={phoneSubmitted} readOnly aria-hidden />
          <input type="hidden" name="collection" value={config.title} readOnly />
          <input
            type="hidden"
            name="shadeCode"
            value={selectedShade?.code ?? ''}
            readOnly
            aria-hidden
          />
          <input
            type="hidden"
            name="shadeName"
            value={selectedShade?.name ?? ''}
            readOnly
            aria-hidden
          />

          <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
          <input
            type="hidden"
            name="_next"
            value={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/thank-you`}
          />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_subject"
            value={config.formSubject}
          />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_autoresponse"
            value="Thank you for your sample request. Our team will confirm availability and delivery details shortly."
          />

          <p className="contact-form-hint">
            Fields marked with <span className="contact-form-required-star">*</span> are required.
          </p>

          <div>
            <label htmlFor="shadeQuery" className="contact-form-label">
              Shade <span className="contact-form-required-star">*</span>
            </label>
            <input
              type="text"
              id="shadeQuery"
              name="shade"
              list="request-sample-shades"
              value={shadeQuery}
              onChange={(e) => applyShadeSelection(e.target.value)}
              onBlur={() => {
                if (shadeQuery.trim() && !selectedShade) {
                  setShadeError(`Please choose a shade from the list (e.g. ${config.shades[0]?.code ?? 'ST-001'}).`)
                }
              }}
              placeholder={`Enter shade code, e.g. ${config.shades[0]?.code ?? 'ST-001'}`}
              className="contact-form-input"
              autoComplete="off"
              required
            />
            <datalist id="request-sample-shades">
              {config.shades.map((shade) => (
                <option key={shade.code} value={`${shade.code} — ${shade.name}`} />
              ))}
            </datalist>
            {shadeError ? <p className="request-sample__shade-error">{shadeError}</p> : null}
          </div>

          <div>
            <label htmlFor="shadeSelect" className="contact-form-label">
              Or select from catalogue
            </label>
            <select
              id="shadeSelect"
              className="contact-form-select"
              value={selectedShade?.code ?? ''}
              onChange={(e) => handleShadeSelectChange(e.target.value)}
            >
              <option value="">Choose a shade</option>
              {config.shades.map((shade) => (
                <option key={shade.code} value={shade.code}>
                  {shade.code} — {shade.name}
                </option>
              ))}
            </select>
          </div>

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
                  onClick={() => setDialOpen((open) => !open)}
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

          <div>
            <label htmlFor="message" className="contact-form-label">
              Notes
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Quantity, timeline, or application details…"
              className="contact-form-textarea"
            />
          </div>

          <button type="submit" className="contact-form-submit">
            Submit Sample Request →
          </button>

          <p className="contact-form-trust">
            We typically respond within 24 hours. Your details remain confidential.
          </p>
        </form>

        <aside className="request-sample__preview" aria-live="polite">
          <div className="request-sample__preview-card">
            {selectedShade ? (
              <>
                <div className="request-sample__preview-swatch">
                  <Image
                    src={previewSrc}
                    alt={`${selectedShade.name} swatch`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    quality={75}
                    className="request-sample__preview-image"
                    onError={() => {
                      if (!selectedShade) return
                      const jpgPath = previewSrc.replace(/\.webp$/i, '.jpg')
                      if (previewSrc !== jpgPath && previewSrc === selectedShade.image) {
                        setPreviewSrc(jpgPath)
                        return
                      }
                      if (previewSrc !== selectedShade.fallbackImage) {
                        setPreviewSrc(selectedShade.fallbackImage)
                      }
                    }}
                  />
                </div>
                <p className="request-sample__preview-code">{selectedShade.code}</p>
                <h2 className="request-sample__preview-name">{selectedShade.name}</h2>
                <p className="request-sample__preview-collection">{config.title} Collection</p>
              </>
            ) : (
              <div className="request-sample__preview-empty">
                <p className="request-sample__preview-empty-title">Shade preview</p>
                <p className="request-sample__preview-empty-text">
                  Enter a shade code such as <strong>{config.shades[0]?.code ?? 'ST-001'}</strong> or choose from the catalogue
                  to view the swatch.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
