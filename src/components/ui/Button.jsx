import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50'

const variants = {
  primary:
    'bg-ink text-cream shadow-[0_12px_26px_-14px_rgba(36,28,24,0.75)] hover:-translate-y-0.5 hover:bg-[#3A2C24] hover:shadow-[0_18px_34px_-16px_rgba(36,28,24,0.7)] active:translate-y-0',
  coral:
    'bg-gradient-to-r from-coral-deep via-coral to-[#F0808F] text-white shadow-glow hover:-translate-y-0.5 hover:brightness-[1.04] active:translate-y-0',
  secondary:
    'border border-ink/12 bg-white/75 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-ink/25 hover:bg-white',
  ghost: 'text-cocoa hover:bg-ink/[0.055] hover:text-ink',
  white: 'bg-white text-ink shadow-soft hover:-translate-y-0.5 hover:shadow-lift',
  whatsapp:
    'border border-[#25D366]/30 bg-[#25D366]/10 text-[#128C4A] hover:-translate-y-0.5 hover:bg-[#25D366]/15',
}

const sizes = {
  sm: 'px-4 py-2 text-[0.82rem]',
  md: 'px-5 py-2.5 text-[0.92rem]',
  lg: 'px-6 py-3 text-[0.98rem] sm:px-7 sm:py-3.5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  loading = false,
  disabled,
  type = 'button',
  ...props
}) {
  const classes = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  )
}
