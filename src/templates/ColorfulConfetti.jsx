import { CONFETTI_BITS, Message, SparkleIcon, wishCopy } from './parts.jsx'

/** 8 — Party confetti, gradient type and bright paper energy. */
export default function ColorfulConfetti({ wish }) {
  const { occasionLabel, emoji, heading, recipient, sender, relationship, message } = wishCopy(wish)

  return (
    <div className="wish-canvas relative flex h-full w-full flex-col overflow-y-auto nice-scroll bg-[#FFF8F2] text-[#2B2020]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 12% 0%, #FFE3E7 0%, transparent 60%), radial-gradient(70% 60% at 92% 8%, #FFECCB 0%, transparent 62%), radial-gradient(80% 70% at 50% 110%, #EEE6FF 0%, transparent 60%), #FFF9F4',
        }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {CONFETTI_BITS.map((bit) => (
          <span
            key={bit.id}
            className="fx fx-heavy absolute top-0 animate-confetti-fall rounded-[2px]"
            style={{
              left: `${bit.left}%`,
              width: bit.width,
              height: bit.height,
              background: bit.color,
              opacity: bit.opacity,
              transform: `rotate(${bit.rotate}deg)`,
              animationDelay: `${bit.delay}s`,
              animationDuration: `${bit.duration}s`,
            }}
          />
        ))}
        <span className="absolute -left-10 top-[18%] h-40 w-40 rounded-full bg-[#F6A6B2]/30 blur-2xl" />
        <span className="absolute -right-10 bottom-[12%] h-48 w-48 rounded-full bg-[#F2C14E]/30 blur-2xl" />
      </div>

      <div data-wish-content className="relative z-10 flex min-h-full flex-col items-center justify-center px-[9%] py-[12%] text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white shadow-soft"
          style={{ backgroundImage: 'linear-gradient(100deg, #D14A66, #E9A23B)' }}
        >
          {emoji} {occasionLabel}
        </span>

        <h2 className="wish-heading mt-7 font-display font-semibold italic text-[#B04560]">{heading}</h2>

        <h1 className="wish-name mt-1 font-sans font-extrabold tracking-[-0.05em]">
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(100deg, #D14A66 0%, #E8607A 40%, #E9A23B 100%)' }}
          >
            {recipient}
          </span>
        </h1>

        <div className="mt-4 flex items-center gap-1.5 text-[#E9A23B]">
          {Array.from({ length: 5 }).map((_, index) => (
            <SparkleIcon key={index} className={`h-3.5 w-3.5 ${index % 2 ? 'opacity-50' : ''}`} />
          ))}
        </div>

        <div className="relative mt-6 w-full max-w-[33rem]">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-1.5 translate-y-2 rounded-[1.4rem]"
            style={{ backgroundImage: 'linear-gradient(100deg, #D14A66, #E9A23B)' }}
          />
          <div className="relative rounded-[1.4rem] border border-[#2B2020]/10 bg-white/95 px-[7%] py-[7%] shadow-soft backdrop-blur-sm">
            <Message text={message} className="font-medium leading-[1.7] text-[#4B3939]" />
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {sender && (
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2B2020]/10 bg-white px-4 py-2 text-[0.8rem] font-semibold shadow-inner">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundImage: 'linear-gradient(100deg, #D14A66, #E9A23B)' }}
              />
              From {sender}
            </span>
          )}
          {relationship && (
            <span className="rounded-full bg-[#2B2020] px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white">
              {relationship}
            </span>
          )}
        </div>

        <p className="wish-label mt-6 uppercase tracking-[0.28em] text-[#A08A8A]">Let’s celebrate you</p>
      </div>
    </div>
  )
}
