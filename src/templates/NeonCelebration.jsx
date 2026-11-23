import { Message, SenderLine, SparkleIcon, wishCopy } from './parts.jsx'

/** 10 — After-dark electric glow and chorus-of-lights energy. */
export default function NeonCelebration({ wish }) {
  const { occasionLabel, emoji, heading, recipient, sender, relationship, message } = wishCopy(wish)

  return (
    <div className="wish-canvas relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#09050F] text-[#F4ECFF]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 20% 0%, #2A0B3D 0%, transparent 60%), radial-gradient(70% 60% at 90% 25%, #0B3037 0%, transparent 62%), #09050F',
        }}
      />

      {/* perspective grid floor */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] overflow-hidden opacity-50" style={{ perspective: '340px' }}>
        <div
          className="absolute inset-x-[-40%] top-0 h-[140%] origin-top"
          style={{
            transform: 'rotateX(64deg)',
            backgroundImage:
              'linear-gradient(rgba(108,240,225,0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(244,93,156,0.28) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85), transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85), transparent 85%)',
          }}
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="fx absolute -left-12 top-10 h-48 w-48 animate-pulse-glow rounded-full bg-[#F45D9C]/25 blur-3xl" />
        <div
          className="fx absolute -right-10 bottom-24 h-56 w-56 animate-pulse-glow rounded-full bg-[#6CF0E1]/20 blur-3xl"
          style={{ animationDelay: '-2s' }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.4) 0 1px, transparent 1px 4px)',
          }}
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-[3.5%] rounded-[1.6rem] border border-[#F45D9C]/35" style={{ boxShadow: 'inset 0 0 50px rgba(244,93,156,0.14), 0 0 32px rgba(108,240,225,0.08)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-[4.8%] rounded-[1.2rem] border border-[#6CF0E1]/15" />

      <div className="relative z-10 flex min-h-full flex-col items-center justify-center px-[11%] py-[14%] text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border border-[#6CF0E1]/50 px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#8DF7EA]"
          style={{ boxShadow: '0 0 22px rgba(108,240,225,0.25), inset 0 0 18px rgba(108,240,225,0.12)' }}
        >
          {emoji} {occasionLabel} {emoji}
        </span>

        <h2
          className="mt-7 font-sans text-[clamp(1.35rem,5.5cqw,2.1rem)] font-bold uppercase tracking-[0.14em]"
          style={{
            color: '#FDEFF9',
            textShadow: '0 0 14px rgba(244,93,156,0.65), 0 0 34px rgba(244,93,156,0.3)',
          }}
        >
          {heading}
        </h2>

        <h1
          className="wish-name mt-3 font-sans font-extrabold uppercase tracking-[-0.02em]"
          style={{
            color: '#FFF6FD',
            textShadow:
              '0 0 16px rgba(244,93,156,0.85), 0 0 48px rgba(244,93,156,0.45), 0 0 90px rgba(108,240,225,0.2)',
          }}
        >
          {recipient}
        </h1>

        <div className="mt-6 flex items-center gap-2 text-[#6CF0E1]">
          <SparkleIcon className="h-3 w-3" />
          <span className="h-px w-24 bg-gradient-to-r from-transparent via-current to-transparent opacity-70" />
          <SparkleIcon className="h-3 w-3" />
        </div>

        <Message text={message} className="mt-6 max-w-[33ch] text-[#D9CDEA]/90" />

        <div className="mt-8 flex flex-col items-center gap-3">
          {sender && (
            <span
              className="inline-flex items-center gap-2 rounded-full border border-[#F45D9C]/60 bg-[#F45D9C]/10 px-5 py-2 text-[0.8rem] font-semibold text-[#FFE4F1]"
              style={{ boxShadow: '0 0 20px rgba(244,93,156,0.22)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#6CF0E1]" style={{ boxShadow: '0 0 8px #6CF0E1' }} />
              From {sender}
            </span>
          )}
          {relationship && (
            <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[#A18BBF]">{relationship}</span>
          )}
        </div>

        <p className="mt-7 text-[0.58rem] uppercase tracking-[0.4em] text-[#6CF0E1]/50">★ make some noise ★</p>
      </div>
    </div>
  )
}
