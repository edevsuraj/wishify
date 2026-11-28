import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Link2, ShieldCheck, Heart, Sparkles, MousePointerClick } from 'lucide-react'
import StarBorder from '../react-bits/StarBorder.jsx'
import GradientText from '../react-bits/GradientText.jsx'
import ShinyText from '../react-bits/ShinyText.jsx'
import Aurora from '../react-bits/Aurora.jsx'
import Particles from '../react-bits/Particles.jsx'
import Spotlight from '../react-bits/Spotlight.jsx'
import ClickSpark from '../react-bits/ClickSpark.jsx'
import CountUp from '../react-bits/CountUp.jsx'
import TemplateThumb from '../templates/TemplateThumb.jsx'
import { getTemplate } from '../../lib/templates.js'
import { OCCASION_MAP } from '../../lib/occasions.js'

const QUICK_OCCASIONS = ['birthday', 'anniversary', 'love', 'diwali']

function HeartMark() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="ml-1 inline-block h-[0.74em] w-[0.74em] -translate-y-[0.04em] align-baseline"
      role="img"
      aria-label="heart"
    >
      <defs>
        <linearGradient id="hero-heart" x1="10" y1="10" x2="90" y2="90">
          <stop offset="0" stopColor="#F7819A" />
          <stop offset="0.55" stopColor="#E8607A" />
          <stop offset="1" stopColor="#B73A64" />
        </linearGradient>
      </defs>
      <path
        d="M50 86C28 68 12 54 12 36c0-12 9-21 21-21 8 0 14 4 17 10 3-6 9-10 17-10 12 0 21 9 21 21 0 18-16 32-38 50Z"
        fill="url(#hero-heart)"
      />
      <path
        d="M33 27c-6 0-10 4-10 10 0 3 1 6 3 9 2-11 8-16 14-19-2-2-4-3-7-3Z"
        fill="#FFF3D6"
        opacity="0.4"
      />
    </svg>
  )
}

