import projectImages from '@/lib/project-images.json'
export function imageDescription(src: string, index = 0): string {
  let filename = src.split('/').pop()?.split('?')[0] ?? ''
  try { filename = decodeURIComponent(filename) } catch {}
  const known = (projectImages as Record<string,{src:string;alt:string}>)[filename] ?? Object.values(projectImages).find(item => item.src === src)
  if (known) return known.alt
  const stem = filename.replace(/\.[^.]+$/, '').replace(/^\d{10,}-/, '')
  if (!stem || /^(img|dsc|image|whatsapp|chatgpt|home|hero|interior|exterior)[_ -]?\d|^(whatsapp|chatgpt)/i.test(stem)) return 'Decorative wall texture reference ' + (index + 1)
  return stem.replace(/[-_]+/g,' ').replace(/\b\w/, c => c.toUpperCase()) + ' — wall finish reference'
}
