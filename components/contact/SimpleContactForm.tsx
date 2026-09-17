'use client'

import FormSubmitHiddenFields from '@/components/contact/FormSubmitHiddenFields'

/** Short contact form — name, phone, email, city, message. Honeypot kept for spam. */
export default function SimpleContactForm() {
  return (
    <form
      className="contact-form"
      action="https://formsubmit.co/info@redmarksurfacecoatings.com"
      method="POST"
    >
      <FormSubmitHiddenFields subject="Website enquiry — Red Mark Surface Coatings" />

      <p className="contact-form-hint">
        Fields marked with <span className="contact-form-required-star">*</span> are required.
      </p>

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
        <label htmlFor="phone" className="contact-form-label">
          Phone <span className="contact-form-required-star">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91 98765 43210"
          className="contact-form-input"
        />
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
          placeholder="you@email.com"
          className="contact-form-input"
        />
      </div>

      <div>
        <label htmlFor="city" className="contact-form-label">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          autoComplete="address-level2"
          placeholder="City"
          className="contact-form-input"
        />
      </div>

      <div>
        <label htmlFor="message" className="contact-form-label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your project or enquiry…"
          className="contact-form-textarea"
        />
      </div>

      <button type="submit" className="contact-form-submit">
        Send Enquiry →
      </button>

      <p className="contact-form-trust">
        We typically respond within 24 hours. Your details remain confidential.
      </p>
    </form>
  )
}
