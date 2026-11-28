import { Message, SenderLine, SparkleIcon, wishCopy } from './parts.jsx'

/** 5 — Sticker shapes, chunky type and primary-colour joy. */
export default function CutePlayful({ wish }) {
  const { occasionLabel, emoji, heading, recipient, sender, relationship, message } = wishCopy(wish)

  return (
    <div className="wish-canvas relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#FFF2BF] text-[#3A2A12]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 50% 0%, #FFF9E2 0%, #FFF0B8 50%, #FFE39C 100%)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.35]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-[#FFB3A7]/50 blur-2xl" />
        <div className="absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-[#A6D8C4]/50 blur-2xl" />
        <span className="fx absolute left-[7%] top-[9%] h-10 w-10 animate-bob rounded-full border-[3px] border-[#3A2A12] bg-[#FFD166]" />
        <span
          className="fx absolute right-[8%] top-[14%] flex h-11 w-11 animate-bob items-center justify-center rounded-full border-[3px] border-[#3A2A12] bg-white text-lg"
          style={{ animationDelay: '-1.5s' }}
        >
          ✨
        </span>
        <span className="fx absolute bottom-[8%] left-[9%] animate-float text-2xl">👋</span>
      </div>

      <div data-wish-content className="relative z-10 flex min-h-full flex-col items-center justify-center px-[9%] py-[12%] text-center">
        <span className="inline-flex -rotate-3 items-center gap-2 rounded-full border-2 border-[#3A2A12] bg-white px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] shadow-[3px_3px_0_#3A2A12]">
          {emoji} {occasionLabel} {emoji}
        </span>

        <h2
          className="mt-7 font-sans text-[clamp(1.55rem,6.5cqw,2.5rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.01em]"
          style={{ textShadow: '3px 3px 0 rgba(58,42,18,0.12)' }}
        >
          {heading}
        </h2>

        <h1 className="wish-name relative mt-2 font-sans font-extrabold tracking-[-0.045em]">
          <span className="relative z-10">{recipient}</span>
          <span
            aria-hidden="true"
            className="absolute inset-x-[-3%] bottom-[6%] -z-0 h-[34%] -rotate-1 rounded-md bg-[#FFD166]"
          />
        </h1>

        <span aria-hidden="true" className="mt-4 text-[#E05A3F]">
          <svg viewBox="0 0 130 12" className="h-3 w-28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M3 8c14-7 26 3 40-2s27 5 44-2 27 3 40-1" />
          </svg>
        </span>

        <div className="relative mt-6 w-full max-w-[31rem] -rotate-[1.4deg] rounded-[1.6rem] border-2 border-[#3A2A12] bg-white px-[7%] py-[7%] shadow-[6px_7px_0_#3A2A12]">
          <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 rounded-sm bg-[#FFD166]/80 ring-1 ring-[#3A2A12]/10" />
          <Message text={message} className="font-medium leading-[1.65] text-[#4A361B]" />
        </div>

        <div className="mt-7 flex flex-col items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-[#3A2A12] bg-[#A6D8C4] px-4 py-1.5 text-[0.8rem] font-bold shadow-[3px_3px_0_#3A2A12]">
            <SparkleIcon className="h-3.5 w-3.5" />
            {sender ? `From ${sender}` : 'Made just for you'}
          </span>
          {relationship && (
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#7E6434]">
              your {relationship.toLowerCase()} thinks you’re the best
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
