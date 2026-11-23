import { Message, NIGHT_STARS, SenderLine, SparkleIcon, wishCopy } from './parts.jsx'

/** 7 — Midnight blue, a paper moon and one shooting star. */
export default function MagicalNightSky({ wish }) {
  const { occasionLabel, heading, recipient, sender, relationship, message } = wishCopy(wish)

  return (
    <div className="wish-canvas relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#0A1026] text-[#EEF1FF]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(100% 80% at 70% 0%, #25315F 0%, #141C3D 45%, #080D1F 100%)',
        }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {NIGHT_STARS.map((star) => (
          <span
            key={star.id}
            className="fx absolute animate-twinkle rounded-full bg-[#FFF6D8]"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              boxShadow: star.size > 2 ? '0 0 6px rgba(255,246,216,0.7)' : undefined,
            }}
          />
        ))}

        {/* moon */}
        <div className="absolute right-[8%] top-[8%]">
          <div className="fx h-[13cqw] w-[13cqw] min-h-[3.4rem] min-w-[3.4rem] animate-pulse-glow rounded-full bg-[#F4EBC7]/25 blur-xl" />
          <div className="absolute inset-0 rounded-full bg-[#F7EFCB] shadow-[0_0_40px_10px_rgba(247,239,203,0.25)]">
            <span className="absolute left-[26%] top-[30%] h-[14%] w-[14%] rounded-full bg-[#DFD3A6]" />
            <span className="absolute left-[56%] top-[56%] h-[18%] w-[18%] rounded-full bg-[#E6DAB0]" />
            <span className="absolute left-[60%] top-[22%] h-[9%] w-[9%] rounded-full bg-[#E9DFB8]" />
          </div>
        </div>

        {/* shooting star */}
        <span
          className="fx absolute left-[6%] top-[10%] h-px w-[38%] animate-shoot bg-gradient-to-r from-transparent via-[#FFF3C4] to-transparent"
          style={{ animationDelay: '1.6s' }}
        />

        {/* constellation */}
        <svg
          viewBox="0 0 120 80"
          aria-hidden="true"
          className="absolute left-[10%] top-[30%] w-[22%] text-[#9AA7D8]"
          fill="none"
          stroke="currentColor"
          strokeWidth=".6"
          opacity=".65"
        >
          <path d="M8 66 30 48 52 54 70 30 96 20 112 38" />
          <circle cx="8" cy="66" r="1.6" fill="currentColor" />
          <circle cx="30" cy="48" r="2" fill="currentColor" />
          <circle cx="52" cy="54" r="1.4" fill="currentColor" />
          <circle cx="70" cy="30" r="2.2" fill="currentColor" />
          <circle cx="96" cy="20" r="1.4" fill="currentColor" />
          <circle cx="112" cy="38" r="1.6" fill="currentColor" />
        </svg>
      </div>

      {/* hills */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] w-full text-[#060A18]"
      >
        <path d="M0 220V150c60-40 130-46 200-16 70 30 140 28 205-6 65-34 130-38 195-8 60 28 130 30 200-2v102Z" fill="currentColor" />
        <path d="M0 220v-38c80-30 160-24 235 6 80 32 155 26 230-10 70-34 150-30 215 4 50 26 90 30 120 22v16Z" fill="#0B1228" />
      </svg>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060A18] to-transparent" />

      <div className="relative z-10 flex min-h-full flex-col items-center justify-center px-[11%] py-[15%] text-center">
        <div className="flex items-center gap-2 text-[#D8C98A]/90">
          <SparkleIcon className="h-3 w-3" />
          <span className="wish-label uppercase tracking-[0.32em]">{occasionLabel}</span>
          <SparkleIcon className="h-3 w-3" />
        </div>

        <p className="wish-label mt-7 uppercase tracking-[0.3em] text-[#9AA7D8]/80">Under the same sky</p>

        <h1
          className="wish-name mt-3 font-display text-[#F4EDD6]"
          style={{ textShadow: '0 0 40px rgba(216,201,138,0.35), 0 2px 20px rgba(0,0,0,0.4)' }}
        >
          {recipient}
        </h1>

        <h2 className="wish-heading mt-3 font-display italic text-[#D8C98A]">{heading}</h2>

        <div className="mt-7 flex items-center gap-3 text-[#D8C98A]">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-current opacity-60" />
          <span className="text-[0.8rem]">✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-current opacity-60" />
        </div>

        <Message text={message} className="mt-6 max-w-[33ch] text-[#DDE3F8]/90" />

        <SenderLine
          className="mt-8 text-[#B9C4EA]"
          name={sender}
          prefix="Dreaming of you,"
        />

        {relationship && (
          <p className="wish-label mt-4 uppercase tracking-[0.24em] text-[#9AA7D8]/60">
            Always yours, {relationship.toLowerCase()}
          </p>
        )}
      </div>
    </div>
  )
}
