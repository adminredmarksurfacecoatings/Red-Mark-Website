'use client'

import Image from 'next/image'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import type { AuthUser } from '@supabase/supabase-js'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import {
  MEDIA_BUCKET,
  MEDIA_FOLDERS,
  folderPathFromId,
  toDisabledPath,
  toEnabledPath,
  type MediaFolderId,
} from '@/lib/supabase/mediaLibrary'

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
  const [pendingEnabledChanges, setPendingEnabledChanges] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

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
        await loadItems(currentUser)
      }

      setIsLoading(false)
    })()

    return () => {
      active = false
    }
  }, [supabase])

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
        if (!file.name) return
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
        if (!file.name) return
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
    setPendingEnabledChanges({})
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
    if (!supabase || !user) return
    setError(null)
    setMessage(null)
    const { error: deleteError } = await supabase.storage.from(MEDIA_BUCKET).remove([path])
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    setMessage('Image deleted.')
    await loadItems()
  }

  function handleToggleEnabled(item: MediaItem, checked: boolean) {
    setPendingEnabledChanges((prev) => {
      if (checked === item.enabled) {
        const next = { ...prev }
        delete next[item.path]
        return next
      }
      return { ...prev, [item.path]: checked }
    })
  }

  async function handleSaveChanges() {
    if (!supabase || !user) return
    setIsSaving(true)
    setError(null)
    setMessage(null)

    const moveEntries = Object.entries(pendingEnabledChanges)
    for (const [path, checked] of moveEntries) {
      const destination = checked ? toEnabledPath(path) : toDisabledPath(path)
      if (destination === path) continue
      const { error: moveError } = await supabase.storage.from(MEDIA_BUCKET).move(path, destination)
      if (moveError) {
        setError(moveError.message)
        setIsSaving(false)
        return
      }
    }

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
    setPendingEnabledChanges({})
    setIsSaving(false)
    setMessage('Changes saved successfully.')
    await loadItems()
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
    setMessage('Signed out.')
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
            Sign in with your employee account to manage project images.
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

  const visibleItems = items.filter((item) => item.folderId === targetFolder)
  const hasPendingChanges = pendingUploads.length > 0 || Object.keys(pendingEnabledChanges).length > 0

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
            Recommended: JPG/PNG/WebP, under 10MB each. Filenames are normalized automatically.
          </p>
          <button
            type="button"
            className="contact-form-submit"
            disabled={!hasPendingChanges || isSaving}
            onClick={handleSaveChanges}
          >
            {isSaving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>

        {message ? <p className="admin-auth-success">{message}</p> : null}
        {error ? <p className="admin-auth-error">{error}</p> : null}

        <div className="admin-media-grid">
          {visibleItems.map((item) => (
            <article key={item.path} className="admin-media-card">
              <div className="admin-media-thumb">
                <Image src={item.publicUrl} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="admin-media-meta">
                <p className="admin-media-name">{item.name}</p>
                <p className="admin-media-note">
                  {item.folderLabel} · {item.size ? `${Math.round(item.size / 1024)} KB` : '—'}
                </p>
              </div>
              <div className="admin-media-actions">
                <label className="admin-toggle-row admin-toggle-row--compact">
                  <input
                    type="checkbox"
                    checked={pendingEnabledChanges[item.path] ?? item.enabled}
                    onChange={(e) => handleToggleEnabled(item, e.target.checked)}
                  />
                  <span>Embedded</span>
                </label>
                <button type="button" className="admin-inline-btn" onClick={() => handleCopy(item.publicUrl)}>
                  Copy URL
                </button>
                <button
                  type="button"
                  className="admin-inline-btn admin-inline-btn--danger"
                  onClick={() => handleDelete(item.path)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
