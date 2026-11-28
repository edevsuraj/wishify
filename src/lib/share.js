import { OCCASION_IDS } from './occasions.js'
import { SITE } from './site.js'
import { DEFAULT_TEMPLATE_ID, TEMPLATE_IDS } from './templates.js'

/** Hard limits keep links short, QR codes scannable, and decoding safe. */
export const LIMITS = {
  recipient: 40,
  sender: 40,
  heading: 60,
  relationship: 40,
  message: 500,
  // Readable links use percent-encoding for non-Latin text, so allow more
  // characters than the old Base64 format while still rejecting huge payloads.
  encoded: 12000,
}

const ANIMATIONS = ['full', 'subtle', 'none']

function clamp(value, max) {
  if (typeof value !== 'string') return ''
  return value.length > max ? value.slice(0, max) : value
}

/** Removes control characters, normalises line endings and enforces limits. */
export function sanitizeText(value, { max, multiline = false } = {}) {
  if (typeof value !== 'string') return ''
  let text = value
    .normalize('NFC')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\uFFFD/g, '')

  text = multiline
    ? text.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n')
    : text.replace(/\s+/g, ' ')

  text = text.trim()
  if (max && text.length > max) text = text.slice(0, max).trimEnd()
  return text
}

export function sanitizeWish(wish = {}) {
  return {
    occasion: OCCASION_IDS.includes(wish.occasion) ? wish.occasion : null,
    template: TEMPLATE_IDS.includes(wish.template) ? wish.template : DEFAULT_TEMPLATE_ID,
    recipient: sanitizeText(wish.recipient, { max: LIMITS.recipient }),
    sender: sanitizeText(wish.sender, { max: LIMITS.sender }),
    heading: sanitizeText(wish.heading, { max: LIMITS.heading }),
    relationship: sanitizeText(wish.relationship, { max: LIMITS.relationship }),
    message: sanitizeText(wish.message, { max: LIMITS.message, multiline: true }),
    animation: ANIMATIONS.includes(wish.animation) ? wish.animation : 'full',
  }
}

function bytesToBase64Url(bytes) {
  let binary = ''
  const chunkSize = 0x8000
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize))
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToBytes(token) {
  const base64 = token.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return bytes
}

/**
 * Generates a readable fragment, for example:
 * occasion=birthday&template=soft-pastel&to=Sheru&message=...
 *
 * URLSearchParams still escapes characters that would break a URL (spaces,
 * Hindi/Devanagari text, emoji, &, #), but the data itself is now visible instead
 * of being hidden inside Base64. Spaces appear as `+` and non-Latin text uses
 * percent escapes — that is required for a valid, portable link.
 */
export function encodeWish(wish) {
  const clean = sanitizeWish(wish)
  const params = new URLSearchParams()
  params.set('v', '1')
  params.set('occasion', clean.occasion || 'custom')
  params.set('template', clean.template)
  params.set('to', clamp(clean.recipient, LIMITS.recipient))
  params.set('message', clamp(clean.message, LIMITS.message))
  if (clean.sender) params.set('from', clamp(clean.sender, LIMITS.sender))
  if (clean.heading) params.set('heading', clamp(clean.heading, LIMITS.heading))
  if (clean.relationship) params.set('relationship', clamp(clean.relationship, LIMITS.relationship))
  if (clean.animation !== 'full') params.set('motion', clean.animation)
  return params.toString()
}

function validateWishData(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { ok: false, reason: 'malformed', message: 'This wish link does not contain valid data.' }
  }

  if (data.v !== undefined && String(data.v) !== '1') {
    return {
      ok: false,
      reason: 'version',
      message: 'This wish was made with a newer version of Wishify and cannot be opened here yet.',
    }
  }

  const recipient = sanitizeText(data.r, { max: LIMITS.recipient })
  const message = sanitizeText(data.m, { max: LIMITS.message, multiline: true })

  if (!recipient || !message) {
    return {
      ok: false,
      reason: 'incomplete',
      message: 'This wish is missing a name or message, so it cannot be displayed.',
    }
  }

  const wish = {
    occasion: OCCASION_IDS.includes(data.o) ? data.o : 'custom',
    template: TEMPLATE_IDS.includes(data.t) ? data.t : DEFAULT_TEMPLATE_ID,
    recipient,
    sender: sanitizeText(data.s, { max: LIMITS.sender }),
    heading: sanitizeText(data.h, { max: LIMITS.heading }),
    relationship: sanitizeText(data.rel, { max: LIMITS.relationship }),
    message,
    animation: ANIMATIONS.includes(data.an) ? data.an : 'full',
  }

  return { ok: true, wish }
}

