import { DUST_BITS, Message, SenderLine, wishCopy } from './parts.jsx'

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

/** 6 — A keepsake: sepia warmth, film grain, gold frame. */
export default function GoldenMemories({ wish }) {
  const { occasionLabel, heading, recipient, sender, relationship, message } = wishCopy(wish)
  const initials = getInitials(recipient)

  return (
    <div className="wish-canvas grain-overlay relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#2F2114] text-[#F8EBCD]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(100% 80% at 50% 10%, #6A4C2F 0%, #45301D 42%, #241A10 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: 'inset 0 0 140px 50px rgba(15,10,5,0.6)' }}
      />

      {/* film sprocket strips */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[4.5%] bg-[#160F08]/50">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="absolute left-1/2 h-[2.4%] w-[42%] -translate-x-1/2 rounded-[2px] bg-[#D8B47A]/25"
            style={{ top: `${3 + index * 8}%` }}
          />
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[4.5%] bg-[#160F08]/50">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="absolute left-1/2 h-[2.4%] w-[42%] -translate-x-1/2 rounded-[2px] bg-[#D8B47A]/25"
            style={{ top: `${3 + index * 8}%` }}
          />
        ))}
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="fx absolute left-1/2 top-[-10%] h-72 w-72 -translate-x-1/2 animate-pulse-glow rounded-full bg-[#E1B873]/25 blur-3xl" />
        {DUST_BITS.map((dust) => (
          <span
            key={dust.id}
            className="fx absolute rounded-full bg-[#E7C48C]"
            style={{
              top: `${dust.top}%`,
              left: `${dust.left}%`,
              width: dust.size,
              height: dust.size,
              opacity: dust.opacity * 0.55,
              animation: `drift ${dust.duration}s ease-in-out ${dust.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div data-wish-content className="relative z-10 flex min-h-full flex-col items-center justify-center px-[13%] py-[13%] text-center">
        <p className="wish-label uppercase tracking-[0.32em] text-[#D8B47A]/80">A keepsake for</p>

        <div className="relative mt-5">
          <div className="flex h-[18cqw] w-[18cqw] min-h-[4.5rem] min-w-[4.5rem] items-center justify-center rounded-full border border-[#D8B47A]/50 bg-[#3B2A1A]/60 shadow-[inset_0_0_30px_rgba(216,180,122,0.15)]">
            <div className="flex h-[84%] w-[84%] items-center justify-center rounded-full border border-[#D8B47A]/25">
              <span className="font-display text-[clamp(1.6rem,6.5cqw,2.8rem)] text-[#EBCF9B]">{initials || '♥'}</span>
            </div>
          </div>
          <span className="absolute -right-1 -top-1 h-2 w-2 rotate-45 bg-[#D8B47A]/70" />
          <span className="absolute -bottom-1 -left-1 h-1.5 w-1.5 rotate-45 bg-[#D8B47A]/50" />
        </div>

        <h1 className="wish-name-sm mt-5 font-display font-medium text-[#F8EBCD]">{recipient}</h1>
        <h2 className="wish-heading mt-2 font-display italic text-[#D8B47A]">{heading}</h2>

        <div className="mt-7 flex w-full max-w-[26rem] items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D8B47A]/50" />
          <span className="text-[#D8B47A]/80">✦</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D8B47A]/50" />
        </div>

        <Message
          text={message}
          className="mt-6 max-w-[34ch] font-display leading-[1.8] text-[#E8D7B8]/90"
        />

        <div className="mt-8 flex flex-col items-center gap-1">
          <span className="wish-label uppercase tracking-[0.28em] text-[#D8B47A]/60">kept fondly by</span>
          {sender && (
            <span className="font-script text-[#F3DEB9]" style={{ fontSize: 'clamp(1.7rem,6.2cqw,2.4rem)' }}>
              {sender}
            </span>
          )}
          {relationship && (
            <span className="wish-label mt-1 uppercase text-[#CBB28A]/60">{relationship}</span>
          )}
        </div>

        <p className="wish-label mt-6 uppercase tracking-[0.24em] text-[#D8B47A]/50">A memory worth keeping</p>
      </div>
    </div>
  )
}
