import { useEffect, useRef } from 'react'
import { ADS } from '../../lib/site.js'
import { useAdsConsent } from './AdsProvider.jsx'

/**
 * A single, clearly-labelled, non-intrusive ad placement.
 * Renders nothing at all until AdSense is configured AND consent is granted.
 */
export default function AdSlot({ placement = 'home', className = '' }) {
  const { enabled, consent, scriptReady } = useAdsConsent()
  const slot = ADS.slots[placement]
  const insRef = useRef(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (!enabled || consent !== 'granted' || !scriptReady || !slot || pushed.current) return
    try {
      // eslint-disable-next-line no-underscore-dangle
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      /* The ad simply doesn't render; never disrupt the experience. */
    }
  }, [enabled, consent, scriptReady, slot])

  if (!enabled || consent !== 'granted' || !slot) return null

  return (
    <aside className={`container-page ${className}`} aria-label="Advertisement">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-ink/[0.06] bg-white/40 px-3 py-2">
        <p className="mb-1.5 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-taupe/70">
          Advertisement
        </p>
        <ins
          ref={insRef}
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={ADS.client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  )
}
