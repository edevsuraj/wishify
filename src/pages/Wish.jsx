import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, Heart, MailOpen } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta.js'
import { readWishHash } from '../lib/share.js'
import { getTemplate } from '../lib/templates.js'
import Button from '../components/ui/Button.jsx'
import WishStage from '../components/greeting/WishStage.jsx'

function WishFallback({ result }) {
  const isEmpty = result.reason === 'empty'

  return (
    <div className="flex min-h-svh flex-col bg-cream">
      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg text-center"
        >
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white text-coral shadow-soft ring-1 ring-ink/[0.05]">
            {isEmpty ? (
              <MailOpen className="h-7 w-7" aria-hidden="true" />
            ) : (
              <AlertTriangle className="h-7 w-7 text-gold-deep" aria-hidden="true" />
            )}
          </span>

          <p className="eyebrow mt-7 justify-center">
            <span className="h-px w-6 bg-coral/40" />
            {isEmpty ? 'Nothing here yet' : 'Link interrupted'}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {isEmpty ? 'There’s no wish in this link.' : 'This wish couldn’t open.'}
          </h1>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-cocoa">
            {isEmpty
              ? 'A Wishify link carries the whole greeting after the # symbol. This one doesn’t have that part.'
              : result.message}
          </p>

          <p className="mx-auto mt-5 max-w-md rounded-2xl border border-ink/[0.06] bg-white/60 px-4 py-3 text-[0.8rem] leading-relaxed text-taupe">
            {isEmpty
              ? 'If someone sent you a wish, ask them to copy the complete link — some chat apps cut off long URLs.'
              : 'Sometimes chat apps clip long links. Ask the sender to share the full link again, including everything after the # symbol.'}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/create" variant="coral" size="lg">
              <Heart className="h-4 w-4" fill="currentColor" aria-hidden="true" />
              Create your own wish
            </Button>
          </div>
        </motion.div>
      </main>

      <footer className="container-page flex items-center justify-center gap-1.5 border-t border-ink/[0.06] py-5 text-xs text-taupe">
        Created by
        <Link to="/" className="font-semibold text-ink underline decoration-coral/40 underline-offset-4 hover:decoration-coral">
          Wishify
        </Link>
      </footer>
    </div>
  )
}

export default function Wish() {
  const location = useLocation()
  const [hash, setHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash))
  const [stageKey, setStageKey] = useState(0)
  const lastHashRef = useRef(hash)

  useEffect(() => {
    setHash(location.hash || window.location.hash)
  }, [location.hash])

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const result = useMemo(() => readWishHash(hash), [hash])
  const wish = result.ok ? result.wish : null
  const template = wish ? getTemplate(wish.template) : null

  usePageMeta(
    result.ok ? `A wish for ${result.wish.recipient}` : 'A wish',
    result.ok
      ? `A personalized ${result.wish.occasion} wish for ${result.wish.recipient}${result.wish.sender ? `, from ${result.wish.sender}` : ''}.`
      : 'This Wishify link could not be opened.',
  )

  useEffect(() => {
    // Only reset when the hash genuinely changes, not on first mount.
    if (lastHashRef.current === hash) return
    lastHashRef.current = hash
    setStageKey((key) => key + 1)
  }, [hash])

  if (!result.ok || !wish || !template) {
    return <WishFallback result={result} />
  }

  const cover = template.cover

  return (
    <div className="relative h-svh overflow-hidden" style={{ background: cover.bg }}>
      <WishStage key={stageKey} wish={wish} interactive />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-3">
        <Link
          to="/"
          className="pointer-events-auto text-[0.7rem] font-medium underline decoration-current/40 underline-offset-4 transition hover:opacity-80"
          style={{ color: cover.ink, opacity: 0.72 }}
        >
          Created by Wishify
        </Link>
      </div>
    </div>
  )
}
