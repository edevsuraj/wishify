import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function Logo({ to = '/', tone = 'dark', className = '', compact = false }) {
  const text = tone === 'light' ? 'text-cream' : 'text-ink'
  return (
    <Link
      to={to}
      aria-label="Wishify home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-[0.85rem] bg-ink text-coral shadow-soft transition-transform duration-300 group-hover:-rotate-6">
        <Heart className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
      </span>
      {!compact && (
        <span className={`font-elegant text-[1.42rem] font-semibold leading-none tracking-[-0.01em] ${text}`}>
          Wishify
        </span>
      )}
    </Link>
  )
}
