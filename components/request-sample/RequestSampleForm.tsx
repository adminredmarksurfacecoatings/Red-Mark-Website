'use client'

import Image from 'next/image'
import Link from 'next/link'
import { openWhatsAppEnquiry } from '@/components/contact/openWhatsAppEnquiry'
import { SITE_URL } from '@/lib/seo'
import { useState, useEffect, type ReactNode } from 'react'
import { matchFinishShade, type FinishRequestSampleConfig } from '@/lib/finishCollection/types'

type RequestSampleFormProps = {
  config: FinishRequestSampleConfig
  initialShadeCode?: string
  collectionSelect?: ReactNode
}

export default function RequestSampleForm({ config, initialShadeCode, collectionSelect }: RequestSampleFormProps) {
  const matchShade = (query: string) =>
    matchFinishShade(config.shades, query, config.shadeCodePattern)

  const [shadeCode, setShadeCode] = useState(initialShadeCode ?? '')
  const selectedShade = shadeCode ? matchShade(shadeCode) : undefined
  const [previewSrc, setPreviewSrc] = useState(selectedShade?.image ?? '')
  useEffect(() => setShadeCode(initialShadeCode ?? ''), [initialShadeCode, config.slug])
  useEffect(() => setPreviewSrc(selectedShade?.image ?? ''), [selectedShade])
  const request = `Hi Red Mark, I would like a sample of ${config.title}${selectedShade ? ` — ${selectedShade.code} (${selectedShade.name})` : '. Please help me choose a shade'}. Please confirm the delivery charge.`

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
          Choose a shade card, then a shade. Your preview appears alongside the form.
        </p>
      </header>

      <div className="sample-terms">
        <strong>Free samples up to 1 kg per item.</strong>
        <p>Delivery is charged separately at the courier’s actual rate. We’ll confirm the delivery charge with you before dispatch.</p>
      </div>
      <div className="request-sample__layout">
        <form className="contact-form request-sample__form" onSubmit={(event) => openWhatsAppEnquiry(event, request)}>
          {collectionSelect}
          {selectedShade && previewSrc && (
            <input type="hidden" name={config.slug === 'pebble-finish' ? 'Illustrative reference image' : 'Shade image'} value={new URL(previewSrc, SITE_URL).href} />
          )}
          <div>
            <label htmlFor="sample-shade" className="contact-form-label">Shade</label>
            <select id="sample-shade" className="contact-form-select" value={selectedShade?.code ?? ''} onChange={(event) => setShadeCode(event.target.value)}>
              <option value="">Help me choose a shade</option>
              {config.shades.map(shade => <option key={shade.code} value={shade.code}>{shade.code} — {shade.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="sample-city" className="contact-form-label">Delivery city (optional)</label>
            <input id="sample-city" name="Delivery city" autoComplete="address-level2" className="contact-form-input" />
          </div>
          <div>
            <label htmlFor="sample-notes" className="contact-form-label">Anything else? (optional)</label>
            <textarea id="sample-notes" name="Notes" rows={2} maxLength={1200} className="contact-form-textarea" />
          </div>
          <button type="submit" className="contact-form-submit">Continue to WhatsApp →</button>
          <p className="contact-form-trust">Review your sample request in WhatsApp and tap Send.</p>
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
                {config.slug === 'pebble-finish' && <p className="contact-form-hint">Illustrative preview. Please confirm the actual Pebble shade with our team.</p>}
                <a href={previewSrc} download className="collection-link">Download shade image</a>
                <p className="contact-form-hint">Your WhatsApp draft includes this image’s link. You can also download and attach it in WhatsApp.</p>
              </>
            ) : (
              <div className="request-sample__preview-empty">
                <p className="request-sample__preview-empty-title">Shade preview</p>
                <p className="request-sample__preview-empty-text">
                  Choose a shade to see its swatch.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
