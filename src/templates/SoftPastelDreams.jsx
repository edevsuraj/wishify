import { Message, SenderLine, SparkleIcon, TWINKLE_BITS, wishCopy } from './parts.jsx'

/** 11 — Blush clouds, lilac light, a whisper of a wish. */
export default function SoftPastelDreams({ wish }) {
  const { occasionLabel, heading, recipient, sender, relationship, message } = wishCopy(wish)

  return (
    <div className="wish-canvas relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#FBF1F6] text-[#3E3044]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(155deg, #FDF2F6 0%, #F5EAF8 42%, #EAF3F0 100%)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-16 h-64 w-64 rounded-full bg-[#F6C6CC]/55 blur-3xl" />
        <div className="absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-[#CDBCEC]/45 blur-3xl" />
        <div className="absolute bottom-[-16%] left-1/3 h-64 w-64 rounded-full bg-[#BFE0D6]/50 blur-3xl" />

        {/* clouds */}
        <svg viewBox="0 0 140 60" aria-hidden="true" className="absolute left-[6%] top-[8%] w-[28%] text-white/70" fill="currentColor">
          <path d="M26 50c-12 0-20-8-20-18s9-18 20-17c3-8 10-13 19-13 11 0 19 7 21 17 3-2 6-3 10-3 9 0 16 7 16 16s-7 17-16 17H26Z" />
        </svg>
        <svg viewBox="0 0 140 60" aria-hidden="true" className="absolute bottom-[10%] right-[4%] w-[22%] text-white/45" fill="currentColor">
          <path d="M26 50c-12 0-20-8-20-18s9-18 20-17c3-8 10-13 19-13 11 0 19 7 21 17 3-2 6-3 10-3 9 0 16 7 16 16s-7 17-16 17H26Z" />
        </svg>

        {TWINKLE_BITS.slice(0, 10).map((star) => (
          <span
            key={star.id}
            className="fx absolute animate-float rounded-full border border-white/70 bg-white/40"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: 6 + star.size * 3,
              height: 6 + star.size * 3,
              animationDelay: `${star.delay * 0.7}s`,
              animationDuration: `${8 + star.duration}s`,
            }}
          />
        ))}
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-[4.5%] rounded-[2rem] border border-white/60" />

      <div data-wish-content className="relative z-10 flex min-h-full flex-col items-center justify-center px-[12%] py-[14%] text-center">
        <span className="flex items-center gap-2 text-[#8C6FB0]">
          <SparkleIcon className="h-3.5 w-3.5" />
          <span className="wish-label uppercase tracking-[0.3em]">a gentle {occasionLabel.toLowerCase()} wish</span>
          <SparkleIcon className="h-3.5 w-3.5" />
        </span>

        <h2 className="wish-heading mt-6 font-display italic text-[#6C5578]">{heading}</h2>

        <h1 className="wish-name mt-2 font-display font-medium">
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(100deg, #6C5578 0%, #A97C9E 48%, #7E9A83 100%)' }}
          >
            {recipient}
          </span>
        </h1>

        <div className="mt-5 flex items-center gap-2 text-[#B79BD8]">
          <span className="h-1 w-1 rounded-full bg-current" />
          <span className="h-1 w-1 rounded-full bg-current opacity-60" />
          <span className="h-1 w-1 rounded-full bg-current opacity-30" />
        </div>

        <Message text={message} className="mt-6 max-w-[32ch] text-[#5A4A60]" />

        <div className="mt-8 h-px w-14 bg-[#B79BD8]/50" />
        <SenderLine className="mt-4 font-display italic text-[#6C5578]" name={sender} prefix="Softly," />

        {relationship && (
          <span className="mt-5 rounded-full bg-white/60 px-4 py-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-[#8A7792] ring-1 ring-white/70">
            for my {relationship.toLowerCase()}
          </span>
        )}
      </div>
    </div>
  )
}
