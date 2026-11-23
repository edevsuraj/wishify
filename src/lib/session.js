import { sanitizeWish } from './share.js'

const DRAFT_KEY = 'wishify:draft:v1'
const RECENT_KEY = 'wishify:recent-templates:v1'
const MAX_RECENT = 4

function safeSession() {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) return null
    return window.sessionStorage
  } catch {
    return null
  }
}

export const EMPTY_DRAFT = {
  occasion: null,
  template: null,
  recipient: '',
  sender: '',
  heading: '',
  relationship: '',
  message: '',
  animation: 'full',
  lang: 'en',
}

export function readDraft() {
  const storage = safeSession()
  if (!storage) return null
  try {
    const raw = storage.getItem(DRAFT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return {
      ...EMPTY_DRAFT,
      ...sanitizeWish(parsed),
      occasion: parsed.occasion ?? null,
      template: parsed.template ?? null,
      lang: parsed.lang === 'hi' ? 'hi' : 'en',
    }
  } catch {
    return null
  }
}

export function saveDraft(wish) {
  const storage = safeSession()
  if (!storage) return
  try {
    storage.setItem(DRAFT_KEY, JSON.stringify({ ...wish, savedAt: Date.now() }))
  } catch {
    /* storage may be full or blocked — drafts are a nicety, not a requirement */
  }
}

export function clearDraft() {
  const storage = safeSession()
  if (!storage) return
  try {
    storage.removeItem(DRAFT_KEY)
  } catch {
    /* ignore */
  }
}

export function readRecentTemplates() {
  const storage = safeSession()
  if (!storage) return []
  try {
    const parsed = JSON.parse(storage.getItem(RECENT_KEY) || '[]')
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string').slice(0, MAX_RECENT) : []
  } catch {
    return []
  }
}

export function addRecentTemplate(templateId) {
  const storage = safeSession()
  if (!storage || !templateId) return []
  try {
    const next = [templateId, ...readRecentTemplates().filter((id) => id !== templateId)].slice(0, MAX_RECENT)
    storage.setItem(RECENT_KEY, JSON.stringify(next))
    return next
  } catch {
    return []
  }
}

export function readSession(key, fallback = null) {
  const storage = safeSession()
  if (!storage) return fallback
  try {
    const raw = storage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeSession(key, value) {
  const storage = safeSession()
  if (!storage) return
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}
