import { DUST_BITS, Message, wishCopy } from './parts.jsx'

/** 12 — Letterboxed, spotlighted, ends with your name in lights. */
export default function CinematicSurprise({ wish }) {
  const { occasionLabel, heading, recipient, sender, relationship, message } = wishCopy(wish)

  return (
    <div className="wish-canvas grain-overlay relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#08080A] text-[#F4EEE2]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 70% at 50% 10%, #231E26 0%, #111014 45%, #070708 100%)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-[-6%] h-[95%] w-[110%] -translate-x-1/2 opacity-80"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,242,205,0.16), rgba(255,242,205,0.02) 62%, transparent 85%)',
            clipPath: 'polygon(44% 0, 56% 0, 88% 100%, 12% 100%)',
            filter: 'blur(14px)',
          }}
        />
        <div className="fx absolute left-[18%] top-[20%] h-1 w-1 animate-twinkle rounded-full bg-[#F4EEE2]/70" />
        <div className="fx absolute right-[22%] top-[34%] h-0.5 w-0.5 animate-twinkle rounded-full bg-[#D8B26A]" style={{ animationDelay: '1.4s' }} />
        {DUST_BITS.slice(0, 12).map((dust) => (
          <span
            key={dust.id}
            className="fx absolute rounded-full bg-[#E9D9B4]"
            style={{
              top: `${dust.top}%`,
              left: `${dust.left}%`,
              width: dust.size * 0.6,
              height: dust.size * 0.6,
              opacity: dust.opacity * 0.4,
              animation: `drift ${dust.duration}s ease-in-out ${dust.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: 'inset 0 0 120px 30px rgba(0,0,0,0.85)' }}
      />

      {/* letterbox bars */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-[5.5%] items-center justify-between bg-black px-[5%] text-[0.42rem] uppercase tracking-[0.34em] text-white/35">
        <span>A short wish about you</span>
        <span>Wishify</span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[5.5%] items-center justify-between bg-black px-[5%] text-[0.42rem] uppercase tracking-[0.34em] text-white/35">
        <span>With love</span>
        <span>01:01</span>
      </div>

      <div data-wish-content className="relative z-10 flex min-h-full flex-col items-center justify-center px-[12%] py-[13%] text-center">
        <div className="flex items-center gap-3 text-[#D8B26A]">
          <span className="h-px w-8 bg-current opacity-50" />
          <span className="wish-label uppercase tracking-[0.34em]">Wishify presents</span>
          <span className="h-px w-8 bg-current opacity-50" />
        </div>

        <p className="wish-label mt-5 uppercase tracking-[0.3em] text-[#948B7B]">{occasionLabel}</p>
        <p className="wish-subheading mt-2 font-display italic text-[#C9BFAE]">a wish for</p>

        <h1
          className="wish-name mt-2 font-display font-medium text-[#F7F2E7]"
          style={{ textShadow: '0 10px 50px rgba(255,230,180,0.18)' }}
        >
          {recipient}
        </h1>

        <h2 className="wish-heading mt-3 font-display italic text-[#D8B26A]">{heading}</h2>

        <div className="mt-6 flex items-center gap-3 text-[#D8B26A]/70">
          <span className="h-px w-12 bg-current" />
          <span className="text-[0.6rem]">✦</span>
          <span className="h-px w-12 bg-current" />
        </div>

        <Message
          text={message}
          className="mt-6 max-w-[31ch] font-display leading-[1.85] text-[#D6CDBE]"
        />

        <div className="mt-9 flex w-full max-w-[20rem] flex-col items-center gap-2 border-t border-[#D8B26A]/20 pt-5">
          <span className="wish-label uppercase tracking-[0.32em] text-[#948B7B]">with love from</span>
          <span className="font-display text-[1.05em] italic text-[#EFE5D3]">{sender || 'someone who adores you'}</span>
          {relationship && (
            <span className="wish-label uppercase tracking-[0.24em] text-[#D8B26A]/60">{relationship}</span>
          )}
        </div>

        <p className="wish-label mt-6 uppercase tracking-[0.4em] text-[#948B7B]/60">The beginning</p>
      </div>
    </div>
  )
}
