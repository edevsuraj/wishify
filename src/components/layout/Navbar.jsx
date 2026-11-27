import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import Button from '../ui/Button.jsx'

const LINKS = [
  { to: '/#how-it-works', label: 'How it works', hash: '#how-it-works' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isActive = (link) =>
    link.hash
      ? location.pathname === '/' && location.hash === link.hash
      : location.pathname === link.to

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return undefined
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-ink/[0.07] bg-cream/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors ${
                isActive(link) ? 'text-ink' : 'text-cocoa hover:bg-ink/[0.045] hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/create" variant="primary" size="sm">
            <span className="sm:hidden">Create</span>
            <span className="hidden sm:inline">Create a Wish</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-ink/[0.06] bg-cream/95 backdrop-blur-xl md:hidden"
        >
          <div className="container-page flex flex-col py-3">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-xl px-3 py-3 text-[0.95rem] font-medium transition-colors ${
                  isActive(link) ? 'bg-white text-ink shadow-soft' : 'text-cocoa hover:bg-white/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
