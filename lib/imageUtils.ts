/** True for Supabase (and other remote) URLs that should bypass the Next optimizer. */
export function isRemoteStorageImage(src: string): boolean {
  return src.startsWith('http://') || src.startsWith('https://')
}
