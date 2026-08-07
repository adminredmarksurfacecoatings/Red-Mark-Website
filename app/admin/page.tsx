'use client'

import Image from 'next/image'
import { FormEvent, useEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import type { AuthUser } from '@supabase/supabase-js'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import {
  MEDIA_BUCKET,
  MEDIA_FOLDERS,
  buildRenamedStoragePath,
  folderPathFromId,
  isStorageImageFile,
  moveStorageObject,
  toDisabledPath,
  toEnabledPath,
  type MediaFolderId,
} from '@/lib/supabase/mediaLibrary'
import { checkIsStaff } from '@/lib/staffAccess'

type MediaItem = {
  name: string
  path: string
  publicUrl: string
  createdAt: string | null
  size: number | null
  folderId: MediaFolderId
  folderLabel: string
  enabled: boolean
}

export default function AdminPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [user, setUser] = useState<AuthUser | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [targetFolder, setTargetFolder] = useState<MediaFolderId>('projects')
  const [uploadEnabled, setUploadEnabled] = useState(true)
  const [items, setItems] = useState<MediaItem[]>([])
  const [pendingUploads, setPendingUploads] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [busyPath, setBusyPath] = useState<string | null>(null)
  const [renamingPath, setRenamingPath] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  async function ensureStaffAccess(): Promise<boolean> {
    if (!supabase) return false
    const result = await checkIsStaff(supabase)
    if (!result.ok) {
      setError(result.reason)
      setUser(null)
      return false
    }
    return true
  }

  useEffect(() => {
    if (!supabase) {
      setError('Supabase env vars are missing. Please configure .env.local and restart.')
      setIsLoading(false)
      return
    }

    let active = true
    ;(async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()

      if (!active) return
      setUser(currentUser)

      if (currentUser) {
        const allowed = await ensureStaffAccess()
        if (allowed) {
          await loadItems(currentUser)
        } else {
          await supabase.auth.signOut()
          setUser(null)
        }
      }

      setIsLoading(false)
    })()

    return () => {
      active = false
    }
  }, [supabase])

  async function revalidatePublicPages() {
    try {
      const res = await fetch('/api/revalidate-media', { method: 'POST', credentials: 'include' })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        console.warn('Revalidate failed:', body)
      }
    } catch (err) {
      console.warn('Revalidate failed:', err)
    }
  }

  async function loadItems(currentUser: AuthUser | null = user) {
    if (!supabase || !currentUser) return
    setError(null)

    const loaded: MediaItem[] = []
    for (const folder of MEDIA_FOLDERS) {
      const activeResult = await supabase.storage.from(MEDIA_BUCKET).list(folder.path, {
        limit: 200,
        sortBy: { column: 'created_at', order: 'desc' },
      })
      if (activeResult.error) {
        setError(activeResult.error.message)
        return
      }

      const disabledFolder = toDisabledPath(folder.path)
      const disabledResult = await supabase.storage.from(MEDIA_BUCKET).list(disabledFolder, {
        limit: 200,
        sortBy: { column: 'created_at', order: 'desc' },
      })

      activeResult.data?.forEach((file) => {
        if (!isStorageImageFile(file)) return
        const path = `${folder.path}/${file.name}`
        loaded.push({
          name: file.name,
          path,
          publicUrl: supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl,
          createdAt: file.created_at,
          size: file.metadata?.size ?? null,
          folderId: folder.id,
          folderLabel: folder.label,
          enabled: true,
        })
      })

      disabledResult.data?.forEach((file) => {
        if (!isStorageImageFile(file)) return
        const path = `${disabledFolder}/${file.name}`
        loaded.push({
          name: file.name,
          path,
          publicUrl: supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl,
          createdAt: file.created_at,
          size: file.metadata?.size ?? null,
          folderId: folder.id,
          folderLabel: folder.label,
          enabled: false,
        })
      })
    }

    loaded.sort((a, b) => {
      const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return tb - ta
    })

    setItems(loaded)
  }

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!supabase) {
      setError('Supabase env vars are missing. Please configure .env.local and restart.')
      return
    }

    setIsSigningIn(true)
    setError(null)
    setMessage(null)

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setIsSigningIn(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    const allowed = await ensureStaffAccess()
    if (!allowed) {
      await supabase.auth.signOut()
      setUser(null)
      setPassword('')
      return
    }

    setUser(data.user)
    setPassword('')
    setMessage('Signed in successfully.')
    await loadItems(data.user)
  }

  function handleUploadSelection(files: FileList | null) {
    if (!files || files.length === 0) return
    setPendingUploads(Array.from(files))
    setMessage(`${files.length} file(s) queued. Click Save Changes to finalize.`)
  }

  async function handleDelete(path: string) {
    if (!supabase || !user || busyPath) return
    if (!window.confirm('Delete this image permanently?')) return

    setBusyPath(path)
    setError(null)
    setMessage(null)

    const { error: deleteError } = await supabase.storage.from(MEDIA_BUCKET).remove([path])
    setBusyPath(null)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setMessage('Image deleted. Refresh the public page to confirm.')
    await loadItems()
    await revalidatePublicPages()
  }

  async function handleToggleEnabled(item: MediaItem, checked: boolean) {
    if (!supabase || !user || busyPath) return
    if (checked === item.enabled) return

    const destination = checked ? toEnabledPath(item.path) : toDisabledPath(item.path)
    if (destination === item.path) return

    setBusyPath(item.path)
    setError(null)
    setMessage(null)

    const { error: moveError } = await moveStorageObject(supabase, MEDIA_BUCKET, item.path, destination)
    setBusyPath(null)

    if (moveError) {
      setError(moveError)
      return
    }

    setMessage(checked ? 'Image is now embedded on the website.' : 'Image hidden from the website.')
    await loadItems()
    await revalidatePublicPages()
  }

  function startRename(item: MediaItem) {
    if (busyPath) return
    const stem = item.name.replace(/\.[a-zA-Z0-9]+$/, '')
    setRenamingPath(item.path)
    setRenameValue(stem)
    setError(null)
    setMessage(null)
  }

  function cancelRename() {
    setRenamingPath(null)
    setRenameValue('')
  }

  async function handleRename(item: MediaItem) {
    if (!supabase || !user || busyPath) return

    const built = buildRenamedStoragePath(item.path, renameValue)
    if ('error' in built) {
      setError(built.error)
      return
    }

    setBusyPath(item.path)
    setError(null)
    setMessage(null)

    const { error: moveError } = await moveStorageObject(
      supabase,
      MEDIA_BUCKET,
      item.path,
      built.path,
    )
    setBusyPath(null)

    if (moveError) {
      const conflictHint = /already exists|duplicate|conflict/i.test(moveError)
        ? ' A file with that name may already exist in this folder.'
        : ''
      setError(`Rename failed: ${moveError}.${conflictHint}`)
      return
    }

    setRenamingPath(null)
    setRenameValue('')
    setMessage(`Renamed to ${built.filename}.`)
    await loadItems()
    await revalidatePublicPages()
  }

  async function handleSaveChanges() {
    if (!supabase || !user) return
    if (pendingUploads.length === 0) return

    setIsSaving(true)
    setError(null)
    setMessage(null)

    const baseFolder = folderPathFromId(targetFolder)
    const uploadFolder = uploadEnabled ? baseFolder : toDisabledPath(baseFolder)
    for (const file of pendingUploads) {
      const safeName = file.name.replace(/\s+/g, '-').toLowerCase()
      const path = `${uploadFolder}/${Date.now()}-${safeName}`
      const { error: uploadError } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
      if (uploadError) {
        setError(uploadError.message)
        setIsSaving(false)
        return
      }
    }

    setPendingUploads([])
    setIsSaving(false)
    setMessage('Uploads saved successfully.')
    await loadItems()
    await revalidatePublicPages()
  }

  async function handleCopy(url: string) {
    try {
      await navigator.clipboard.writeText(url)
      setMessage('Image URL copied.')
    } catch {
      setError('Could not copy URL.')
    }
  }

  async function handleLogout() {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    setItems([])
    setLightboxIndex(null)
    setMessage('Signed out.')
  }

  const visibleItems = useMemo(
    () => items.filter((item) => item.folderId === targetFolder),
    [items, targetFolder],
  )

  useEffect(() => {
    setLightboxIndex(null)
  }, [targetFolder])

  useEffect(() => {
    if (lightboxIndex === null) return
    if (visibleItems.length === 0) {
      setLightboxIndex(null)
      return
    }
    if (lightboxIndex >= visibleItems.length) {
      setLightboxIndex(visibleItems.length - 1)
    }
  }, [lightboxIndex, visibleItems.length])

  useEffect(() => {
    if (lightboxIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        setLightboxIndex(null)
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setLightboxIndex((current) => {
          if (current === null || visibleItems.length === 0) return current
          return (current - 1 + visibleItems.length) % visibleItems.length
        })
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setLightboxIndex((current) => {
          if (current === null || visibleItems.length === 0) return current
          return (current + 1) % visibleItems.length
        })
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex, visibleItems.length])

  function openLightbox(index: number) {
    setLightboxIndex(index)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function showLightboxPrev() {
    if (visibleItems.length === 0) return
    setLightboxIndex((current) => {
      if (current === null) return current
      return (current - 1 + visibleItems.length) % visibleItems.length
    })
  }

  function showLightboxNext() {
    if (visibleItems.length === 0) return
    setLightboxIndex((current) => {
      if (current === null) return current
      return (current + 1) % visibleItems.length
    })
  }

  function onLightboxKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.preventDefault()
      closeLightbox()
    }
  }

  if (isLoading) {
    return (
      <section className="admin-page">
        <div className="container admin-auth-shell">
          <p className="admin-media-note">Loading…</p>
        </div>
      </section>
    )
  }

  if (!user) {
    return (
      <section className="admin-page">
        <div className="container admin-auth-shell">
          <h1 className="admin-auth-title">Employee Media Login</h1>
          <p className="admin-auth-subtitle">
            Staff accounts only — there is no public sign-up. Sign in with your
            authorized employee email to manage project images.
          </p>

          <form className="admin-auth-card" onSubmit={handleSignIn}>
            {!supabase ? (
              <p className="admin-auth-error">
                Supabase is not configured yet. Add `NEXT_PUBLIC_SUPABASE_URL` and
                `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`.
              </p>
            ) : null}
            <div>
              <label htmlFor="admin-email" className="contact-form-label">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                className="contact-form-input"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@redmarksurfacecoatings.com"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="contact-form-label">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                className="contact-form-input"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
              />
            </div>

            {error ? <p className="admin-auth-error">{error}</p> : null}

            <button type="submit" className="contact-form-submit" disabled={isSigningIn}>
              {isSigningIn ? 'Signing in…' : 'Continue to Media Panel'}
            </button>
          </form>
        </div>
      </section>
    )
  }

  const hasPendingUploads = pendingUploads.length > 0
  const lightboxItem =
    lightboxIndex !== null && lightboxIndex >= 0 && lightboxIndex < visibleItems.length
      ? visibleItems[lightboxIndex]
      : null

  return (
    <section className="admin-page">
      <div className="container admin-media-shell">
        <div className="admin-media-header">
          <div>
            <h1 className="admin-auth-title">Media Panel</h1>
            <p className="admin-auth-subtitle">
              Manage projects and finish collections from one panel.
            </p>
            {user.email ? <p className="admin-media-user">Signed in as {user.email}</p> : null}
          </div>
          <button className="contact-form-submit" onClick={handleLogout} type="button">
            Sign out
          </button>
        </div>

        <div className="admin-auth-card">
          <label className="contact-form-label" htmlFor="media-folder">
            Category
          </label>
          <select
            id="media-folder"
            className="contact-form-select"
            value={targetFolder}
            onChange={(e) => setTargetFolder(e.target.value as MediaFolderId)}
          >
            {MEDIA_FOLDERS.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.label}
              </option>
            ))}
          </select>
          <label className="admin-toggle-row" htmlFor="upload-enabled">
            <input
              id="upload-enabled"
              type="checkbox"
              checked={uploadEnabled}
              onChange={(e) => setUploadEnabled(e.target.checked)}
            />
            <span>Embedded (show on website)</span>
          </label>
          <input
            id="media-upload"
            type="file"
            multiple
            accept="image/*"
            className="admin-file-input"
            onChange={(e) => handleUploadSelection(e.target.files)}
            disabled={isSaving}
          />
          {pendingUploads.length > 0 ? (
            <p className="admin-media-note">{pendingUploads.length} file(s) queued for save.</p>
          ) : null}
          <p className="admin-media-note">
            Uploads are saved with the button below. Embedded, Rename, and Delete apply immediately to each
            image.
          </p>
          <p className="admin-media-note">
            Recommended: JPG/PNG/WebP, under 10MB each. Filenames are normalized automatically.
          </p>
          <button
            type="button"
            className="contact-form-submit"
            disabled={!hasPendingUploads || isSaving || Boolean(busyPath)}
            onClick={handleSaveChanges}
          >
            {isSaving ? 'Saving uploads…' : 'Save Uploads'}
          </button>
        </div>

        {message ? <p className="admin-auth-success">{message}</p> : null}
        {error ? <p className="admin-auth-error">{error}</p> : null}

        <div className="admin-media-grid">
          {visibleItems.map((item, index) => (
            <article key={item.path} className="admin-media-card">
              <button
                type="button"
                className="admin-media-thumb"
                onClick={() => openLightbox(index)}
                aria-label={`View ${item.name} fullscreen`}
              >
                <Image src={item.publicUrl} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
              </button>
              <div className="admin-media-meta">
                {renamingPath === item.path ? (
                  <form
                    className="admin-rename-form"
                    onSubmit={(e) => {
                      e.preventDefault()
                      void handleRename(item)
                    }}
                  >
                    <label className="contact-form-label" htmlFor={`rename-${item.path}`}>
                      New filename
                    </label>
                    <input
                      id={`rename-${item.path}`}
                      type="text"
                      className="contact-form-input"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      disabled={busyPath === item.path}
                      autoFocus
                      aria-describedby={`rename-hint-${item.path}`}
                    />
                    <p id={`rename-hint-${item.path}`} className="admin-media-note">
                      Extension stays {item.name.match(/\.[a-zA-Z0-9]+$/)?.[0] ?? 'unchanged'}. No folders or
                      path characters.
                    </p>
                    <div className="admin-media-actions admin-media-actions--inline">
                      <button
                        type="submit"
                        className="admin-inline-btn"
                        disabled={busyPath === item.path || !renameValue.trim()}
                      >
                        {busyPath === item.path ? 'Renaming…' : 'Save name'}
                      </button>
                      <button
                        type="button"
                        className="admin-inline-btn"
                        disabled={busyPath === item.path}
                        onClick={cancelRename}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="admin-media-name">{item.name}</p>
                    <p className="admin-media-note">
                      {item.folderLabel} · {item.size ? `${Math.round(item.size / 1024)} KB` : '—'}
                    </p>
                  </>
                )}
              </div>
              {renamingPath === item.path ? null : (
                <div className="admin-media-actions">
                  <label className="admin-toggle-row admin-toggle-row--compact">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      disabled={busyPath === item.path}
                      onChange={(e) => handleToggleEnabled(item, e.target.checked)}
                    />
                    <span>{busyPath === item.path ? 'Updating…' : 'Embedded'}</span>
                  </label>
                  <button
                    type="button"
                    className="admin-inline-btn"
                    disabled={Boolean(busyPath)}
                    onClick={() => startRename(item)}
                  >
                    Rename
                  </button>
                  <button
                    type="button"
                    className="admin-inline-btn"
                    disabled={Boolean(busyPath)}
                    onClick={() => handleCopy(item.publicUrl)}
                  >
                    Copy URL
                  </button>
                  <button
                    type="button"
                    className="admin-inline-btn admin-inline-btn--danger"
                    disabled={Boolean(busyPath)}
                    onClick={() => handleDelete(item.path)}
                  >
                    {busyPath === item.path ? 'Working…' : 'Delete'}
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {lightboxItem && lightboxIndex !== null ? (
        <div
          className="admin-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image preview"
          onKeyDown={onLightboxKeyDown}
        >
          <button
            type="button"
            className="admin-lightbox__backdrop"
            aria-label="Close fullscreen preview"
            onClick={closeLightbox}
          />
          <div className="admin-lightbox__toolbar">
            <p className="admin-lightbox__caption">
              {lightboxItem.name}
              <span className="admin-lightbox__count">
                {' '}
                · {lightboxIndex + 1} / {visibleItems.length}
              </span>
            </p>
            <div className="admin-lightbox__controls">
              <button
                type="button"
                className="admin-lightbox__btn"
                onClick={showLightboxPrev}
                disabled={visibleItems.length <= 1}
              >
                Previous
              </button>
              <button
                type="button"
                className="admin-lightbox__btn"
                onClick={showLightboxNext}
                disabled={visibleItems.length <= 1}
              >
                Next
              </button>
              <button type="button" className="admin-lightbox__btn" onClick={closeLightbox}>
                Close
              </button>
            </div>
          </div>
          <div className="admin-lightbox__stage">
            <Image
              src={lightboxItem.publicUrl}
              alt={lightboxItem.name}
              fill
              sizes="100vw"
              className="admin-lightbox__image"
              priority
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}
