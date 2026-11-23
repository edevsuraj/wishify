import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { useAdsConsent } from './AdsProvider.jsx'
import { ADS } from '../../lib/site.js'

/** Consent banner — only ever rendered when a real ad client is configured. */
export default function AdConsent() {
  const { consent, setConsent } = useAdsConsent()

  const visible = ADS.enabled && consent === null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[25rem]"
          role="dialog"
          aria-label="Advertising preferences"
        >
          <div className="rounded-3xl border border-ink/10 bg-paper/95 p-5 shadow-lift backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-50 text-gold-deep">
                <Cookie className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">A note about ads</p>
                <p className="mt-1 text-[0.8rem] leading-relaxed text-cocoa">
                  Wishify is free. To keep it that way, we’d like to show a few respectful ads from
                  Google AdSense. They never cover a greeting, and you can change your mind later.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setConsent('granted')}
                    className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream transition hover:bg-[#3A2C24]"
                  >
                    Accept ads
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsent('denied')}
                    className="rounded-full border border-ink/12 px-4 py-2 text-xs font-semibold text-cocoa transition hover:border-ink/25"
                  >
                    No thanks
                  </button>
                  <Link to="/privacy" className="text-xs text-taupe underline-offset-2 hover:underline">
                    Privacy details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
