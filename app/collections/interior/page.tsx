import { permanentRedirect } from 'next/navigation'

export default function LegacyCollectionPage() {
  permanentRedirect('/finishes/interior')
}
