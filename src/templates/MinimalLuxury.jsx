import { Diamond, Message, SparkleIcon, wishCopy } from './parts.jsx'

/** 4 — Charcoal, hairline gold and editorial whitespace. */
export default function MinimalLuxury({ wish }) {
  const { occasionLabel, heading, recipient, sender, relationship, message } = wishCopy(wish)

  return (
    <div className="wish-canvas relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#141210] text-[#F6F1E6]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 80% 0%, #2A241C 0%, #1B1814 45%, #121110 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5] bg-grain mix-blend-soft-light"
      />
      <div aria-hidden="true" className="pointer-events-none absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-[#C9A45C]/40 to-transparent" style={{ left: '6%' }} />
      <div aria-hidden="true" className="pointer-events-none absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-[#C9A45C]/20 to-transparent" style={{ right: '6%' }} />
      <div aria-hidden="true" className="pointer-events-none absolute left-[6%] top-[8%] h-6 w-6 border-l border-t border-[#C9A45C]/50" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[8%] right-[6%] h-6 w-6 border-b border-r border-[#C9A45C]/50" />

      <div className="relative z-10 flex min-h-full flex-col justify-between px-[11%] py-[11%]">
        <div className="flex items-center justify-between text-[#C9A45C]">
          <span className="wish-label uppercase tracking-[0.3em]">{occasionLabel}</span>
          <span className="wish-label uppercase tracking-[0.3em] text-[#8D806D]">No. 01</span>
        </div>

        <div className="py-10">
          <p className="wish-label uppercase tracking-[0.32em] text-[#8D806D]">
            {relationship ? `For ${relationship}` : 'A wish for'}
          </p>

          <h1 className="wish-name mt-4 font-sans font-light tracking-[-0.035em] text-[#F8F3E8]">
            {recipient}
          </h1>

          <div className="mt-7 flex items-center gap-4">
            <span className="h-px w-16 bg-[#C9A45C]/60" />
            <Diamond className="text-[#C9A45C]" />
            <span className="h-px flex-1 bg-gradient-to-r from-[#C9A45C]/30 to-transparent" />
          </div>

          <h2 className="wish-heading mt-7 font-display italic text-[#C9A45C]">{heading}</h2>

          <Message
            text={message}
            className="mt-6 max-w-[36ch] font-light leading-[1.85] text-[#CFC5B4]"
          />
        </div>

        <div className="flex items-end justify-between gap-6">
          <div>
            {sender && (
              <>
                <p className="wish-label uppercase tracking-[0.24em] text-[#8D806D]">Sent with care by</p>
                <p className="mt-2 font-display text-[1.15em] italic text-[#EDE3D1]">{sender}</p>
              </>
            )}
          </div>
          <SparkleIcon className="h-5 w-5 shrink-0 animate-float text-[#C9A45C]" />
        </div>
      </div>
    </div>
  )
}
