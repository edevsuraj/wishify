import { getOccasion } from '../lib/occasions.js'

/** Normalises wish text for display without ever rendering raw HTML. */
export function wishCopy(wish = {}) {
  const occasion = getOccasion(wish.occasion) || {
    label: 'A Little Wish',
    heading: 'A Little Wish',
    emoji: '💌',
  }

  return {
    occasion,
    occasionLabel: occasion.label,
    emoji: occasion.emoji,
    heading: (wish.heading || '').trim() || occasion.heading || 'A Little Wish',
    recipient: (wish.recipient || '').trim() || 'Someone Special',
    sender: (wish.sender || '').trim(),
    relationship: (wish.relationship || '').trim(),
    message:
      (wish.message || '').trim() ||
      'Your heartfelt message will appear here. Start writing to see it come alive.',
  }
}

export function Message({ text, className = '', style }) {
  return (
    <p className={`wish-message whitespace-pre-line ${className}`} style={style}>
      {text}
    </p>
  )
}

export function SenderLine({ name, className = '', prefix = 'With love,' }) {
  if (!name) return null
  return (
    <p className={`wish-signature ${className}`}>
      <span className="opacity-60">{prefix} </span>
      <span className="font-semibold">{name}</span>
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Deterministic decorative data (no per-render randomness)            */
/* ------------------------------------------------------------------ */

function seededRandom(seed) {
  let state = seed
  return () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
}

function makeStars(count, seed = 42) {
  const random = seededRandom(seed)
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    top: random() * 96,
    left: random() * 100,
    size: 1 + random() * 2.2,
    delay: random() * 6,
    duration: 2.6 + random() * 4,
    opacity: 0.3 + random() * 0.7,
  }))
}

function makeConfetti(count, seed = 7) {
  const random = seededRandom(seed)
  const palette = ['#E8607A', '#E9A23B', '#7C5CE0', '#3FA796', '#5B8DEF', '#F06A9B', '#F2C14E']
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: random() * 100,
    delay: random() * 9,
    duration: 7 + random() * 7,
    width: 5 + random() * 6,
    height: 10 + random() * 14,
    color: palette[index % palette.length],
    rotate: random() * 360,
    opacity: 0.55 + random() * 0.4,
  }))
}

function makeHearts(count, seed = 19) {
  const random = seededRandom(seed)
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: 4 + random() * 92,
    bottom: 2 + random() * 24,
    size: 10 + random() * 16,
    delay: random() * 8,
    duration: 8 + random() * 7,
    opacity: 0.25 + random() * 0.5,
  }))
}

function makeDrift(count, seed = 31) {
  const random = seededRandom(seed)
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    top: random() * 100,
    left: random() * 100,
    size: 2 + random() * 4,
    delay: random() * 7,
    duration: 14 + random() * 12,
    opacity: 0.2 + random() * 0.5,
  }))
}

export const NIGHT_STARS = makeStars(54, 42)
export const CONFETTI_BITS = makeConfetti(26, 7)
export const HEART_BITS = makeHearts(9, 19)
export const TWINKLE_BITS = makeStars(26, 73)
export const DUST_BITS = makeDrift(20, 31)

/* ------------------------------------------------------------------ */
/* Small, reusable ornaments                                          */
/* ------------------------------------------------------------------ */

export function HeartIcon({ className = '', filled = true }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4">
      <path d="M16 27.2C9.6 23.1 5 18.9 5 13.9 5 10.1 7.7 7.3 11 7.3c2 0 3.8 1 5 2.7 1.2-1.7 3-2.7 5-2.7 3.3 0 6 2.8 6 6.6 0 5-4.6 9.2-11 13.3Z" />
    </svg>
  )
}

export function SparkleIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 1.8c.6 3.9 2.3 5.6 6.2 6.2-3.9.6-5.6 2.3-6.2 6.2-.6-3.9-2.3-5.6-6.2-6.2 3.9-.6 5.6-2.3 6.2-6.2Z" />
      <path d="M18.8 14.4c.4 2.4 1.4 3.4 3.8 3.8-2.4.4-3.4 1.4-3.8 3.8-.4-2.4-1.4-3.4-3.8-3.8 2.4-.4 3.4-1.4 3.8-3.8Z" opacity=".65" />
      <path d="M5.6 13.2c.3 1.8 1.1 2.6 2.9 2.9-1.8.3-2.6 1.1-2.9 2.9-.3-1.8-1.1-2.6-2.9-2.9 1.8-.3 2.6-1.1 2.9-2.9Z" opacity=".5" />
    </svg>
  )
}

export function Flourish({ className = '' }) {
  return (
    <svg viewBox="0 0 140 140" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M10 134V50C10 28 28 10 50 10h84" strokeWidth="1" opacity=".5" />
      <path d="M22 118V54C22 36 36 22 54 22h64" strokeWidth=".6" opacity=".35" />
      <path d="M28 100c9 1 16-4 18-12 2-8-3-15-11-16-7-1-12 4-12 11" strokeWidth="1.2" opacity=".8" />
      <path d="M33 87c5-1 8-5 8-10" strokeWidth="1" opacity=".7" />
      <circle cx="52" cy="39" r="2" fill="currentColor" stroke="none" opacity=".8" />
      <circle cx="62" cy="46" r="1.2" fill="currentColor" stroke="none" opacity=".6" />
      <circle cx="72" cy="39" r="1" fill="currentColor" stroke="none" opacity=".45" />
      <path d="M46 54c4 4 9 5 14 3M46 54c1 5 4 9 9 10" strokeWidth=".8" opacity=".45" />
    </svg>
  )
}

export function BotanicalCorner({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 170 170"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M8 162C38 132 54 104 68 72c10-24 20-44 40-58" strokeWidth="1.1" opacity=".65" />
      <path d="M8 162c30-10 50-28 66-52" strokeWidth=".8" opacity=".4" />
      {[
        [48, 121, -26, 10, 20],
        [57, 108, 22, 9, 18],
        [70, 91, -30, 9, 19],
        [83, 73, 20, 8, 17],
        [93, 50, -34, 8, 16],
        [107, 39, 28, 8, 15],
      ].map(([x, y, rotate, rx, ry], index) => (
        <ellipse
          key={index}
          cx={x}
          cy={y}
          rx={rx}
          ry={ry}
          transform={`rotate(${rotate} ${x} ${y})`}
          strokeWidth=".9"
          opacity=".55"
        />
      ))}
      <g opacity=".8">
        <circle cx="126" cy="27" r="8" strokeWidth=".9" />
        <circle cx="136" cy="38" r="6" strokeWidth=".9" />
        <circle cx="119" cy="42" r="5.5" strokeWidth=".9" />
        <circle cx="143" cy="25" r="4.5" strokeWidth=".9" />
        <path d="M126 27l10 11M119 42l17-15M136 38l-17-11" strokeWidth=".7" opacity=".7" />
        <circle cx="129" cy="33" r="2.6" fill="currentColor" stroke="none" opacity=".7" />
      </g>
      <circle cx="43" cy="140" r="1.8" fill="currentColor" stroke="none" opacity=".5" />
      <circle cx="99" cy="62" r="1.3" fill="currentColor" stroke="none" opacity=".45" />
    </svg>
  )
}

export function Diamond({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-1.5 w-1.5 rotate-45 border border-current ${className}`}
    />
  )
}
