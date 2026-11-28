import {
  Diamond,
  Flourish,
  Message,
  SenderLine,
  SparkleIcon,
  TWINKLE_BITS,
  wishCopy,
} from './parts.jsx'

/** 1 — Ivory stationery, gold foil rules, quiet ceremony. */
export default function ElegantCelebration({ wish }) {
  const { occasionLabel, emoji, heading, recipient, sender, relationship, message } = wishCopy(wish)

  return (
    <div className="wish-canvas relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#FBF5E8] text-[#3A2E1D]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% -10%, #FFFDF7 0%, #FBF4E4 46%, #F0E3CB 100%)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-[#E9C98B]/25 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[#E7B9A5]/20 blur-3xl" />
        {TWINKLE_BITS.slice(0, 16).map((star) => (
          <span
            key={star.id}
            className="fx absolute animate-twinkle rounded-full bg-[#A9822F]"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size * 0.9,
              height: star.size * 0.9,
              opacity: star.opacity * 0.4,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[3.4%] border border-[#B08D3F]/45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[4.9%] border border-[#B08D3F]/20"
      />
      <Flourish className="pointer-events-none absolute left-[3.1%] top-[3.1%] w-[16%] text-[#A9822F]" />
      <Flourish className="pointer-events-none absolute right-[3.1%] top-[3.1%] w-[16%] -scale-x-100 text-[#A9822F]" />
      <Flourish className="pointer-events-none absolute bottom-[3.1%] left-[3.1%] w-[16%] -scale-y-100 text-[#A9822F]" />
      <Flourish className="pointer-events-none absolute bottom-[3.1%] right-[3.1%] w-[16%] -scale-100 text-[#A9822F]" />

      <div data-wish-content className="relative z-10 flex min-h-full flex-col items-center justify-center px-[12%] py-[14%] text-center">
        <div className="flex items-center gap-2 text-[#A9822F]">
          <Diamond />
          <span className="wish-label font-medium uppercase">{occasionLabel}</span>
          <Diamond />
        </div>

        <p className="wish-small mt-6 font-display uppercase text-[#8B7446]">
          {relationship ? `For my ${relationship}` : 'A celebration for'}
        </p>

        <h1 className="wish-name mt-3 font-display font-semibold tracking-[-0.015em] text-[#332818]">
          {recipient}
        </h1>

        <div className="mt-6 flex w-full max-w-[17rem] items-center gap-3 text-[#B08D3F]">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#B08D3F]/60" />
          <SparkleIcon className="h-3.5 w-3.5" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#B08D3F]/60" />
        </div>

        <h2 className="wish-heading mt-5 font-display italic text-[#3A2E1D]">{heading}</h2>

        <Message
          text={message}
          className="mt-6 max-w-[34ch] font-display leading-[1.8] text-[#584831]"
        />

        <div className="mt-8 h-px w-10 bg-[#B08D3F]/50" />
        <SenderLine className="mt-4 font-display italic text-[#6B5533]" name={sender} />

        <p className="wish-label mt-5 uppercase text-[#A9822F]/80">
          {emoji} With love, always {emoji}
        </p>
      </div>
    </div>
  )
}
