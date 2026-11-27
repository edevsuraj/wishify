import { Link } from 'react-router-dom'
import { ArrowRight, Coffee, ExternalLink, Heart, Lock, Mail, Palette, ShieldCheck, Sparkles, Wallet, Wind } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import UpiButton from '../components/ui/UpiButton.jsx'
import { SITE } from '../lib/site.js'

const VALUES = [
  {
    icon: Heart,
    title: 'Warmth over cleverness',
    body: 'Every detail should make the recipient feel considered, not impressed by the technology.',
  },
  {
    icon: Lock,
    title: 'Privacy by architecture',
    body: 'No backend means no recipient database, no login walls, and nothing to quietly mine later.',
  },
  {
    icon: Palette,
    title: 'Craft over templates',
    body: 'Twelve distinct designs with their own typography, ornaments and motion — not twelve colour swaps.',
  },
  {
    icon: Wind,
    title: 'Restraint',
    body: 'Animations should feel like a held breath, not a fireworks display. We default to calm.',
  },
]

const FAQS = [
  {
    q: 'Do I need an account?',
    a: 'No. There is nothing to sign up for, no email required, and no dashboard. You can create and share a wish entirely from the creation page.',
  },
  {
    q: 'How does sharing work without a server?',
    a: 'Your occasion, names, message, design and animation choice are written as readable parameters after the # in the URL, with normal escaping for spaces and non-Latin text. Browsers never send the fragment to a server, so the greeting is decoded locally by whoever opens it.',
  },
  {
    q: 'Can I edit or delete a wish after sending it?',
    a: 'No. Links are self-contained and not stored anywhere, which means they cannot be edited, tracked, or revoked. If you need to change something, create a new wish and share the new link.',
  },
  {
    q: 'Will it work on my friend’s phone?',
    a: 'Yes. The greeting is a static web page. If they can open a website, they can open your wish — including in a private or incognito window.',
  },
  {
    q: 'Is there a message length limit?',
    a: 'Yes — up to 500 characters, with shorter names and headings. Keeping the message concise keeps the link short and the QR code easy to scan.',
  },
  {
    q: 'Why do you mention ads?',
    a: 'Wishify is free to host, and ads are one way to keep it that way. The ad system is prepared for Google AdSense but disabled until a publisher ID is configured and you give consent. Ads never appear over a greeting or block a feature.',
  },
]

export default function About() {
  usePageMeta(
    'About & FAQ',
    'Why Wishify exists, what it believes about privacy and craft, and answers to common questions about self-contained wish links.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Our little corner of the internet"
        title={
          <>
            A tiny website with one job:
            <span className="block font-display italic text-coral-deep">make someone feel seen.</span>
          </>
        }
        lead="Wishify began with a small frustration: sending a heartfelt message through a chat app, where it gets buried between memes and delivery updates. We wanted a way to make a greeting feel like a moment again."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/create" variant="primary" size="lg">
            Create a wish
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </PageHeader>

      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-5 text-[0.98rem] leading-[1.85] text-cocoa">
            <p className="text-xl font-display leading-relaxed text-ink">
              We think the internet is at its best when it is helping people be kind to each other.
            </p>
            <p>
              A wish is a strange, lovely artefact: it has no utility, no productivity value, and no
              growth loop. It exists purely to make one person smile. That felt like exactly the
              right thing to build.
            </p>
            <p>
              So we made a greeting studio that asks nothing of you. No account, no email, no
              onboarding sequence. Choose the moment, choose a design, write the thing you actually
              mean, and send one link.
            </p>
            <p>
              The entire greeting lives inside that link. It is a deliberate technical choice with a
              very human consequence: your words go straight from you to them, without passing
              through a database of recipients that could be breached, sold, or forgotten.
            </p>
          </div>

          <aside className="rounded-[1.8rem] border border-ink/[0.07] bg-paper p-6 shadow-soft sm:p-8">
            <div className="flex items-center gap-2 text-coral">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em]">The short version</span>
            </div>
            <dl className="mt-5 space-y-4">
              {[
                ['What it is', 'A static greeting studio, free to use.'],
                ['What it needs', 'A browser. That’s it.'],
                ['Where data lives', 'Inside the link, after the #.'],
                ['What we collect', 'Nothing about recipients.'],
                ['How it is funded', 'Optional, consented ads — never over a greeting.'],
              ].map(([term, desc]) => (
                <div key={term}>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-taupe">{term}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink">{desc}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-cream px-3 py-2.5 text-[0.72rem] text-cocoa">
              <ShieldCheck className="h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
              No database. No recipient accounts. No tracking pixels from us.
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-ink/[0.06] bg-[#F6F0E5] py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">
              <span className="h-px w-6 bg-coral/50" />
              What we care about
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
              Four small principles
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
            {VALUES.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="rounded-[1.5rem] border border-ink/[0.06] bg-paper p-6 shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-coral ring-1 ring-ink/[0.04]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-ink">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa">{value.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="faq" className="container-page scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow justify-center">
            <span className="h-px w-6 bg-coral/50" />
            Questions, answered
          </p>
          <h2 className="mt-4 text-center text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
            Frequently asked things
          </h2>

          <div className="mt-10 space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-ink/[0.07] bg-paper px-5 py-4 shadow-soft transition open:border-coral/20"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.95rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ink/10 text-taupe transition-transform duration-300 group-open:rotate-45 group-open:border-coral/30 group-open:text-coral">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-cocoa">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-ink/[0.07] bg-paper p-6 shadow-soft sm:p-8">
          <div className="eyebrow text-coral-deep">
            <Heart className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
            Support &amp; more
          </div>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Like what you see?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-cocoa">
            Wishify is free to use. If you’d like to support it, or see what else I’ve built, here’s
            where to find me.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${SITE.email}`}
              className="group flex items-center gap-3 rounded-xl border border-ink/[0.07] bg-white px-4 py-3 transition hover:border-coral/25"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cream text-coral">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-taupe">
                  Email
                </span>
                <span className="block truncate text-sm font-medium text-ink group-hover:text-coral-deep">
                  {SITE.email}
                </span>
              </span>
            </a>

            <a
              href={SITE.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-ink/[0.07] bg-white px-4 py-3 transition hover:border-coral/25"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cream text-coral">
                <Coffee className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-taupe">
                  Donate
                </span>
                <span className="block truncate text-sm font-medium text-ink group-hover:text-coral-deep">
                  Buy me a coffee
                </span>
              </span>
            </a>

            <div className="flex items-center gap-3 rounded-xl border border-ink/[0.07] bg-white px-4 py-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cream text-coral">
                <Wallet className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-taupe">
                  UPI
                </span>
                <UpiButton
                  showLabel={false}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition hover:text-coral-deep"
                />
              </span>
            </div>

            <a
              href={SITE.moreApps}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-ink/[0.07] bg-white px-4 py-3 transition hover:border-coral/25"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cream text-coral">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-taupe">
                  More apps
                </span>
                <span className="block truncate text-sm font-medium text-ink group-hover:text-coral-deep">
                  Apps &amp; extensions
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-[#F6F0E5] px-6 py-12 text-center sm:px-10 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-coral/15 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <h2 className="relative font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Say the thing you’ve been meaning to say.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cocoa">
            It takes two minutes. They might keep the link for years.
          </p>
          <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/create" variant="primary" size="lg">
              Create a wish
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Link
              to={`mailto:${SITE.email}`}
              className="text-sm font-medium text-cocoa underline-offset-4 hover:text-ink hover:underline"
            >
              Say hello: {SITE.email}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
