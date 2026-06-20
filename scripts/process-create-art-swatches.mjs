/**
 * Processes source Create Art JPEGs into public/Shadecards/create-art/single-shades.
 * Run: npm run process:create-art-swatches
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const SOURCE_DIR = path.join(ROOT, 'public/Shadecards/_source/create-art')
const OUT_ROOT = path.join(ROOT, 'public/Shadecards/create-art/single-shades')

/** Maps source filenames (SL-1.JPEG) to normalized shade codes (SL-01). */
const FILE_TO_CODE = {
  'SL-1': 'SL-01',
  'SL-2': 'SL-02',
  'SL-3': 'SL-03',
  'SL-4': 'SL-04',
  'DR-1': 'DR-01',
  'DR-2': 'DR-02',
  'DR-3': 'DR-03',
  'DR-4': 'DR-04',
  'SU-1': 'SU-01',
  'SU-2': 'SU-02',
  'SU-3': 'SU-03',
  'SU-4': 'SU-04',
}

function normalizeBaseName(filename) {
  return path.basename(filename, path.extname(filename)).toUpperCase()
}

async function processFile(sourcePath, code) {
  const outDir = path.join(OUT_ROOT, code)
  fs.mkdirSync(outDir, { recursive: true })

  const jpgPath = path.join(outDir, 'swatch.jpg')
  const webpPath = path.join(outDir, 'swatch.webp')

  const image = sharp(sourcePath).rotate()
  await image.clone().jpeg({ quality: 90 }).toFile(jpgPath)
  await image.clone().webp({ quality: 88 }).toFile(webpPath)

  console.log(`  ${code} ← ${path.basename(sourcePath)}`)
}

async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Source folder not found: ${SOURCE_DIR}`)
  }

  const files = fs
    .readdirSync(SOURCE_DIR)
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .sort()

  if (files.length === 0) {
    throw new Error(`No image files found in ${SOURCE_DIR}`)
  }

  console.log(`Processing ${files.length} Create Art swatches:`)

  for (const file of files) {
    const base = normalizeBaseName(file)
    const code = FILE_TO_CODE[base]

    if (!code) {
      console.warn(`  Skipping unrecognized file: ${file}`)
      continue
    }

    await processFile(path.join(SOURCE_DIR, file), code)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
