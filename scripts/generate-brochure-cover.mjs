/**
 * Renders page 1 of the brochure PDF to static cover images.
 * Run: npm run generate:brochure-cover
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { pdf } from 'pdf-to-img'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PDF_PATH = path.join(ROOT, 'public/brochure/REDMARKPPT.pdf')
const OUT_JPG = path.join(ROOT, 'public/brochure/collection-book-cover.jpg')
const OUT_WEBP = path.join(ROOT, 'public/brochure/collection-book-cover.webp')

async function main() {
  if (!fs.existsSync(PDF_PATH)) {
    throw new Error(`Brochure PDF not found at ${PDF_PATH}`)
  }

  const document = await pdf(PDF_PATH, { scale: 2.5 })
  let pageIndex = 0

  for await (const image of document) {
    pageIndex += 1
    if (pageIndex !== 1) continue

    fs.writeFileSync(OUT_JPG, image)
    await sharp(image).webp({ quality: 88 }).toFile(OUT_WEBP)

    const meta = await sharp(image).metadata()
    console.log(`Generated brochure cover (${meta.width}×${meta.height})`)
    console.log(`  ${OUT_JPG}`)
    console.log(`  ${OUT_WEBP}`)
    return
  }

  throw new Error('Brochure PDF has no pages')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
