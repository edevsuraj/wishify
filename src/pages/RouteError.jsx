import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { AlertTriangle, ArrowRight, Home } from 'lucide-react'
import Logo from '../components/ui/Logo.jsx'
import Button from '../components/ui/Button.jsx'
import usePageMeta from '../lib/usePageMeta.js'

export default function RouteError() {
  const error = useRouteError()
  const status = isRouteErrorResponse(error) ? error.status : null
  usePageMeta('Something went wrong', 'An unexpected error occurred. Return to Wishify and try again.')

  return (
    <div className="flex min-h-svh flex-col bg-cream">
      <header className="container-page flex h-[4.25rem] items-center">
        <Logo />
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="max-w-md text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-gold-deep shadow-soft">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink">
            Something didn’t go to plan.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-cocoa">
            {status
              ? `The page returned an unexpected ${status} response.`
              : 'An unexpected error occurred while loading this page. Reloading usually sorts it out.'}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => window.location.reload()} variant="primary" size="lg">
              Reload the page
            </Button>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cocoa underline-offset-4 hover:text-ink hover:underline"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Back home
            </Link>
          </div>
          <p className="mt-8 text-xs text-taupe">
            Still stuck?{' '}
            <Link to="/contact" className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-ink">
              Tell us what happened
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
