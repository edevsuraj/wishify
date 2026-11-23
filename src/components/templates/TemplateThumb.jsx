import { BotanicalCorner, CONFETTI_BITS, NIGHT_STARS, TWINKLE_BITS } from '../../templates/parts.jsx'

/**
 * Miniature, CSS-only previews. Deliberately lightweight (no canvas, no
 * animation) so a page full of template cards stays fast.
 */
function Frame({ children, className = '', style }) {
  return (
    <div
      aria-hidden="true"
      className={`thumb-canvas relative aspect-[4/5] w-full overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

function MiniRule({ className = '' }) {
  return <span className={`block h-px w-14 bg-current opacity-25 ${className}`} />
}

export default function TemplateThumb({ template, name = 'Aanya', heading = 'Happy Birthday' }) {
  const id = template?.id

  if (id === 'elegant-celebration') {
    return (
      <Frame className="bg-[#FBF5E8] text-[#3A2E1D]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(90% 70% at 50% 0%, #FFFDF7, #F6EBD7)' }} />
        <div className="absolute inset-[6%] border border-[#B08D3F]/45" />
        <div className="absolute inset-[9%] border border-[#B08D3F]/15" />
        <div className="absolute left-[5%] top-[5%] h-8 w-8 border-l border-t border-[#B08D3F]/50" />
        <div className="absolute bottom-[5%] right-[5%] h-8 w-8 border-b border-r border-[#B08D3F]/50" />
        <div className="relative flex h-full flex-col items-center justify-center px-[16%] text-center">
          <span className="text-[7px] font-medium uppercase tracking-[0.28em] text-[#A9822F]">{heading}</span>
          <p className="mt-3 font-display font-semibold leading-none text-[#332818]" style={{ fontSize: 'clamp(1.35rem, 8.5cqw, 2rem)' }}>
            {name}
          </p>
          <div className="my-2.5 flex items-center gap-1 text-[#B08D3F]">
            <span className="h-px w-6 bg-current opacity-50" />
            <span className="text-[6px]">✦</span>
            <span className="h-px w-6 bg-current opacity-50" />
          </div>
          <p className="font-display text-[8px] italic text-[#6B5533]">Wishing you every joy</p>
          <div className="mt-3 space-y-1.5">
            <span className="mx-auto block h-px w-16 bg-[#3A2E1D]/15" />
            <span className="mx-auto block h-px w-12 bg-[#3A2E1D]/10" />
          </div>
          <p className="absolute bottom-[8%] text-[6px] uppercase tracking-[0.24em] text-[#A9822F]/80">With love</p>
        </div>
      </Frame>
    )
  }

  if (id === 'romantic-hearts') {
    return (
      <Frame className="text-[#FFF1F3]" style={{ background: 'radial-gradient(110% 80% at 50% 0%, #7A2749, #4A1730 55%, #33101F)' }}>
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 40px 10px rgba(25,4,13,0.5)' }} />
        {[
          [12, 22, 8],
          [78, 18, 10],
          [68, 66, 7],
          [20, 72, 9],
          [88, 44, 5],
        ].map(([left, top, size], index) => (
          <span key={index} className="absolute text-[#F6A6B2]" style={{ left: `${left}%`, top: `${top}%`, opacity: 0.5 }}>
            <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor"><path d="M16 27.2C9.6 23.1 5 18.9 5 13.9 5 10.1 7.7 7.3 11 7.3c2 0 3.8 1 5 2.7 1.2-1.7 3-2.7 5-2.7 3.3 0 6 2.8 6 6.6 0 5-4.6 9.2-11 13.3Z" /></svg>
          </span>
        ))}
        <div className="relative flex h-full flex-col items-center justify-center px-[12%] text-center">
          <span className="text-[6px] uppercase tracking-[0.3em] text-[#F0C4CE]/75">{heading}</span>
          <p className="mt-1 font-romantic leading-[1.1] text-[#FFE7EC]" style={{ fontSize: 'clamp(1.8rem, 10.5cqw, 2.6rem)' }}>
            {name}
          </p>
          <p className="font-display text-[8px] italic text-[#F7D9DF]/85">forever & always</p>
          <span className="my-3 h-px w-10 bg-[#F6A6B2]/50" />
          <div className="space-y-1.5 text-[#FBE3E8]/55">
            <span className="mx-auto block h-px w-20 bg-current" />
            <span className="mx-auto block h-px w-14 bg-current" />
          </div>
        </div>
      </Frame>
    )
  }

  if (id === 'floral-garden') {
    return (
      <Frame className="bg-[#F1F5E8] text-[#2B3B2D]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(90% 70% at 30% 10%, #FBFDF4, #E1EBD8)' }} />
        <BotanicalCorner className="absolute -left-[6%] -top-[5%] w-[42%] text-[#6E8A70] opacity-70" />
        <BotanicalCorner className="absolute -right-[6%] -top-[5%] w-[42%] -scale-x-100 text-[#6E8A70] opacity-70" />
        <BotanicalCorner className="absolute -bottom-[5%] -left-[6%] w-[36%] -scale-y-100 text-[#8FA98F] opacity-60" />
        <BotanicalCorner className="absolute -bottom-[5%] -right-[6%] w-[36%] -scale-100 text-[#8FA98F] opacity-60" />
        <div className="relative flex h-full flex-col items-center justify-center px-[18%] text-center">
          <span className="text-[6px] uppercase tracking-[0.28em] text-[#557A5C]">a note for</span>
          <p className="mt-1 font-display italic leading-tight text-[#26382B]" style={{ fontSize: 'clamp(1.3rem, 8cqw, 1.9rem)' }}>
            {name}
          </p>
          <span className="my-2 h-px w-8 bg-[#557A5C]/40" />
          <p className="font-display text-[8px] italic text-[#4C654E]">{heading}</p>
          <div className="mt-3 flex gap-1 text-[#7E9A83]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 w-1 rounded-full bg-current opacity-60" />
            ))}
          </div>
        </div>
      </Frame>
    )
  }

  if (id === 'minimal-luxury') {
    return (
      <Frame className="bg-[#141210] text-[#F6F1E6]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(90% 70% at 80% 0%, #2A241C, #121110)' }} />
        <div className="absolute left-[8%] top-[8%] h-5 w-5 border-l border-t border-[#C9A45C]/50" />
        <div className="absolute bottom-[8%] right-[8%] h-5 w-5 border-b border-r border-[#C9A45C]/50" />
        <div className="relative flex h-full flex-col justify-between px-[12%] py-[12%]">
          <div className="flex justify-between text-[6px] uppercase tracking-[0.25em] text-[#C9A45C]">
            <span>{heading}</span>
            <span className="text-[#8D806D]">01</span>
          </div>
          <div>
            <p className="text-[6px] uppercase tracking-[0.25em] text-[#8D806D]">a wish for</p>
            <p className="mt-2 font-sans font-light leading-[0.95] text-[#F8F3E8]" style={{ fontSize: 'clamp(1.5rem, 10cqw, 2.4rem)', letterSpacing: '-0.04em' }}>
              {name}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#C9A45C]/60" />
              <span className="h-1 w-1 rotate-45 border border-[#C9A45C]" />
            </div>
            <p className="mt-3 font-display text-[8px] italic text-[#C9A45C]">{heading}, beautifully.</p>
            <div className="mt-3 space-y-1.5 text-[#8D806D]/60">
              <span className="block h-px w-16 bg-current" />
              <span className="block h-px w-10 bg-current" />
            </div>
          </div>
          <p className="text-[6px] uppercase tracking-[0.22em] text-[#8D806D]">sent with care</p>
        </div>
      </Frame>
    )
  }

  if (id === 'cute-playful') {
    return (
      <Frame className="bg-[#FFF2BF] text-[#3A2A12]">
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="absolute -left-6 top-8 h-20 w-20 rounded-full bg-[#FFB3A7]/50 blur-xl" />
        <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-[#A6D8C4]/50 blur-xl" />
        <span className="absolute left-[8%] top-[8%] h-6 w-6 rounded-full border-2 border-[#3A2A12] bg-[#FFD166]" />
        <span className="absolute right-[9%] top-[12%] text-sm">✨</span>
        <div className="relative flex h-full flex-col items-center justify-center px-[10%] text-center">
          <span className="rounded-full border-2 border-[#3A2A12] bg-white px-2 py-0.5 text-[5.5px] font-bold uppercase tracking-[0.16em] shadow-[2px_2px_0_#3A2A12]">
            🎂 {heading}
          </span>
          <p className="relative mt-3 font-sans font-extrabold leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(1.45rem, 9.5cqw, 2.2rem)' }}>
            <span className="relative z-10">{name}</span>
            <span className="absolute inset-x-[-4%] bottom-[6%] h-[32%] -rotate-1 bg-[#FFD166]" />
          </p>
          <div className="mt-3 w-full rounded-xl border-2 border-[#3A2A12] bg-white px-3 py-2 shadow-[3px_3px_0_#3A2A12]">
            <span className="mx-auto block h-px w-full bg-[#3A2A12]/12" />
            <span className="mx-auto mt-1.5 block h-px w-4/5 bg-[#3A2A12]/12" />
          </div>
          <span className="mt-3 rounded-full border-2 border-[#3A2A12] bg-[#A6D8C4] px-2 py-0.5 text-[6px] font-bold">From Aarav</span>
        </div>
      </Frame>
    )
  }

  if (id === 'golden-memories') {
    return (
      <Frame className="grain-overlay bg-[#2F2114] text-[#F8EBCD]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(100% 80% at 50% 0%, #6A4C2F, #241A10)' }} />
        <div className="absolute inset-y-0 left-0 w-[5%] bg-[#160F08]/60" />
        <div className="absolute inset-y-0 right-0 w-[5%] bg-[#160F08]/60" />
        {[14, 42, 70].map((top) => (
          <span key={top} className="absolute left-[1.4%] h-2 w-[2%] rounded-sm bg-[#D8B47A]/30" style={{ top: `${top}%` }} />
        ))}
        {[14, 42, 70].map((top) => (
          <span key={`r-${top}`} className="absolute right-[1.4%] h-2 w-[2%] rounded-sm bg-[#D8B47A]/30" style={{ top: `${top}%` }} />
        ))}
        <div className="relative flex h-full flex-col items-center justify-center px-[16%] text-center">
          <span className="text-[6px] uppercase tracking-[0.26em] text-[#D8B47A]/80">a keepsake for</span>
          <span className="mt-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#D8B47A]/50 font-display text-[11px] text-[#EBCF9B]">
            {name.slice(0, 1)}
          </span>
          <p className="mt-2 font-display leading-tight text-[#F8EBCD]" style={{ fontSize: 'clamp(1.2rem, 7.5cqw, 1.75rem)' }}>
            {name}
          </p>
          <p className="font-display text-[8px] italic text-[#D8B47A]">{heading}</p>
          <div className="mt-3 flex items-center gap-2 text-[#D8B47A]/60">
            <span className="h-px w-8 bg-current" />
            <span className="text-[5px]">✦</span>
            <span className="h-px w-8 bg-current" />
          </div>
          <span className="mt-3 font-script text-base text-[#F3DEB9]">from Aarav</span>
        </div>
      </Frame>
    )
  }

  if (id === 'magical-night-sky') {
    return (
      <Frame className="bg-[#0A1026] text-[#EEF1FF]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(100% 80% at 65% 0%, #25315F, #080D1F)' }} />
        {NIGHT_STARS.slice(0, 18).map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-[#FFF6D8]"
            style={{ top: `${star.top}%`, left: `${star.left}%`, width: star.size, height: star.size, opacity: star.opacity * 0.8 }}
          />
        ))}
        <span className="absolute right-[12%] top-[10%] h-6 w-6 rounded-full bg-[#F7EFCB] shadow-[0_0_18px_rgba(247,239,203,0.5)]" />
        <span className="absolute left-[10%] top-[24%] h-px w-16 rotate-[18deg] bg-gradient-to-r from-transparent via-[#FFF3C4] to-transparent opacity-60" />
        <div className="relative flex h-full flex-col items-center justify-center px-[14%] text-center">
          <span className="text-[6px] uppercase tracking-[0.26em] text-[#D8C98A]">{heading}</span>
          <p className="mt-2 font-display leading-tight text-[#F4EDD6]" style={{ fontSize: 'clamp(1.4rem, 8.5cqw, 2rem)', textShadow: '0 0 18px rgba(216,201,138,0.35)' }}>
            {name}
          </p>
          <p className="mt-1 font-display text-[8px] italic text-[#9AA7D8]">under the same sky</p>
          <div className="mt-3 space-y-1.5 text-[#DDE3F8]/40">
            <span className="mx-auto block h-px w-16 bg-current" />
            <span className="mx-auto block h-px w-10 bg-current" />
          </div>
        </div>
        <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[18%] w-full text-[#060A18]">
          <path d="M0 60V32c30-16 60-14 90 2 32 16 68 12 110-6v32Z" fill="currentColor" />
        </svg>
      </Frame>
    )
  }

  if (id === 'colorful-confetti') {
    return (
      <Frame className="bg-[#FFF8F2] text-[#2B2020]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(80% 60% at 10% 0%, #FFE3E7, transparent 60%), radial-gradient(70% 60% at 95% 10%, #FFECCB, transparent 60%)' }} />
        {CONFETTI_BITS.slice(0, 12).map((bit, index) => (
          <span
            key={bit.id}
            className="absolute rounded-[1px]"
            style={{
              left: `${bit.left}%`,
              top: `${(index * 17) % 78}%`,
              width: bit.width * 0.7,
              height: bit.height * 0.7,
              background: bit.color,
              transform: `rotate(${bit.rotate}deg)`,
              opacity: 0.75,
            }}
          />
        ))}
        <div className="relative flex h-full flex-col items-center justify-center px-[12%] text-center">
          <span className="rounded-full px-2 py-0.5 text-[5.5px] font-bold uppercase tracking-[0.16em] text-white" style={{ backgroundImage: 'linear-gradient(100deg,#D14A66,#E9A23B)' }}>
            🎉 {heading}
          </span>
          <p className="mt-2 font-sans font-extrabold leading-none tracking-tight text-[#D14A66]" style={{ fontSize: 'clamp(1.5rem, 9.5cqw, 2.2rem)' }}>
            {name}
          </p>
          <div className="mt-3 w-full rounded-lg border border-[#2B2020]/10 bg-white px-3 py-2 shadow-sm">
            <span className="mx-auto block h-px w-full bg-[#2B2020]/12" />
            <span className="mx-auto mt-1.5 block h-px w-3/4 bg-[#2B2020]/12" />
          </div>
          <span className="mt-2.5 text-[6px] uppercase tracking-[0.2em] text-[#A08A8A]">let’s celebrate</span>
        </div>
      </Frame>
    )
  }

  if (id === 'paper-card') {
    return (
      <Frame className="grain-overlay bg-[#E5D6BD] text-[#3B2E22]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(100% 80% at 30% 0%, #F4E9D5, #DCC9AA)' }} />
        <div className="absolute inset-[8%] rotate-[-1.5deg] bg-[#FDF8EC] shadow-[0_8px_18px_-8px_rgba(59,46,34,0.6)] ring-1 ring-[#3B2E22]/10">
          <span className="absolute -top-1.5 left-1/2 h-3 w-12 -translate-x-1/2 -rotate-3 bg-[#D9B79B]/85" />
          <div className="absolute inset-0 paper-lines opacity-40" />
          <div className="relative flex h-full flex-col justify-center px-[12%]">
            <p className="font-script text-[#8C5A3C]" style={{ fontSize: 'clamp(11px, 5.5cqw, 15px)' }}>Dear {name},</p>
            <p className="mt-1 font-script leading-tight text-[#3F3125]" style={{ fontSize: 'clamp(9px, 4.2cqw, 12px)' }}>
              Wishing you a day full of little joys and big smiles.
            </p>
            <p className="mt-3 text-right font-script text-[#7A4A31]" style={{ fontSize: 'clamp(11px, 5cqw, 14px)' }}>
              — Aarav
            </p>
            <span className="absolute bottom-[10%] right-[12%] text-[#B06A4A]/70">
              <svg viewBox="0 0 32 32" width="9" height="9" fill="currentColor"><path d="M16 27.2C9.6 23.1 5 18.9 5 13.9 5 10.1 7.7 7.3 11 7.3c2 0 3.8 1 5 2.7 1.2-1.7 3-2.7 5-2.7 3.3 0 6 2.8 6 6.6 0 5-4.6 9.2-11 13.3Z" /></svg>
            </span>
          </div>
        </div>
      </Frame>
    )
  }

  if (id === 'neon-celebration') {
    return (
      <Frame className="bg-[#09050F] text-[#F4ECFF]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(80% 60% at 20% 0%, #2A0B3D, transparent 60%), radial-gradient(70% 60% at 90% 30%, #0B3037, transparent 60%)' }} />
        <div className="absolute inset-[7%] rounded-lg border border-[#F45D9C]/40" style={{ boxShadow: 'inset 0 0 18px rgba(244,93,156,0.15)' }} />
        <div
          className="absolute inset-x-0 bottom-0 h-[30%] opacity-40"
          style={{
            backgroundImage: 'linear-gradient(rgba(108,240,225,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(244,93,156,0.3) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            transform: 'perspective(120px) rotateX(55deg)',
            transformOrigin: 'bottom',
            maskImage: 'linear-gradient(to bottom, transparent, black)',
          }}
        />
        <div className="relative flex h-full flex-col items-center justify-center px-[13%] text-center">
          <span className="rounded-full border border-[#6CF0E1]/50 px-2 py-0.5 text-[5px] uppercase tracking-[0.24em] text-[#8DF7EA]">{heading}</span>
          <p className="mt-3 font-sans font-extrabold uppercase leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(1.35rem, 9cqw, 2rem)', textShadow: '0 0 14px rgba(244,93,156,0.85), 0 0 30px rgba(244,93,156,0.4)' }}>
            {name}
          </p>
          <span className="my-2.5 h-px w-14 bg-gradient-to-r from-transparent via-[#6CF0E1] to-transparent" />
          <div className="space-y-1.5 text-[#D9CDEA]/40">
            <span className="mx-auto block h-px w-16 bg-current" />
            <span className="mx-auto block h-px w-10 bg-current" />
          </div>
          <span className="mt-3 rounded-full border border-[#F45D9C]/50 px-2 py-0.5 text-[5.5px] text-[#FFE4F1]">from Aarav</span>
        </div>
      </Frame>
    )
  }

  if (id === 'soft-pastel') {
    return (
      <Frame className="bg-[#FBF1F6] text-[#3E3044]">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, #FDF2F6, #F5EAF8 45%, #EAF3F0)' }} />
        <div className="absolute -left-6 -top-4 h-24 w-24 rounded-full bg-[#F6C6CC]/60 blur-2xl" />
        <div className="absolute -right-6 top-1/3 h-28 w-28 rounded-full bg-[#CDBCEC]/50 blur-2xl" />
        <div className="absolute -bottom-6 left-1/3 h-24 w-24 rounded-full bg-[#BFE0D6]/55 blur-2xl" />
        <div className="absolute inset-[7%] rounded-xl border border-white/70" />
        {TWINKLE_BITS.slice(0, 6).map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full border border-white/70 bg-white/40"
            style={{ top: `${star.top}%`, left: `${star.left}%`, width: 5 + star.size, height: 5 + star.size }}
          />
        ))}
        <div className="relative flex h-full flex-col items-center justify-center px-[14%] text-center">
          <span className="text-[6px] uppercase tracking-[0.26em] text-[#8C6FB0]">a gentle wish</span>
          <p className="mt-1 font-display text-[8px] italic text-[#6C5578]">{heading}</p>
          <p className="mt-1 font-display font-medium leading-tight" style={{ fontSize: 'clamp(1.35rem, 8.5cqw, 2rem)' }}>
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(100deg, #6C5578, #A97C9E 48%, #7E9A83)' }}>
              {name}
            </span>
          </p>
          <div className="mt-3 flex items-center gap-1 text-[#B79BD8]">
            <span className="h-0.5 w-0.5 rounded-full bg-current" />
            <span className="h-0.5 w-0.5 rounded-full bg-current opacity-60" />
            <span className="h-0.5 w-0.5 rounded-full bg-current opacity-30" />
          </div>
          <div className="mt-3 space-y-1.5 text-[#5A4A60]/30">
            <span className="mx-auto block h-px w-16 bg-current" />
            <span className="mx-auto block h-px w-9 bg-current" />
          </div>
        </div>
      </Frame>
    )
  }

  if (id === 'cinematic-surprise') {
    return (
      <Frame className="grain-overlay bg-[#08080A] text-[#F4EEE2]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(80% 70% at 50% 10%, #231E26, #070708)' }} />
        <div
          className="absolute left-1/2 top-0 h-[85%] w-[90%] -translate-x-1/2 opacity-70"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,242,205,0.2), transparent 80%)',
            clipPath: 'polygon(42% 0, 58% 0, 88% 100%, 12% 100%)',
            filter: 'blur(6px)',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-[7%] bg-black" />
        <div className="absolute inset-x-0 bottom-0 h-[7%] bg-black" />
        <div className="relative flex h-full flex-col items-center justify-center px-[14%] text-center">
          <span className="text-[5px] uppercase tracking-[0.3em] text-[#D8B26A]">Wishify presents</span>
          <span className="mt-2 text-[6px] uppercase tracking-[0.24em] text-[#948B7B]">a wish for</span>
          <p className="mt-1 font-display leading-tight text-[#F7F2E7]" style={{ fontSize: 'clamp(1.3rem, 8.5cqw, 2rem)' }}>
            {name}
          </p>
          <p className="font-display text-[8px] italic text-[#D8B26A]">{heading}</p>
          <span className="my-3 h-px w-10 bg-[#D8B26A]/50" />
          <div className="space-y-1.5 text-[#D6CDBE]/35">
            <span className="mx-auto block h-px w-20 bg-current" />
            <span className="mx-auto block h-px w-14 bg-current" />
          </div>
          <span className="mt-3 text-[5.5px] uppercase tracking-[0.26em] text-[#948B7B]">with love from Aarav</span>
        </div>
      </Frame>
    )
  }

  return <Frame className="bg-cream" />
}
