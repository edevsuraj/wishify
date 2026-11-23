/** Clipboard + share helpers that degrade gracefully. */

export async function copyText(text) {
  if (!text) return false
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fall through to the legacy path (older browsers, insecure contexts).
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.top = '-9999px'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, textarea.value.length)
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

export function canNativeShare() {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function'
}

export async function nativeShare({ title, text, url }) {
  if (!canNativeShare()) return { shared: false, reason: 'unsupported' }
  try {
    await navigator.share({ title, text, url })
    return { shared: true }
  } catch (error) {
    if (error?.name === 'AbortError') return { shared: false, reason: 'cancelled' }
    return { shared: false, reason: 'error' }
  }
}

export function downloadDataUrl(dataUrl, filename = 'wishify-qr.png') {
  try {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    return true
  } catch {
    return false
  }
}
