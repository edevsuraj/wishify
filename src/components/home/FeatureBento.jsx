import { Accessibility, Heart, Link2, Megaphone, ShieldCheck, Smartphone, Sparkles } from 'lucide-react'
import AnimatedContent from '../react-bits/AnimatedContent.jsx'

const SMALL_CARDS = [
  {
    icon: ShieldCheck,
    title: 'No account, no database',
    body: 'Names and messages are encoded into the link itself. There is no recipient list to leak and nothing to log in to.',
  },
  {
    icon: Smartphone,
    title: 'Made for thumbs',
    body: 'Most wishes are opened on WhatsApp. Every design is mobile-first, fast, and comfortable on a small screen.',
  },
  {
    icon: Accessibility,
    title: 'Calm by default',
    body: 'Choose full, subtle, or no animation. We also respect your device’s reduced-motion setting automatically.',
  },
  {
    icon: Megaphone,
    title: 'Ads that know their place',
    body: 'Monetisation is prepared but switched off until configured. When it is on, ads never cover a greeting or gate a feature.',
  },
]

export default function FeatureBento() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-page">
        <AnimatedContent className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-6 bg-coral/50" />
            Made with care
            <span className="h-px w-6 bg-coral/50" />
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-[2.6rem]">
            Small product, thoughtful details
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-cocoa">
            A greeting is a small, personal thing. Everything here is built to protect that feeling
            — not interrupt it.
          </p>
        </AnimatedContent>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <AnimatedContent className="md:col-span-2" y={20}>
            <article className="relative h-full overflow-hidden rounded-[1.8rem] border border-ink/[0.07] bg-ink p-7 text-cream shadow-soft sm:p-9">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral/20 blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div className="max-w-md">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cream/10 text-[#F0D9AE] ring-1 ring-cream/10">
                    <Link2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-cream">
                    A whole wish, inside one link
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-cream/65">
                    The occasion, names, message, design, and animation settings travel in the URL
                    fragment. That’s why a link works on any device — even incognito — without a
                    backend, database, or cookies.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/[0.06] px-3 py-1.5 text-[0.7rem] font-medium text-cream/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9AE6B4]" />
                    /wish/#eyJ2IjoxLCJvIjoi…
                  </span>
                  <span className="rounded-full border border-cream/15 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-cream/40">
                    never sent to a server
                  </span>
                </div>
              </div>
            </article>
          </AnimatedContent>

          {SMALL_CARDS.map((card, index) => {
            const Icon = card.icon
            return (
              <AnimatedContent key={card.title} delay={0.04 * (index + 1)} y={20}>
                <article className="group h-full rounded-[1.8rem] border border-ink/[0.07] bg-paper p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-coral/20 hover:shadow-lift sm:p-7">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-coral ring-1 ring-ink/[0.04] transition-transform duration-300 group-hover:-rotate-3">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[1.05rem] font-semibold tracking-tight text-ink">{card.title}</h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-cocoa">{card.body}</p>
                </article>
              </AnimatedContent>
            )
          })}

          <AnimatedContent delay={0.1} y={20}>
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.8rem] border border-coral/15 bg-gradient-to-br from-[#FFF1EA] via-[#FDE7E8] to-[#F9E6CE] p-6 shadow-soft sm:p-7">
              <div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 text-coral shadow-sm">
                  <Heart className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[1.05rem] font-semibold tracking-tight text-ink">
                  One good deed, delivered
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-cocoa">
                  A wish takes two minutes to make. It might be the nicest thing someone opens all
                  week. That trade feels worth it.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-coral-deep">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                free, always
              </div>
            </article>
          </AnimatedContent>
        </div>
      </div>
    </section>
  )
}
