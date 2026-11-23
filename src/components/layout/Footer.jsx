import { Link } from 'react-router-dom'
import { Heart, Mail } from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import { SITE } from '../../lib/site.js'

const explore = [
  { to: '/create', label: 'Create a wish' },
  { to: '/templates', label: 'All designs' },
  { to: '/#occasions', label: 'Occasions' },
  { to: '/#how-it-works', label: 'How it works' },
]

const company = [
  { to: '/about', label: 'About Wishify' },
  { to: '/contact', label: 'Contact' },
  { to: '/about#faq', label: 'FAQ' },
]

const legal = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/[0.07] bg-[#F6F0E5]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-coral/10 blur-3xl" />
      <div className="container-page relative py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-cocoa">
              Beautiful personalized wishes, shared with a single link. No accounts, no app — just a
              little happiness, beautifully delivered.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cocoa transition hover:text-ink"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>

          <div>
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-taupe">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {explore.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="link-underline text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-taupe">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {company.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="link-underline text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-taupe">The fine print</h2>
            <ul className="mt-4 space-y-2.5">
              {legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="link-underline text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[15rem] text-xs leading-relaxed text-taupe">
              Wishes live entirely inside their links. They are never stored on a server — and they
              can’t be edited or revoked once shared.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink/[0.08] pt-6 text-xs text-taupe sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Wishify. Made for the people you love.</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1">
              Built with <Heart className="h-3 w-3 text-coral" fill="currentColor" aria-hidden="true" /> in React
            </span>
            <span aria-hidden="true">·</span>
            <span>Static & private by design</span>
            <span aria-hidden="true">·</span>
            <a
              href="https://github.com/DavidHDev/react-bits"
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline"
            >
              Motion inspired by React Bits
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
