import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'

/** Scrolls to top on route change, unless there's an in-page anchor to jump to. */
export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash || location.pathname === '/wish') {
      window.scrollTo(0, 0)
      return undefined
    }

    const id = decodeURIComponent(location.hash.slice(1))
    let frame
    let attempts = 0

    // The target can belong to a lazy-loaded route, so wait for it to mount.
    const scrollWhenReady = () => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attempts++ < 30) {
        frame = window.requestAnimationFrame(scrollWhenReady)
      } else {
        window.scrollTo(0, 0)
      }
    }

    frame = window.requestAnimationFrame(scrollWhenReady)
    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])

  return null
}

export function PageLoader() {
  const reduced = useReducedMotion()
  return (
    <div className="grid min-h-[62svh] place-items-center px-6" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <motion.span
          className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-coral shadow-soft"
          animate={reduced ? undefined : { scale: [1, 1.08, 1], rotate: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <Heart className="h-5 w-5" fill="currentColor" aria-hidden="true" />
        </motion.span>
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
          Wrapping your wish…
        </span>
      </div>
    </div>
  )
}
