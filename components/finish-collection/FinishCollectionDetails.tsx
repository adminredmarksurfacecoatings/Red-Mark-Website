import Link from 'next/link'
import type { FinishCollectionConfig } from '@/lib/finishCollection/types'
import styles from './FinishCollectionDetails.module.css'

type Detail = { heading: string; text: string }
const DETAILS: Record<string, Detail[]> = {
  'stone-finish': [
    { heading: 'Looking for marble texture for your walls?', text: 'Stone Finish is a Red Mark marble-texture wall coating with a rough surface. For a smoother texture, compare Pebble Finish. Choose a physical sample to check the shade and surface before application.' },
    { heading: 'Where can Stone Finish be used?', text: 'Use Stone Finish on cemented interior or exterior walls, including mouldings. Its rough texture makes it especially suited to exterior applications.' },
    { heading: 'What preparation does it need?', text: 'Start with a cemented wall and a white primer base. Red Mark recommends Calcidura for priming and a strong finish.' },
    { heading: 'How is it applied?', text: 'Apply 2–3 coats: the first with a trowel, followed by spray application. Confirm the application plan with your applicator before work begins.' },
    { heading: 'What does one pack cover?', text: 'A pack contains 25 kg of material plus 6 kg of chemical, with approximate coverage of 140 sq ft per pack.' },
  ],
  'pebble-finish': [
    { heading: 'Which marble texture should I choose?', text: 'Pebble Finish is the smoother of Red Mark’s two marble-texture options. Stone Finish has a rougher surface and is especially suited to exteriors. Both can be applied to prepared cemented walls indoors or outdoors.' },
    { heading: 'How does Pebble differ from Stone Finish?', text: 'Pebble Finish has a smoother texture than Stone Finish. It can be used on cemented walls both indoors and outdoors.' },
    { heading: 'What preparation does it need?', text: 'Start with a cemented wall and a white primer base. Red Mark recommends Calcidura for priming and a strong finish.' },
    { heading: 'How is it applied?', text: 'Pebble Finish is applied in two coats using a trowel.' },
    { heading: 'What does one pack cover?', text: 'The 25 kg + 5 kg pack covers approximately 140 sq ft.' },
  ],
  'create-art': [
    { heading: 'Is Create Art for interiors or exteriors?', text: 'Create Art can be used for both interior and exterior decorative walls. Explore the Slate, Dropway and Subaru designs to choose the texture you prefer.' },
    { heading: 'What base does it need?', text: 'The base must be smooth and white before the design material is applied.' },
    { heading: 'Which products are used, and in what order?', text: 'First apply the white Create Art material to form the design. Next apply TC 200 as the sealing coat, followed by Oxido as the colour coat.' },
    { heading: 'What is the pack size and coverage?', text: 'The white design material comes in a 25 kg bucket and covers approximately 150–200 sq ft, depending on the design. TC 200 and Oxido are the other products required for the system; ask our team to help plan quantities.' },
  ],
  farry: [
    { heading: 'Can Farry be used outside?', text: 'Farry is strictly for interior decorative applications.' },
    { heading: 'Does Farry have a glitter effect?', text: 'Farry has a high sheen rather than a glitter or sparkle finish. View a physical sample in your room lighting before choosing a shade.' },
    { heading: 'Which pack sizes are available?', text: 'Farry is available in 1 L and 4 L packs.' },
    { heading: 'How much does Farry cover?', text: 'Approximate coverage is 50–60 sq ft per litre. Share your wall area with our team for help planning the quantity.' },
  ],
}

export default function FinishCollectionDetails({ config }: { config: FinishCollectionConfig }) {
  const details = DETAILS[config.slug]
  if (!details) return null
  return (
    <section className={`${styles.section} page-section`} aria-labelledby={`${config.slug}-details`}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Plan your finish</p>
            <h2 id={`${config.slug}-details`}>{config.title}: preparation &amp; application</h2>
          </div>
          <p>Choose your texture, check the base, and plan the quantity before application.</p>
        </div>
        <div className={styles.grid}>
          {details.map(({ heading, text }) => (
            <article key={heading}>
              <h3>{heading}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        {config.slug === 'stone-finish' || config.slug === 'pebble-finish' ? (
          <p className={styles.compare}>
            Compare marble textures: {' '}
            <Link href="/finishes/exterior/stone-finish">Stone Finish — rough texture</Link>
            {' · '}
            <Link href="/finishes/exterior/pebble-finish">Pebble Finish — smoother texture</Link>
          </p>
        ) : null}
        <div className={styles.sample}>
          <div>
            <h3>Try a sample before you decide</h3>
            <p>Samples are free up to 1 kg per item. Delivery is arranged for your location, with courier charges quoted at the delivery service’s rate.</p>
          </div>
          <Link href={`/request-sample?collection=${config.slug}`} className="btn">Request a sample →</Link>
        </div>
      </div>
    </section>
  )
}
