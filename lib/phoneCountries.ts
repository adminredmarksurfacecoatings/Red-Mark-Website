import {
  getCountries,
  getCountryCallingCode,
  isSupportedCountry,
} from 'libphonenumber-js'
import type { CountryCode } from 'libphonenumber-js'
import isoCountries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'

isoCountries.registerLocale(en)

export const DEFAULT_PHONE_COUNTRY: CountryCode = 'IN'

export function countryFromIpIso2(iso2: string | undefined | null): CountryCode {
  if (!iso2) return DEFAULT_PHONE_COUNTRY
  const u = iso2.toUpperCase()
  if (isSupportedCountry(u)) return u
  return DEFAULT_PHONE_COUNTRY
}

export function dialStringForCountry(iso: CountryCode): string {
  return `+${getCountryCallingCode(iso)}`
}

export const PHONE_COUNTRY_OPTIONS: {
  iso: CountryCode
  dial: string
  name: string
}[] = (() => {
  const rows = getCountries().map((iso) => {
    const dial = `+${getCountryCallingCode(iso)}`
    const name = isoCountries.getName(iso, 'en') || iso
    return { iso, dial, name }
  })
  rows.sort((a, b) => {
    const na = isoCountries.getName(a.iso, 'en') || a.iso
    const nb = isoCountries.getName(b.iso, 'en') || b.iso
    return na.localeCompare(nb, 'en')
  })
  return rows
})()
