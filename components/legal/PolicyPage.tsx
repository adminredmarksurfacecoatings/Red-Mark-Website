import Link from 'next/link'
import { BUSINESS_OPERATOR, BUSINESS_ADDRESS } from '@/lib/business'
import type { ReactNode } from 'react'
import { CONTACT_EMAIL, CONTACT_PHONE_INDIA, CONTACT_PHONE_INDIA_DISPLAY } from '@/lib/contact'
export default function PolicyPage({ title, children }: { title: string; children: ReactNode }) {
  return <article className="policy-page container"><nav aria-label="Breadcrumb"><Link href="/">Home</Link> / <span aria-current="page">{title}</span></nav><h1>{title}</h1><p className="policy-date">Last updated: 24 November 2026</p>{children}<section><h2>Business details and contact</h2><p>{BUSINESS_OPERATOR}</p><address>{BUSINESS_ADDRESS}</address><p>Red Mark Surface Coatings. For privacy, accessibility, order or refund enquiries, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or call <a href={`tel:${CONTACT_PHONE_INDIA}`}>{CONTACT_PHONE_INDIA_DISPLAY}</a>. Please describe your request and include only the information needed to resolve it.</p><p><Link href="/contact">View business contact details</Link></p></section></article>
}
