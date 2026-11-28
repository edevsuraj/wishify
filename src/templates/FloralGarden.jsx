import { BotanicalCorner, DUST_BITS, Message, SenderLine, SparkleIcon, wishCopy } from './parts.jsx'

/** 3 — Sage, blush botanicals and a letterpress feel. */
export default function FloralGarden({ wish }) {
  const { occasionLabel, heading, recipient, sender, relationship, message } = wishCopy(wish)

  return (
    <div className="wish-canvas relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#F3F6EA] text-[#2B3B2D]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 20% 10%, #FBFDF4 0%, #EFF4E4 50%, #E1EBD8 100%)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-1/4 h-64 w-64 rounded-full bg-[#E9BCC5]/30 blur-3xl" />
        <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-[#A9C6AE]/30 blur-3xl" />
        {DUST_BITS.slice(0, 10).map((dust) => (
          <span
            key={dust.id}
            className="fx absolute rounded-full bg-[#8FA98F]"
            style={{
              top: `${dust.top}%`,
              left: `${dust.left}%`,
              width: dust.size * 1.4,
              height: dust.size * 1.4,
              opacity: dust.opacity * 0.4,
              animation: `drift ${dust.duration}s ease-in-out ${dust.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <BotanicalCorner className="pointer-events-none absolute left-[-2%] top-[-1%] w-[30%] text-[#6E8A70] opacity-70" />
      <BotanicalCorner className="pointer-events-none absolute right-[-2%] top-[-1%] w-[30%] -scale-x-100 text-[#6E8A70] opacity-70" />
      <BotanicalCorner className="pointer-events-none absolute bottom-0 left-[-2%] w-[26%] -scale-y-100 text-[#8FA98F] opacity-60" />
      <BotanicalCorner className="pointer-events-none absolute bottom-0 right-[-2%] w-[26%] -scale-100 text-[#8FA98F] opacity-60" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[5.5%] rounded-[999px_999px_2rem_2rem] border border-[#557A5C]/15"
      />

      <div data-wish-content className="relative z-10 flex min-h-full flex-col items-center justify-center px-[13%] py-[15%] text-center">
        <div className="flex items-center gap-2 text-[#557A5C]">
          <SparkleIcon className="h-3 w-3" />
          <span className="wish-label font-medium uppercase tracking-[0.3em]">{occasionLabel}</span>
          <SparkleIcon className="h-3 w-3" />
        </div>

        <h2 className="wish-heading mt-6 font-display font-medium italic text-[#3C5340]">{heading}</h2>

        <p className="wish-label mt-7 uppercase tracking-[0.28em] text-[#7A8E76]">
          {relationship ? `dear ${relationship.toLowerCase()}` : 'a note for'}
        </p>
        <h1 className="wish-name-sm mt-2 font-display italic text-[#26382B]">{recipient}</h1>

        <svg viewBox="0 0 160 12" aria-hidden="true" className="mt-2 h-3 w-32 text-[#8FA98F]">
          <path d="M2 8c22-7 42 4 64-2 20-6 48 5 92-2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".7" />
        </svg>

        <Message text={message} className="mt-6 max-w-[33ch] text-[#425741]" />

        <div className="mt-8 flex items-end gap-2 text-[#7E9A83]">
          <span className="h-px w-10 bg-current opacity-30" />
          <svg viewBox="0 0 44 34" aria-hidden="true" className="h-7 w-9" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M22 31V13M22 18c-5-1-8-4-8-8 5 0 8 3 8 8Zm0 4c5-1 8-4 8-8-5 0-8 3-8 8Z" />
            <circle cx="22" cy="8" r="3" />
            <circle cx="31" cy="11" r="2.4" opacity=".6" />
            <circle cx="13" cy="11" r="2.4" opacity=".6" />
          </svg>
          <span className="h-px w-10 bg-current opacity-30" />
        </div>

        <SenderLine className="mt-5 font-display italic text-[#4C654E]" name={sender} prefix="With warmth," />

        {relationship && (
          <p className="wish-label mt-4 uppercase text-[#7A8E76]/70">To my {relationship}</p>
        )}
      </div>
    </div>
  )
}