/** Decodes the old Base64URL fragment format so existing links keep working. */
function decodeLegacyToken(cleanToken) {
  if (!/^[A-Za-z0-9_-]+$/.test(cleanToken)) {
    return {
      ok: false,
      reason: 'malformed',
      message: 'This wish link appears to be damaged or incomplete.',
    }
  }

  let data
  try {
    const bytes = base64UrlToBytes(cleanToken)
    const json = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
    data = JSON.parse(json)
  } catch {
    return {
      ok: false,
      reason: 'malformed',
      message: 'This wish link appears to be damaged or incomplete.',
    }
  }

  return validateWishData(data)
}

function decodeReadableFragment(cleanToken) {
  let params
  try {
    params = new URLSearchParams(cleanToken)
  } catch {
    return {
      ok: false,
      reason: 'malformed',
      message: 'This wish link appears to be damaged or incomplete.',
    }
  }

  const value = (...keys) => {
    for (const key of keys) {
      if (params.has(key)) return params.get(key)
    }
    return undefined
  }

  return validateWishData({
    v: value('v', 'version'),
    o: value('o', 'occasion'),
    t: value('t', 'template'),
    r: value('r', 'to', 'recipient'),
    s: value('s', 'from', 'sender'),
    h: value('h', 'heading'),
    rel: value('rel', 'relationship'),
    m: value('m', 'message'),
    an: value('an', 'motion', 'animation'),
  })
}

/**
 * Decodes and validates a fragment. Supports both the readable format and the
 * old Base64URL format. Never throws, never evals.
 * @returns {{ ok: true, wish: object } | { ok: false, reason: string, message: string }}
 */
export function decodeWish(token) {
  if (typeof token !== 'string' || token.trim().length === 0) {
    return { ok: false, reason: 'empty', message: 'No wish data was found in this link.' }
  }

  const cleanToken = token.trim()
  if (cleanToken.length > LIMITS.encoded) {
    return {
      ok: false,
      reason: 'too-long',
      message: 'This wish link is unusually long, so it could not be opened safely.',
    }
  }

  const readable = /(^|&)(v|version|o|occasion|to|recipient|message)=/.test(cleanToken)
  return readable ? decodeReadableFragment(cleanToken) : decodeLegacyToken(cleanToken)
}

/** Reads the fragment from a `#fragment` string (or a full URL). */
export function readWishHash(hash) {
  if (typeof hash !== 'string') return decodeWish('')
  let value = hash
  const hashIndex = value.indexOf('#')
  if (hashIndex !== -1) value = value.slice(hashIndex + 1)
  return decodeWish(value)
}

export function getWishPath(wish) {
  return `/wish/#${encodeWish(wish)}`
}

export function buildWishUrl(wish) {
  const path = getWishPath(wish)
  if (typeof window === 'undefined') return `${SITE.url}${path}`

  // Local development should still produce localhost links; everywhere else
  // uses the configured public site URL so shared links stay canonical.
  const { origin, hostname } = window.location
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
  const base = isLocal ? origin : SITE.url
  const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return `${base}${basePath}${path}`
}

export function shareMessage(wish) {
  return `I made something special for you ${wish.recipient ? `${wish.recipient}` : ''} ❤️ Open this link:`
}

export function whatsappShareUrl(url, wish) {
  const text = `I made something special for you ${wish?.recipient ? wish.recipient.trim() + ' ' : ''}❤️\nOpen this link: ${url}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function wishTitle(wish) {
  return `A wish for ${wish?.recipient?.trim() || 'you'}`
}
