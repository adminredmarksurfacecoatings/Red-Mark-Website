import Link from 'next/link'
import { CONTACT_WHATSAPP_HREF } from '@/lib/contact'

type ContactWhatsAppActionsProps = {
  className?: string
  contactLabel?: string
  whatsappLabel?: string
  contactClassName?: string
  whatsappClassName?: string
}

/** Primary Contact + WhatsApp pair for places that previously linked to Find a Dealer. */
export default function ContactWhatsAppActions({
  className = 'contact-whatsapp-actions',
  contactLabel = 'Contact Us',
  whatsappLabel = 'WhatsApp',
  contactClassName = 'btn',
  whatsappClassName = 'contact-whatsapp-actions__whatsapp',
}: ContactWhatsAppActionsProps) {
  return (
    <div className={className}>
      <Link href="/contact" className={contactClassName}>
        {contactLabel}
      </Link>
      <a
        href={CONTACT_WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={whatsappClassName}
      >
        {whatsappLabel}
      </a>
    </div>
  )
}
