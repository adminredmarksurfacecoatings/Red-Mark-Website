'use client'

import { openWhatsAppEnquiry } from './openWhatsAppEnquiry'

export default function SimpleContactForm() {
  return (
    <form
      className="contact-form"
      onSubmit={(event) => openWhatsAppEnquiry(event, 'Hi Red Mark, I have a project enquiry.')}
    >
      <div>
        <label htmlFor="name" className="contact-form-label">
          Name (optional)
        </label>
        <input
          type="text"
          id="name"
          name="Name"
          autoComplete="name"
          placeholder="Your full name"
          className="contact-form-input"
        />
      </div>

      <div>
        <label htmlFor="email" className="contact-form-label">
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          name="Email"
          autoComplete="email"
          placeholder="you@email.com"
          className="contact-form-input"
        />
      </div>

      <div>
        <label htmlFor="city" className="contact-form-label">
          City (optional)
        </label>
        <input
          type="text"
          id="city"
          name="City"
          autoComplete="address-level2"
          placeholder="City"
          className="contact-form-input"
        />
      </div>

      <div>
        <label htmlFor="message" className="contact-form-label">
          Your question
        </label>
        <textarea
          id="message"
          name="Message" required maxLength={1200}
          rows={5}
          placeholder="Tell us about your project or enquiry…"
          className="contact-form-textarea"
        />
      </div>

      <button type="submit" className="contact-form-submit">
        Continue to WhatsApp →
      </button>

      <p className="contact-form-trust">
        Review your message in WhatsApp and tap Send.
      </p>
    </form>
  )
}
