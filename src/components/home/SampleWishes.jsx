import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Copy, Quote } from 'lucide-react'
import { getOccasion } from '../../lib/occasions.js'
import { getTemplate } from '../../lib/templates.js'
import TemplateThumb from '../templates/TemplateThumb.jsx'
import { copyText } from '../../lib/clipboard.js'
import { useToast } from '../ui/Toast.jsx'

const SAMPLES = [
  {
    id: 'birthday',
    tab: 'Birthday',
    label: 'A birthday wish',
    occasion: 'birthday',
    template: 'colorful-confetti',
    name: 'Aanya',
    heading: 'Happy Birthday',
    message: getOccasion('birthday').messages[0],
  },
  {
    id: 'anniversary',
    tab: 'Anniversary',
    label: 'An anniversary note',
    occasion: 'anniversary',
    template: 'romantic-hearts',
    name: 'Meera & Rohan',
    heading: 'Happy Anniversary',
    message: getOccasion('anniversary').messages[1],
  },
  {
    id: 'friendship',
    tab: 'Friendship',
    label: 'A note for your person',
    occasion: 'friendship',
    template: 'cute-playful',
    name: 'Zoya',
    heading: 'To My Favourite Human',
    message: getOccasion('friendship').messages[2],
  },
  {
    id: 'thank-you',
    tab: 'Thank you',
    label: 'A little gratitude',
    occasion: 'thank-you',
    template: 'paper-card',
    name: 'Nani',
    heading: 'Thank You',
    message: getOccasion('thank-you').messages[3],
  },
]

export default function SampleWishes() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const { toast } = useToast()
  const sample = SAMPLES[active]
  const template = getTemplate(sample.template)

  useEffect(() => {
    if (paused || reduced) return undefined
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % SAMPLES.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [paused, reduced])

  const handleCopy = async () => {
    const ok = await copyText(sample.message)
    toast(ok ? 'Message copied. Make it yours.' : 'Couldn’t copy the message.', ok ? 'success' : 'error')
  }

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-cream sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-coral/15 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute inset-0 bg-grain opacity-[0.06]" />
      </div>

      <div className="container-page relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="eyebrow text-gold-light">
            <span className="h-px w-6 bg-gold/60" />
            Words worth borrowing
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-cream sm:text-[2.7rem] sm:leading-[1.1]">
            When you can’t find the words,
            <span className="block font-display italic text-[#F0D9AE]">start with one of ours.</span>
          </h2>
          <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-cream/65">
            Real words, written for real feelings. Borrow one, change a line, or use it as a
            jumping-off point. It’s still your voice.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Example wishes"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {SAMPLES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                onClick={() => setActive(index)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  index === active
                    ? 'border-gold/50 bg-gold/15 text-[#F0D9AE]'
                    : 'border-cream/15 text-cream/55 hover:border-cream/30 hover:text-cream/85'
                }`}
              >
                {item.tab}
              </button>
            ))}
          </div>

          <Link
            to="/create"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cream/75 transition hover:text-cream"
          >
            Or write your own from scratch
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-coral/20 to-gold/10 blur-2xl" />
          <div className="relative rounded-[2rem] border border-cream/10 bg-cream/[0.045] p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:p-9">
            <Quote className="h-8 w-8 text-gold/50" aria-hidden="true" />

            <AnimatePresence mode="wait">
              <motion.div
                key={sample.id}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduced ? 0.01 : 0.35 }}
              >
                <blockquote>
                  <p className="mt-2 font-display text-[1.45rem] italic leading-[1.5] text-cream/95 sm:text-[1.75rem]">
                    “{sample.message}”
                  </p>
                  <footer className="mt-7 flex items-center gap-3">
                    <div className="w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-cream/15">
                      <TemplateThumb template={template} name={sample.name} heading={sample.heading} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-cream">{sample.name}</p>
                      <p className="text-[0.7rem] uppercase tracking-[0.16em] text-cream/45">
                        {sample.label} · {template.name}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-cream/10 pt-5">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-xs font-semibold text-cream/80 transition hover:border-cream/40 hover:text-cream"
              >
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                Copy message
              </button>
              <Link
                to={`/create?occasion=${sample.occasion}&template=${sample.template}`}
                className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-xs font-bold text-ink transition hover:-translate-y-0.5 hover:bg-white"
              >
                Use this wish
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <span className="ml-auto hidden text-[0.65rem] uppercase tracking-[0.16em] text-cream/30 sm:block">
                Sample · yours in two minutes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
