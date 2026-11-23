import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, Heart, MailOpen, ShieldCheck } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta.js'
import { readWishHash } from '../lib/share.js'
import { getTemplate } from '../lib/templates.js'
import Logo from '../components/ui/Logo.jsx'
import Button from '../components/ui/Button.jsx'
import WishStage from '../components/greeting/WishStage.jsx'
import WishActions from '../components/greeting/WishActions.jsx'
import AdSlot from '../components/ads/AdSlot.jsx'

function WishFallback({ result }) {
  const isEmpty = result.reason === 'empty'

  return (
    <div className="flex min-h-svh flex-col bg-cream">
      <header className="container-page flex h-[4.25rem] items-center justify-between">
        <Logo />
        <Button to="/create" variant="primary" size="sm">
          Create a wish
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-14">
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
            <Button to="/templates" variant="secondary" size="lg">
              Explore designs
            </Button>
          </div>
        </motion.div>
      </main>

      <footer className="container-page border-t border-ink/[0.06] py-6 text-center text-xs text-taupe">
        Wishify · wishes travel inside their links, never through a server.
      </footer>
    </div>
  )
}

export default function Wish() {
  const location = useLocation()
  const [hash, setHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash))
  const [opened, setOpened] = useState(false)
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
    setOpened(false)
    setStageKey((key) => key + 1)
  }, [hash])

  const handleOpenedChange = useCallback((value) => setOpened(value), [])

  const replay = useCallback(() => {
    setOpened(false)
    setStageKey((key) => key + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (!result.ok || !wish || !template) {
    return <WishFallback result={result} />
  }

  const cover = template.cover
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="relative min-h-svh overflow-x-hidden" style={{ background: cover.bg }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 50% -10%, rgba(255,255,255,0.14), transparent 60%), linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.18))',
        }}
      />

      <div className="relative z-10 flex min-h-svh flex-col">
        <header className="flex h-14 items-center justify-between gap-3 px-4 sm:px-7">
          <div className="rounded-full bg-white/85 px-3 py-1.5 shadow-soft backdrop-blur-sm">
            <Logo />
          </div>
          <Link
            to="/create"
            className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.7rem] font-semibold backdrop-blur-sm transition hover:opacity-80"
            style={{
              color: cover.ink,
              borderColor: `${cover.ink}33`,
              backgroundColor: `${cover.ink}14`,
            }}
          >
            Make your own
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </header>

        <main className="flex flex-1 justify-center px-0 sm:px-6">
          <div className="w-full max-w-[62rem]">
            <div
              className="h-[calc(100svh-3.5rem)] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] sm:h-[min(86svh,880px)] sm:rounded-[2rem] sm:ring-1 sm:ring-white/20"
            >
              <WishStage
                key={stageKey}
                wish={wish}
                onOpenedChange={handleOpenedChange}
              />
            </div>
          </div>
        </main>

        {opened && (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-6 border-t border-white/10 bg-cream px-4 py-12 text-ink sm:mt-10 sm:rounded-t-[2rem] sm:px-8 sm:py-14"
          >
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow justify-center">
                <span className="h-px w-6 bg-coral/40" />
                Delivered with love
                <span className="h-px w-6 bg-coral/40" />
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                A little happiness, now in {wish.recipient}’s hands.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cocoa">
                Want to send one back? Or share this exact wish with someone who might need it
                today?
              </p>

              <div className="mt-8">
                <WishActions wish={wish} url={shareUrl} onReplay={replay} />
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-2 text-[0.7rem] text-taupe sm:flex-row">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-sage" aria-hidden="true" />
                  Anyone with this link can view this wish.
                </span>
                <span className="hidden text-ink/20 sm:inline" aria-hidden="true">
                  ·
                </span>
                <span>Nothing is stored on a server, and links can’t be revoked.</span>
              </div>

              <p className="mt-6">
                <Link
                  to="/privacy"
                  className="text-[0.7rem] font-medium text-taupe underline-offset-4 hover:text-ink hover:underline"
                >
                  How Wishify handles privacy
                </Link>
              </p>
            </div>

            <AdSlot placement="wish" className="mt-10" />
          </motion.section>
        )}
      </div>
    </div>
  )
}