function StackCard({ templateId, className = '', style, name, heading, delay = 0 }) {
  const template = getTemplate(templateId)
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`absolute ${className}`}
      style={style}
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="animate-float-slow" style={{ animationDelay: `${delay * -3}s` }}>
        <Link
          to={`/create?template=${template.id}`}
          aria-label={`Preview the ${template.name} design`}
          className="group relative block overflow-hidden rounded-2xl border border-white/70 bg-white shadow-lift ring-1 ring-ink/[0.06] transition-transform duration-500 hover:-translate-y-1 hover:rotate-0"
        >
          <TemplateThumb template={template} name={name} heading={heading} />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/85 to-transparent px-4 pb-3 pt-10 text-left text-[0.7rem] font-semibold text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Open this design
          </span>
        </Link>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Aurora />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grain opacity-[0.035]" />
      <Particles className="absolute inset-0 h-full w-full opacity-60" quantity={34} speed={0.22} />
      <Spotlight className="relative" color="rgba(255,255,255,0.5)" size={700}>
        <div className="container-page relative pb-16 pt-10 sm:pt-16 lg:pb-24 lg:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-ink/[0.08] bg-white/70 px-3.5 py-1.5 text-[0.72rem] font-semibold text-cocoa shadow-soft backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
                <ShinyText>Free forever · No sign-up · One lovely link</ShinyText>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.06 }}
                className="mt-6 font-elegant text-[2.65rem] font-medium leading-[1.03] tracking-[-0.01em] text-ink sm:text-6xl lg:text-[4.25rem]"
              >
                Make Someone’s Day
                <span className="relative mt-1 block">
                  <GradientText speed={9}>Extra Special</GradientText>{' '}
                  <HeartMark />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 340 18"
                    className="absolute -bottom-3 left-0 h-4 w-[72%] text-coral/45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <path d="M4 12c56-8 108 5 166-2 52-6 104 3 166-4" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.14 }}
                className="mt-7 max-w-[34rem] text-[1.02rem] leading-relaxed text-cocoa sm:text-[1.12rem]"
              >
                Create beautiful personalized wishes and share a little happiness with someone you
                love. Pick a design, write from the heart, send one link.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
              >
                <ClickSpark className="w-full sm:w-auto">
                  <StarBorder innerClassName="bg-ink px-7 py-3.5 text-[0.98rem] font-semibold text-cream transition hover:bg-[#332720]">
                    <Link to="/create" className="inline-flex items-center gap-2">
                      Create a Wish
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </StarBorder>
                </ClickSpark>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.26 }}
                className="mt-7"
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-taupe">
                  Or start with a moment
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_OCCASIONS.map((id) => {
                    const occasion = OCCASION_MAP[id]
                    if (!occasion) return null
                    return (
                      <Link
                        key={id}
                        to={`/create?occasion=${id}`}
                        className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 py-1 pl-1 pr-3.5 text-[0.78rem] font-medium text-cocoa shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-coral/30 hover:bg-white hover:text-ink"
                      >
                        <span className="h-7 w-7 overflow-hidden rounded-full ring-1 ring-black/5">
                          <img
                            src={occasion.image}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </span>
                        {occasion.label}
                      </Link>
                    )
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.36 }}
                className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] font-medium text-taupe"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Link2 className="h-3.5 w-3.5 text-sage" aria-hidden="true" />
                  One shareable link
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-sage" aria-hidden="true" />
                  Nothing stored on a server
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  <CountUp to={12} /> hand-crafted designs
                </span>
              </motion.div>
            </div>

            <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[78%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-coral/25 via-[#F2B45C]/20 to-[#7C5CE0]/15 blur-3xl"
              />
              <div className="relative h-[25rem] sm:h-[30rem] lg:h-[33rem]">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-[7%] bottom-[3%] top-[1%] overflow-hidden rounded-[2.8rem] border border-white/60 shadow-lift"
                >
                  <img
                    src="/images/hero/celebration.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-br from-coral/25 via-ink/30 to-plum/45 mix-blend-multiply" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                </div>

                <StackCard
                  templateId="elegant-celebration"
                  className="left-0 top-[9%] z-10 w-[53%] -rotate-[7deg]"
                  name="Aanya"
                  heading="Happy Birthday"
                  delay={0.18}
                />
                <StackCard
                  templateId="romantic-hearts"
                  className="right-0 top-[2%] z-10 w-[50%] rotate-[7deg]"
                  name="Meera"
                  heading="Happy Anniversary"
                  delay={0.3}
                />
                <StackCard
                  templateId="magical-night-sky"
                  className="bottom-0 left-1/2 z-20 w-[62%] -translate-x-1/2 -rotate-[1.5deg]"
                  name="Kabir"
                  heading="Good Night"
                  delay={0.42}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -left-2 bottom-[26%] z-30 hidden items-center gap-2 rounded-full border border-ink/[0.07] bg-white/90 px-3.5 py-2 text-[0.72rem] font-semibold text-cocoa shadow-lift backdrop-blur sm:inline-flex"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-coral/15 text-coral">
                    <Heart className="h-3 w-3" fill="currentColor" aria-hidden="true" />
                  </span>
                  A little happiness, sent
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute right-[-0.5rem] top-[16%] z-30 inline-flex items-center gap-1.5 rounded-full border border-ink/[0.07] bg-white/90 px-3 py-1.5 text-[0.7rem] font-semibold text-cocoa shadow-lift backdrop-blur"
                >
                  <MousePointerClick className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
                  Tap to open
                </motion.div>

                <motion.span
                  aria-hidden="true"
                  animate={{ y: [0, -7, 0], rotate: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="absolute right-[12%] bottom-[8%] z-30 text-gold"
                >
                  <Sparkles className="h-5 w-5" />
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </Spotlight>
    </section>
  )
}
