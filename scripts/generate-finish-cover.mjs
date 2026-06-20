/**
 * Renders page 1 of a finish shade card PDF to cover images.
 * Run: npm run generate:finish-cover -- pebble-finish
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { pdf } from 'pdf-to-img'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const COLLECTIONS = {
  'stone-finish': path.join(ROOT, 'public/Shadecards/stone-finish/shade-card'),
  'pebble-finish': path.join(ROOT, 'public/Shadecards/pebble-finish/shade-card'),
  'create-art': path.join(ROOT, 'public/Shadecards/create-art/shade-card'),
}

const slug = process.argv[2] || 'stone-finish'
const SHADE_CARD_DIR = COLLECTIONS[slug]

if (!SHADE_CARD_DIR) {
  console.error(`Unknown collection "${slug}". Use: stone-finish | pebble-finish | create-art`)
  process.exit(1)
}

const OUT_JPG = path.join(SHADE_CARD_DIR, 'cover.jpg')
const OUT_WEBP = path.join(SHADE_CARD_DIR, 'cover.webp')
const OUT_META = path.join(SHADE_CARD_DIR, 'cover-meta.json')

function resolvePdfPath() {
  const files = fs
    .readdirSync(SHADE_CARD_DIR)
    .filter((name) => name.toLowerCase().endsWith('.pdf'))

  if (files.length === 0) {
    throw new Error(`No shade card PDF found in ${SHADE_CARD_DIR}`)
  }

  return path.join(SHADE_CARD_DIR, files[0])
}

async function main() {
  const pdfPath = resolvePdfPath()
  const document = await pdf(pdfPath, { scale: 2.5 })
  let pageIndex = 0

  for await (const image of document) {
    pageIndex += 1
    if (pageIndex !== 1) continue

    fs.writeFileSync(OUT_JPG, image)
    await sharp(image).webp({ quality: 88 }).toFile(OUT_WEBP)

    const meta = await sharp(image).metadata()
    const coverMeta = {
      width: meta.width ?? 1350,
      height: meta.height ?? 1800,
      sourcePdf: path.basename(pdfPath),
      collection: slug,
      generatedAt: new Date().toISOString(),
    }
    fs.writeFileSync(OUT_META, `${JSON.stringify(coverMeta, null, 2)}\n`)

    console.log(`Generated ${slug} shade card cover (${coverMeta.width}×${coverMeta.height})`)
    console.log(`  Source: ${pdfPath}`)
    console.log(`  ${OUT_JPG}`)
    console.log(`  ${OUT_WEBP}`)
    return
  }

  throw new Error('Shade card PDF has no pages')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
