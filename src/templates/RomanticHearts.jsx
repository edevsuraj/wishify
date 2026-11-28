import { HeartIcon, HEART_BITS, Message, wishCopy } from './parts.jsx'

/** 2 — Deep rose, floating hearts, handwritten script. */
export default function RomanticHearts({ wish }) {
  const { occasionLabel, heading, recipient, sender, relationship, message } = wishCopy(wish)

  return (
    <div className="wish-canvas relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#48152C] text-[#FFF1F3]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(110% 80% at 50% 0%, #7A2749 0%, #5A1B39 45%, #35101F 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: 'inset 0 0 120px 40px rgba(30, 5, 16, 0.55)' }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="fx absolute -left-16 top-16 h-56 w-56 animate-pulse-glow rounded-full bg-[#E8607A]/30 blur-3xl" />
        <div
          className="fx absolute -right-10 bottom-20 h-64 w-64 animate-pulse-glow rounded-full bg-[#B73A64]/30 blur-3xl"
          style={{ animationDelay: '-2.5s' }}
        />
        {HEART_BITS.map((heart) => (
          <HeartIcon
            key={heart.id}
            className="fx fx-heavy absolute animate-heart-rise text-[#F6A6B2]"
            style={{
              left: `${heart.left}%`,
              bottom: `${heart.bottom}%`,
              width: heart.size,
              height: heart.size,
              opacity: heart.opacity,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          />
        ))}
      </div>

      <div data-wish-content className="relative z-10 flex min-h-full flex-col items-center justify-center px-[11%] py-[14%] text-center">
        <div className="flex items-center gap-3 text-[#F6C6CC]/85">
          <span className="h-px w-8 bg-current opacity-40" />
          <HeartIcon className="h-3 w-3" />
          <span className="wish-label font-medium uppercase tracking-[0.3em]">{occasionLabel}</span>
          <HeartIcon className="h-3 w-3" />
          <span className="h-px w-8 bg-current opacity-40" />
        </div>

        {relationship && (
          <p className="wish-label mt-6 uppercase tracking-[0.28em] text-[#F0C4CE]/70">
            For my {relationship}
          </p>
        )}

        <h1
          className="mt-2 font-romantic text-[#FFE7EC]"
          style={{
            fontSize: 'clamp(3.4rem, 15cqw, 7rem)',
            lineHeight: 1.12,
            textShadow: '0 6px 30px rgba(255, 190, 205, 0.25)',
            overflowWrap: 'anywhere',
          }}
        >
          {recipient}
        </h1>

        <h2 className="wish-subheading mt-3 font-display italic text-[#F7D9DF]/90">{heading}</h2>

        <div className="mt-7 flex items-center gap-3 text-[#F6A6B2]">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-current opacity-60" />
          <HeartIcon className="fx h-4 w-4 animate-float" />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-current opacity-60" />
        </div>

        <Message
          text={message}
          className="mt-7 max-w-[32ch] text-[#FBE3E8]/90"
        />

        {sender && (
          <div className="mt-9 flex flex-col items-center gap-1">
            <span className="wish-label uppercase tracking-[0.24em] text-[#F0C4CE]/60">
              Forever yours,
            </span>
            <span className="font-romantic text-[#FFD9E1]" style={{ fontSize: 'clamp(1.9rem, 7cqw, 2.8rem)' }}>
              {sender}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
