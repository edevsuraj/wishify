import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ADS } from '../../lib/site.js'

const CONSENT_KEY = 'wishify:ads-consent:v1'
const AdsContext = createContext({ consent: null, setConsent: () => {}, scriptReady: false })

function readConsent() {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

/**
 * Ads are completely inert until a publisher ID is configured at build time.
 * Even then, the AdSense script only loads once the visitor explicitly opts in.
 */
export function AdsProvider({ children }) {
  const [consent, setConsentState] = useState(() => (ADS.enabled ? readConsent() : 'disabled'))
  const [scriptReady, setScriptReady] = useState(false)

  const setConsent = (value) => {
    setConsentState(value)
    try {
      window.localStorage.setItem(CONSENT_KEY, value)
    } catch {
      /* preferences may be blocked; ads simply stay off next visit */
    }
  }

  useEffect(() => {
    if (!ADS.enabled || consent !== 'granted') return undefined

    const selector = 'script[data-wishify-adsense]'
    const existing = document.querySelector(selector)
    if (existing) {
      if (existing.dataset.loaded === 'true') setScriptReady(true)
      else existing.addEventListener('load', () => setScriptReady(true), { once: true })
      return undefined
    }

    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = 'anonymous'
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADS.client)}`
    script.dataset.wishifyAdsense = 'true'
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true'
        setScriptReady(true)
      },
      { once: true },
    )
    document.head.appendChild(script)

    return undefined
  }, [consent])

  const value = useMemo(
    () => ({ consent, setConsent, scriptReady, enabled: ADS.enabled }),
    [consent, scriptReady],
  )

  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>
}

export function useAdsConsent() {
  return useContext(AdsContext)
}
