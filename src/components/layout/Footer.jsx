import { Link } from 'react-router-dom'
import Logo from '../ui/Logo.jsx'
import UpiButton from '../ui/UpiButton.jsx'
import { SITE } from '../../lib/site.js'

export default function Footer() {
  return (
    <footer className="border-t border-ink/[0.07] bg-[#F6F0E5]">
      <div className="container-page py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-taupe">
            <span>© {new Date().getFullYear()} Wishify</span>
            <Link to="/privacy" className="link-underline">
              Privacy
            </Link>
            <Link to="/terms" className="link-underline">
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/[0.06] pt-4 text-[0.7rem] text-taupe">
          <a href={`mailto:${SITE.email}`} className="link-underline">
            Email: {SITE.email}
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
    </footer>
  )
}
