'use client'

import FormConsent from '@/components/contact/FormConsent'

import { openWhatsAppEnquiry } from './openWhatsAppEnquiry'

export default function BecomeDealerForm() {
  return (
    <form className="contact-form" onSubmit={(event) => openWhatsAppEnquiry(event, 'Hi Red Mark, I would like to become a dealer.')}>
      <div>
        <label htmlFor="dealer-name" className="contact-form-label">
          Contact name (optional)
        </label>
        <input type="text" id="dealer-name" name="Contact name" autoComplete="name" maxLength={120} className="contact-form-input" />
      </div>

      <div>
        <label htmlFor="dealer-business" className="contact-form-label">
          Business Name <span className="contact-form-required-star">*</span>
        </label>
        <input type="text" id="dealer-business" name="Business" autoComplete="organization" maxLength={160} required className="contact-form-input" />
      </div>

      <div>
        <label htmlFor="dealer-location" className="contact-form-label">
          Location <span className="contact-form-required-star">*</span>
        </label>
        <input type="text" id="dealer-location" name="Location" autoComplete="address-level2" maxLength={160} required className="contact-form-input" placeholder="City, state" />
      </div>

      <div>
        <label htmlFor="dealer-categories" className="contact-form-label">
          Existing Product Categories
        </label>
        <input type="text" id="dealer-categories" name="Product categories" className="contact-form-input" />
      </div>

<div>
        <label htmlFor="dealer-message" className="contact-form-label">
          Tell us about your business
        </label>
        <textarea id="dealer-message" name="Notes" rows={5} maxLength={1200} className="contact-form-textarea" />
      </div>

      <FormConsent />
      <button type="submit" className="contact-form-submit">
        Continue to WhatsApp →
      </button>
      <p className="contact-form-trust">Review your dealer enquiry in WhatsApp and tap Send.</p>
    </form>
  )
}
