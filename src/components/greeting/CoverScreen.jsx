import { useEffect, useRef } from 'react'
import { ArrowUpRight, Heart } from 'lucide-react'
import { getTemplate } from '../../lib/templates.js'
import { getOccasion } from '../../lib/occasions.js'
import { HEART_BITS, TWINKLE_BITS, wishCopy } from '../../templates/parts.jsx'

function Envelope({ accent, occasion }) {
  return (
    <div className="relative mx-auto w-[clamp(9.5rem,44cqw,15rem)] animate-float-slow">
      <span
        aria-hidden="true"
        className="absolute inset-x-[12%] -bottom-3 h-4 rounded-full bg-black/25 blur-md"
      />
      <div
        className="relative aspect-[5/3.35] overflow-hidden rounded-[0.7rem]"
        style={{
          background: 'linear-gradient(155deg, #FFFDF8 0%, #F7EEDD 55%, #EFE1C9 100%)',
          boxShadow: '0 22px 50px -18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[62%]"
          style={{
            background: 'linear-gradient(170deg, #FAF3E5, #EADCC2)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            borderBottom: '1px solid rgba(90,70,40,0.1)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[52%]"
          style={{
            background: 'linear-gradient(to right, rgba(120,90,50,0.09), transparent 80%)',
            clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-[52%]"
          style={{
            background: 'linear-gradient(to left, rgba(120,90,50,0.09), transparent 80%)',
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          }}
        />
        <span
          className="absolute left-1/2 top-[52%] grid h-[27%] w-[17%] -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${accent}, ${accent}cc 70%)`,
            boxShadow: '0 7px 16px -4px rgba(0,0,0,0.45), 0 0 0 2px rgba(255,250,240,0.55)',
          }}
        >
          {occasion ? (
            <span className="absolute inset-[9%] overflow-hidden rounded-full">
              <img
                src={occasion.image}
                alt=""
                className="h-full w-full object-cover"
                loading="eager"
              />
            </span>
          ) : (
            <Heart className="h-[48%] w-[48%] text-[#FFF6EC]" fill="currentColor" strokeWidth={1.2} aria-hidden="true" />
          )}
        </span>
      </div>
    </div>
  )
}

/** The "opening the surprise" screen, shown before the greeting is revealed. */
export default function CoverScreen({ wish, onOpen }) {
  const copy = wishCopy(wish)
  const template = getTemplate(wish.template)
  const cover = template.cover
  const occasion = getOccasion(wish.occasion)
  const openRef = useRef(null)

  useEffect(() => {
    const timer = window.setTimeout(() => openRef.current?.focus({ preventScroll: true }), 500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div
      className="wish-canvas relative flex h-full w-full flex-col overflow-hidden"
      style={{ background: cover.bg, color: cover.ink }}
    >
      {occasion && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute inset-0 opacity-[0.5]">
            <img
              src={occasion.image}
              alt=""
              className="h-full w-full scale-105 object-cover blur-[1.5px]"
              loading="eager"
            />
          </span>
          <span className="absolute inset-0" style={{ background: cover.bg, opacity: 0.74 }} />
          <span
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(90% 65% at 50% 0%, rgba(255,255,255,0.22), transparent 62%), radial-gradient(80% 60% at 50% 110%, rgba(0,0,0,0.24), transparent 70%)',
            }}
          />
        </div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(90% 65% at 50% 0%, rgba(255,255,255,0.16), transparent 62%), radial-gradient(80% 60% at 50% 110%, rgba(0,0,0,0.22), transparent 70%)`,
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {HEART_BITS.slice(0, 5).map((heart) => (
          <Heart
            key={heart.id}
            className="fx fx-heavy absolute animate-heart-rise"
            style={{
              left: `${heart.left}%`,
              bottom: `${heart.bottom}%`,
              width: heart.size * 0.9,
              height: heart.size * 0.9,
              color: cover.accent,
              opacity: heart.opacity * 0.7,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
            fill="currentColor"
            strokeWidth={1}
            aria-hidden="true"
          />
        ))}
        {TWINKLE_BITS.slice(0, 14).map((star) => (
          <span
            key={star.id}
            className="fx absolute animate-twinkle rounded-full"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              background: cover.accent,
              opacity: star.opacity * 0.55,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-full flex-col items-center justify-center px-[10%] py-[12%] text-center">
        {occasion && (
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-2 py-1 pr-3.5 text-[0.56rem] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm"
            style={{
              borderColor: `${cover.accent}44`,
              background: 'rgba(255,255,255,0.16)',
              color: cover.muted,
            }}
          >
            <span className="h-7 w-7 overflow-hidden rounded-full ring-1 ring-white/40">
              <img src={occasion.image} alt="" className="h-full w-full object-cover" loading="eager" />
            </span>
            {occasion.label}
          </span>
        )}

        <span
          className="wish-label uppercase"
          style={{ color: cover.muted, letterSpacing: '0.32em' }}
        >
          A little something for
        </span>

        <h1 className="wish-name-sm mt-3 font-display font-medium" style={{ color: cover.ink }}>
          {copy.recipient}
        </h1>

        <p className="mt-2 text-[0.8em] font-medium" style={{ color: cover.muted }}>
          {copy.sender ? `from ${copy.sender}` : 'sent with love'}
        </p>

        <div className="mt-8">
          <Envelope accent={cover.accent} occasion={occasion} />
        </div>

        <button
          ref={openRef}
          type="button"
          onClick={onOpen}
          className="group mt-9 inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[0.92rem] font-semibold shadow-[0_16px_34px_-16px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0"
          style={{ background: cover.button, color: cover.buttonText }}
        >
          Open Your Surprise
          <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" aria-hidden="true" />
        </button>

      </div>

      <a
        href="#wish-details"
        className="sr-only focus:not-sr-only focus:absolute focus:bottom-4 focus:left-1/2 focus:z-30 focus:-translate-x-1/2 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-xs"
      >
        Skip intro
        <ArrowUpRight className="ml-1 inline h-3 w-3" aria-hidden="true" />
      </a>
    </div>
  )
}
