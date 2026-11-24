# Red Mark website review — 24 November 2026

Status: local changes prepared for review, not published. This is an implementation review, not legal advice or a certification of compliance.

## Implemented

- Privacy, terms, cookie, returns/refunds and accessibility pages linked from the footer and sitemap.
- Business operator and address verified against the owner's certificate. The GST number and certificate are deliberately excluded from the website.
- Required, initially unchecked consent on contact, dealer and sample forms. The notice explains the WhatsApp handoff and distinguishes enquiry consent from marketing. A message still requires Send in WhatsApp.
- Removed optional contact email and dealer monthly-volume fields. Public enquiries are not saved to a website database.
- Removed active Vercel Analytics and Speed Insights integrations; self-hosted the existing font families with their OFL licences. No advertising pixels or embedded maps/social/video were found in the reviewed public source. Hosting/media requests and restricted staff authentication remain.
- No generic cookie banner added for the revised configuration. System appearance is the default; explicit Light/Dark choices disclose that the preference is saved. Reassess before adding tracking, embeds or new storage.
- Improved focus visibility, form borders/placeholders, gallery image descriptions, keyboard image labels, reduced-motion handling and a slideshow pause control. Policies support light/dark appearance.
- Removed unverified testimonial/press templates, unsupported performance/response promises and unverified biographical claims. Exterior examples are labelled as illustrative references.
- Returns text follows the owner's unopened/untinted condition, requires agreed return shipping, and preserves remedies for faulty, damaged or misdescribed goods.

## Decisions still needed from the business

1. **Photographs and project permissions:** logo registration was confirmed by the owner, but commercial rights to all photographs were not. Phone uploads and existing assets do not establish copyright ownership. Maintain source, creator, licence and any client/property permission for each published image. Do not present generated concepts as completed customer projects.
2. **Returns procedure:** settle a return-request period, refund processing time/method, original-delivery treatment and responsibility for return costs before accepting an order. The site does not invent these terms. Confirm a monitored complaints contact and any required named grievance officer/process.
3. **Data operations:** document actual retention/deletion of WhatsApp/email/order records, access controls, backups and provider arrangements. Removing analytics code does not delete historical provider data. Avoid collecting identity documents or sensitive information for ordinary enquiries.
4. **Product evidence:** prepare technical/safety data, application instructions and substantiation before advertising weather, UV, waterproofing, health/environmental performance or warranties. Keep statutory invoice/product labelling requirements separate from the public website; the owner's instruction to exclude GST is respected here.
5. **Accessible documents:** legacy shade cards/brochures still need a dedicated tagged-PDF/read-order audit and remediation. Alternative contact assistance is offered. This review does not establish complete WCAG conformance or cover every assistive-technology combination.
6. **Sales territories and legal review:** confirm whether sales target Canada or other countries as well as India. Obtain Indian counsel's review of the policies and WhatsApp sales workflow; absence of an on-site checkout does not by itself settle e-commerce-law applicability.

## Primary references and scope

- [DPDP commencement notification](https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf): phased commencement. Most core processing/consent and individual-rights provisions are scheduled eighteen months after the November 2025 publication, in May 2027. Do not describe all duties as already effective in November 2026; prepare the operating procedures ahead of commencement.
- [2011 SPDI clarification](https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=48&relid=74990): existing Indian privacy requirements also need assessment during transition.
- [Consumer Protection (E-Commerce) Rules 2020](https://consumeraffairs.gov.in/public/upload/files/E%20commerce%20rules_1732703966.pdf): review seller disclosures, grievance handling and returns obligations for orders arranged electronically. Preserve mandatory consumer remedies.
- [CCPA guidelines](https://www.ccpa.doca.gov.in/guidelines): substantiate advertising and endorsements; do not imply verified customers or product performance without evidence.
- [Copyright Office handbook](https://copyright.gov.in/Documents/handbook.html): photographs and other creative works can be protected; obtain the appropriate rights rather than assuming an online or uploaded image is free to use.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): reference for keyboard operation, focus, contrast, alternatives and moving content. Typical AA thresholds are 4.5:1 normal text and 3:1 large text, with relevant non-text contrast requirements.

The reviewed public enquiry flow opens WhatsApp using a URL containing the entered message. WhatsApp receives that URL when opened; Red Mark receives the enquiry when the customer sends it. Customers can instead use telephone/email. No real customer enquiry was sent during verification.

## Verification results

- Production build, TypeScript and configured lint checks passed; 47 static routes generated. The build reported an outdated Browserslist data warning, not a build failure.
- Fourteen public route/sitemap checks returned HTTP 200, including all five policy/accessibility pages. Their HTML contained no GST label, Google Fonts request or active Vercel analytics/speed script reference.
- Contact and sample forms blocked an unchecked consent submission. Space toggled the native checkbox. Selecting a shade displayed the matching loaded swatch and image link. No message was sent.
- Mobile policy and sample pages had no horizontal overflow at a 390px viewport. Fixed a newly discovered policy navigation contrast issue and verified readable menu/logo and clear content spacing afterward.
- Sampled policy body-text contrast: approximately 7.94:1 light and 9.88:1 dark. This is a targeted check, not a complete audit of every pixel/state.
- Mobile menu Escape restored focus to its trigger. Gallery Enter opened the image preview; Escape closed it and restored focus. Slideshow Pause changed to Resume. System appearance restored after testing.
- No browser console errors appeared during the checked contact, sample, policy, menu, gallery and slideshow interactions.
- Final changes are uncommitted and unpublished. No production deployment or external customer submission was performed.
