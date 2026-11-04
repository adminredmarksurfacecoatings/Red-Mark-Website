'use client'

import { openWhatsAppEnquiry } from './openWhatsAppEnquiry'

export default function BecomeDealerForm() {
  return (
    <form className="contact-form" onSubmit={(event) => openWhatsAppEnquiry(event, 'Hi Red Mark, I would like to become a dealer.')}>
      <div>
        <label htmlFor="dealer-name" className="contact-form-label">
          Contact Name <span className="contact-form-required-star">*</span>
        </label>
        <input type="text" id="dealer-name" name="Contact name" required className="contact-form-input" />
      </div>

      <div>
        <label htmlFor="dealer-business" className="contact-form-label">
          Business Name <span className="contact-form-required-star">*</span>
        </label>
        <input type="text" id="dealer-business" name="Business" required className="contact-form-input" />
      </div>

      <div>
        <label htmlFor="dealer-location" className="contact-form-label">
          Location <span className="contact-form-required-star">*</span>
        </label>
        <input type="text" id="dealer-location" name="Location" required className="contact-form-input" placeholder="City, state" />
      </div>

      <div>
        <label htmlFor="dealer-categories" className="contact-form-label">
          Existing Product Categories
        </label>
        <input type="text" id="dealer-categories" name="Product categories" className="contact-form-input" />
      </div>

      <div>
        <label htmlFor="dealer-volume" className="contact-form-label">
          Monthly Volume (approx.)
        </label>
        <input type="text" id="dealer-volume" name="Monthly volume" className="contact-form-input" />
      </div>

      <div>
        <label htmlFor="dealer-message" className="contact-form-label">
          Tell us about your business
        </label>
        <textarea id="dealer-message" name="Notes" rows={5} className="contact-form-textarea" />
      </div>

      <button type="submit" className="contact-form-submit">
        Continue to WhatsApp →
      </button>
      <p className="contact-form-trust">Review your dealer enquiry in WhatsApp and tap Send.</p>
    </form>
  )
}
