'use client'

export default function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/admin.redmarksurfacecoatings@gmail.com"
      method="POST"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
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
      <input
        type="hidden"
        name="_captcha"
        value="false"
      />

      {/* Email subject */}
      <input
        type="hidden"
        name="_subject"
        value="New inquiry from Red Mark website"
      />

      {/* Email template */}
      <input
        type="hidden"
        name="_template"
        value="table"
      />

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
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            fontSize: '1rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#2B2B2B',
            backgroundColor: 'transparent',
            border: '1px solid rgba(106, 30, 30, 0.2)',
            borderRadius: '2px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--oxide-red)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.2)'
          }}
        />
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
          Email <span style={{ color: '#6A1E1E' }}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            fontSize: '1rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#2B2B2B',
            backgroundColor: 'transparent',
            border: '1px solid rgba(106, 30, 30, 0.2)',
            borderRadius: '2px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--oxide-red)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.2)'
          }}
        />
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: '#2B2B2B',
            marginBottom: '0.5rem',
          }}
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+1 555 123 4567"
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            fontSize: '1rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#2B2B2B',
            backgroundColor: 'transparent',
            border: '1px solid rgba(106, 30, 30, 0.2)',
            borderRadius: '2px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--oxide-red)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.2)'
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
        <select
          id="projectType"
          name="projectType"
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            fontSize: '1rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#2B2B2B',
            backgroundColor: 'transparent',
            border: '1px solid rgba(106, 30, 30, 0.2)',
            borderRadius: '2px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            cursor: 'pointer',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--oxide-red)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.2)'
          }}
        >
          <option value="">Select project type</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Industrial">Industrial</option>
          <option value="Other">Other</option>
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
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            fontSize: '1rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#2B2B2B',
            backgroundColor: 'transparent',
            border: '1px solid rgba(106, 30, 30, 0.2)',
            borderRadius: '2px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--oxide-red)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.2)'
          }}
        />
      </div>

      {/* Surface Area Field */}
      <div>
        <label
          htmlFor="surfaceArea"
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
        <input
          type="text"
          id="surfaceArea"
          name="surfaceArea"
          placeholder="e.g., 500 sq ft"
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            fontSize: '1rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#2B2B2B',
            backgroundColor: 'transparent',
            border: '1px solid rgba(106, 30, 30, 0.2)',
            borderRadius: '2px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--oxide-red)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.2)'
          }}
        />
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
          Message <span style={{ color: '#6A1E1E' }}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={20}
          placeholder="Share project type, area, timeline, and the finish direction you are considering."
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            fontSize: '1rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: '#2B2B2B',
            backgroundColor: 'transparent',
            border: '1px solid rgba(106, 30, 30, 0.2)',
            borderRadius: '2px',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 0.2s ease',
            minHeight: '120px',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--oxide-red)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(106, 30, 30, 0.2)'
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
        Send Message
      </button>

      {/* Trust Text */}
      <p style={{
        fontSize: '0.8125rem',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
        color: '#6A6A6A',
        marginTop: '0.5rem',
        lineHeight: 1.6,
      }}>
        Our team typically responds within 24–48 hours. Your details remain confidential.
      </p>
    </form>
  )
}
