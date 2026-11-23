import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import Button from '../ui/Button.jsx'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/templates', label: 'Designs' },
  { to: '/#how-it-works', label: 'How it works' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

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

  const isHome = location.pathname === '/'

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-ink/[0.07] bg-cream/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors ${
                  isActive && link.to !== '/#how-it-works'
                    ? 'text-ink'
                    : 'text-cocoa hover:bg-ink/[0.045] hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && link.to !== '/#how-it-works' && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-coral"
                      style={{ bottom: '0.25rem' }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/templates"
            className="rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-cocoa transition hover:text-ink"
          >
            Explore
          </Link>
          <Button to="/create" variant="primary" size="md">
            Create a Wish
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Button>
        </div>

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

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink/[0.06] bg-cream/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-5">
              {LINKS.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * index }}
                >
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium ${
                        isActive ? 'bg-white text-ink shadow-soft' : 'text-cocoa hover:bg-white/60'
                      }`
                    }
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-taupe" aria-hidden="true" />
                  </NavLink>
                </motion.div>
              ))}
              <Button to="/create" variant="coral" size="lg" className="mt-3 w-full">
                Create a Wish
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              {!isHome && (
                <p className="px-2 pb-1 pt-3 text-center text-xs text-taupe">
                  One link. No sign-up. Just a little happiness.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
