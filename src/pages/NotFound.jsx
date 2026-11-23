import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Heart, Home } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta.js'
import Button from '../components/ui/Button.jsx'
import TemplateThumb from '../components/templates/TemplateThumb.jsx'
import { TEMPLATES } from '../lib/templates.js'

export default function NotFound() {
  usePageMeta('Page not found', 'This page wandered off. Find your way back to Wishify and create a wish instead.')

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-aurora opacity-60" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.15]" />
      <div className="container-page relative flex min-h-[70svh] flex-col items-center justify-center py-16 text-center">
        <div className="relative mb-2">
          <p className="font-display text-[6rem] font-semibold leading-none tracking-tight text-ink/10 sm:text-[9rem]">
            404
          </p>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-coral">
            <Heart className="h-10 w-10 animate-float" fill="currentColor" aria-hidden="true" />
          </span>
        </div>

        <p className="eyebrow justify-center">
          <span className="h-px w-6 bg-coral/40" />
          A slight wrong turn
        </p>
        <h1 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          This page wandered off looking for a card.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-cocoa">
          The link might be old, mistyped, or the page might have moved. No harm done — there are
          still twelve lovely designs waiting.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button to="/" variant="primary" size="lg">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back home
          </Button>
          <Button to="/create" variant="coral" size="lg">
            Create a wish
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-12 flex items-end justify-center gap-2 sm:gap-4">
          {TEMPLATES.slice(0, 3).map((template, index) => (
            <Link
              key={template.id}
              to={`/templates?design=${template.id}`}
              aria-label={`View ${template.name}`}
              className={`w-20 overflow-hidden rounded-xl border border-white/60 shadow-soft transition hover:-translate-y-1 sm:w-28 ${
                index === 1 ? '-translate-y-3 rotate-[-2deg]' : index === 0 ? 'rotate-[3deg]' : 'rotate-[-4deg]'
              }`}
            >
              <TemplateThumb template={template} />
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-taupe">
          <Link to="/templates" className="inline-flex items-center gap-1.5 hover:text-ink">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            Browse designs
          </Link>
          <Link to="/about" className="hover:text-ink">
            About Wishify
          </Link>
          <Link to="/contact" className="hover:text-ink">
            Contact
          </Link>
        </div>
      </div>
    </section>
  )
}
