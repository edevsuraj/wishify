import { Link } from 'react-router-dom'
import Logo from '../ui/Logo.jsx'
import UpiButton from '../ui/UpiButton.jsx'
import { SITE } from '../../lib/site.js'

const CREATE_LINKS = [
  { to: '/create', label: 'Start a wish' },
  { to: '/create?occasion=birthday', label: 'Birthday wish' },
  { to: '/create?occasion=anniversary', label: 'Anniversary note' },
  { to: '/create?occasion=diwali', label: 'Festival wish' },
]

const SITE_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/[0.07] bg-[#F6F0E5]">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-page relative py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cocoa">
              Beautiful, personal wishes that live in one link. No accounts, no app, no fuss.
            </p>
            <p className="script-note mt-5">a little happiness, beautifully delivered.</p>
          </div>

          <div>
            <p className="label-tiny">Create</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CREATE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-tiny">Wishify</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SITE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ink/[0.08] pt-6 text-[0.72rem] text-taupe sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Wishify · Made with care in India</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a href={`mailto:${SITE.email}`} className="link-underline">
              {SITE.email}
            </a>
            <a href={SITE.donate} target="_blank" rel="noopener noreferrer" className="link-underline">
              Donate
            </a>
            <UpiButton className="link-underline inline-flex items-center gap-1.5 transition-colors hover:text-ink" />
            <a href={SITE.moreApps} target="_blank" rel="noopener noreferrer" className="link-underline">
              More apps
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
