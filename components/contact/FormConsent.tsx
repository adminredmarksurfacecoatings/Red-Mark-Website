import Link from 'next/link'
import { useId } from 'react'
export default function FormConsent() {
  const id=useId()
  return <div className="form-consent"><label htmlFor={id}><input id={id} type="checkbox" name="Enquiry consent" value="I agree to Red Mark using these details to respond to this enquiry; not marketing." required aria-describedby={id+'-notice'} /><span>I agree to Red Mark using the information I provide to respond to this enquiry. (Required)</span></label><p id={id+'-notice'}>Continuing opens WhatsApp and shares the entered details with WhatsApp in a draft link. Tap Send there to deliver it to Red Mark. This is not marketing consent. Please avoid sensitive information. Read our <Link href="/privacy-policy">Privacy Policy</Link>, or use <Link href="/contact">email or telephone</Link> instead.</p></div>
}
