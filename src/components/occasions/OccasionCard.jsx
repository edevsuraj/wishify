import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import OccasionArt from '../art/OccasionArt.jsx'
import { OCCASION_GROUP_MAP } from '../../lib/occasions.js'

const SIZES = {
  tall: 'aspect-[4/5]',
  compact: 'aspect-[5/4]',
  wide: 'aspect-[16/10]',
}

const GROUP_LABELS = {
  everyday: 'Everyday',
  hindu: 'Hindu',
  islamic: 'Islamic',
  christian: 'Christian',
  sikh: 'Sikh',
  buddhist: 'Buddhist',
  jain: 'Jain',
  national: 'National',
  regional: 'Regional',
}

/**
 * One image-led occasion tile. Falls back to bespoke SVG artwork when a
 * respectful photograph isn't the right fit.
 */
export default function OccasionCard({
  occasion,
  active = false,
  onSelect,
  to,
  size = 'tall',
  className = '',
  showBlurb = false,
  priority = false,
  children,
}) {
  if (!occasion) return null

  const content = (
    <>
      <span aria-hidden="true" className="absolute inset-0">
        {occasion.image ? (
          <img
            src={occasion.image}
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <OccasionArt
            occasion={occasion}
            className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
            rounded={false}
          />
        )}
      </span>

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5 transition-opacity duration-300 group-hover:from-black/85"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" />

      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-md">
        {GROUP_LABELS[occasion.group] || OCCASION_GROUP_MAP[occasion.group]?.short || 'Wish'}
      </span>

      {active && (
        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white text-ink shadow-lg">
          <Check className="h-4 w-4" aria-hidden="true" strokeWidth={3} />
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <span className="block font-display text-[1.06rem] font-semibold leading-tight tracking-[-0.01em] text-white sm:text-[1.18rem]">
          {occasion.label}
        </span>
        <span className={`mt-1 block text-[0.68rem] leading-snug text-white/70 ${showBlurb ? '' : 'line-clamp-1'}`}>
          {showBlurb ? occasion.blurb : occasion.tagline}
        </span>
        {children}
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10 transition group-hover:ring-white/20"
      />
    </>
  )

  const classes = `group relative block overflow-hidden rounded-[1.35rem] bg-ink text-left shadow-[0_18px_40px_-26px_rgba(36,28,24,0.7)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(36,28,24,0.8)] ${
    SIZES[size] || SIZES.tall
  } ${active ? 'ring-2 ring-coral ring-offset-2 ring-offset-paper' : ''} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={`${occasion.label} wishes`}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onSelect?.(occasion.id)}
      aria-pressed={active}
      className={classes}
    >
      {content}
    </button>
  )
}
