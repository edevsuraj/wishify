import { HeartIcon, SparkleIcon, wishCopy } from './parts.jsx'

/** 9 — A handwritten card, washi tape and notebook paper. */
export default function PaperCard({ wish }) {
  const { heading, recipient, sender, relationship, message } = wishCopy(wish)

  return (
    <div className="wish-canvas grain-overlay relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#E5D6BD] text-[#3B2E22]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(100% 80% at 30% 0%, #F4E9D5 0%, #E9DBC3 55%, #DCC9AA 100%)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.18]" />

      <div data-wish-content className="relative z-10 flex min-h-full flex-col items-center justify-center px-[6%] py-[10%]">
        <div className="relative w-full max-w-[38rem] rotate-[-1.1deg]">
          {/* washi tape */}
          <span
            aria-hidden="true"
            className="absolute -left-3 -top-3 z-20 h-7 w-24 -rotate-6 bg-[#D9B79B]/85 shadow-sm backdrop-blur-[1px]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 6px, transparent 6px 12px)',
            }}
          />
          <span
            aria-hidden="true"
            className="absolute -right-3 -top-2 z-20 h-6 w-20 rotate-6 bg-[#C7D3BC]/85 shadow-sm"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 5px, transparent 5px 11px)',
            }}
          />

          <div className="relative overflow-hidden rounded-[3px] bg-[#FDF8EC] shadow-[0_18px_40px_-18px_rgba(59,46,34,0.6)] ring-1 ring-[#3B2E22]/10">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 paper-lines opacity-50" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[9%] w-px bg-[#D98A8A]/35" />

            <div className="relative px-[12%] py-[12%]">
              <div className="flex items-start justify-between">
                <p className="font-script text-[#8C5A3C]" style={{ fontSize: 'clamp(1.5rem,5.5cqw,2.1rem)' }}>
                  Dear {recipient},
                </p>
                <SparkleIcon className="mt-1 h-5 w-5 shrink-0 text-[#C99A3F]/70" />
              </div>

              <h2 className="mt-3 font-script text-[#B04560]" style={{ fontSize: 'clamp(1.45rem,5.2cqw,2rem)' }}>
                {heading}
              </h2>

              <p
                className="mt-4 whitespace-pre-line font-script text-[#3F3125]"
                style={{ fontSize: 'clamp(1.12rem,4.9cqw,1.7rem)', lineHeight: 1.5 }}
              >
                {message}
              </p>

              <div className="mt-7 flex items-end justify-between gap-4">
                <div className="flex items-center gap-2 text-[#B06A4A]">
                  <HeartIcon className="h-4 w-4" />
                  <span className="h-px w-12 bg-current opacity-40" />
                </div>
                <div className="text-right">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#8E7A66]">with love,</p>
                  <p className="font-script text-[#7A4A31]" style={{ fontSize: 'clamp(1.6rem,5.8cqw,2.2rem)' }}>
                    {sender || 'me'}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="font-script text-[#A08A76]" style={{ fontSize: '1rem' }}>
                  {relationship ? `your ${relationship.toLowerCase()}` : 'p.s. you matter'}
                </span>
                <svg viewBox="0 0 60 30" aria-hidden="true" className="h-6 w-12 text-[#B06A4A]/70" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                  <path d="M3 24c10-6 16 2 24-3s16 3 30-4" />
                  <path d="M40 6l2 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1Z" opacity=".6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 mt-6 text-[0.66rem] uppercase tracking-[0.28em] text-[#6B5844]/60">
          a little note, written by hand
        </p>
      </div>
    </div>
  )
}
