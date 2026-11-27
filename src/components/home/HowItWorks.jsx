import { ArrowRight, Palette, PartyPopper, Send } from 'lucide-react'
import AnimatedContent from '../react-bits/AnimatedContent.jsx'
import Button from '../ui/Button.jsx'
import { OCCASION_MAP } from '../../lib/occasions.js'

const MINI = ['birthday', 'anniversary', 'good-night']

const STEPS = [
  {
    icon: PartyPopper,
    number: '01',
    title: 'Choose the moment',
    body: 'Birthday, anniversary, good night, or no reason at all. Start with the occasion and the feeling.',
    extra: (
      <div className="flex flex-wrap gap-1.5">
        {MINI.map((id) => {
          const occasion = OCCASION_MAP[id]
          if (!occasion) return null
          return (
            <span key={id} className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white py-1 pl-1 pr-2.5 text-[0.68rem] font-medium text-cocoa">
              <span className="h-5 w-5 overflow-hidden rounded-full">
                <img src={occasion.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </span>
              {occasion.label}
            </span>
          )
        })}
      </div>
    ),
  },
  {
    icon: Palette,
    number: '02',
    title: 'Make it yours',
    body: 'Pick from 12 hand-crafted designs, add names, a heading, and words that sound like you.',
    extra: (
      <div className="flex items-center gap-1.5 rounded-xl border border-ink/10 bg-white px-2.5 py-2">
        {['#D14A66', '#E9A23B', '#7E9A83', '#4C5BAA', '#241C18'].map((color) => (
          <span key={color} className="h-4 w-4 rounded-full ring-1 ring-black/5" style={{ background: color }} />
        ))}
        <span className="ml-1 font-display text-[0.72rem] italic text-cocoa">for Aanya</span>
      </div>
    ),
  },
  {
    icon: Send,
    number: '03',
    title: 'Send one link',
    body: 'Preview it live, then copy, scan, or send on WhatsApp. It opens beautifully on any device.',
    extra: (
      <div className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-2.5 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
        <span className="truncate text-[0.68rem] font-medium text-taupe">wishify.app/wish/#aGVsbG8…</span>
      </div>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 overflow-hidden bg-paper py-20 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.18]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />
      <div className="container-page relative">
        <AnimatedContent className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-6 bg-coral/50" />
            How it works
            <span className="h-px w-6 bg-coral/50" />
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-[2.6rem]">
            Three little steps to a big smile
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-cocoa">
            No apps to install, no accounts to create, no waiting for a text back. Just a thoughtful
            five-minute detour that someone will remember.
          </p>
        </AnimatedContent>

        <div className="relative mt-12 grid gap-5 md:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-[3.2rem] hidden border-t border-dashed border-ink/15 md:block"
          />
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <AnimatedContent key={step.number} delay={index * 0.09}>
                <article className="group relative flex h-full flex-col rounded-[1.75rem] border border-ink/[0.07] bg-cream/90 p-6 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-coral/25 hover:shadow-lift sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-cream shadow-soft transition-transform duration-300 group-hover:-rotate-3">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-[2.4rem] font-light leading-none text-ink/10">{step.number}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-cocoa">{step.body}</p>
                  <div className="mt-5">{step.extra}</div>
                </article>
              </AnimatedContent>
            )
          })}
        </div>

        <AnimatedContent delay={0.15} className="mt-10 flex flex-col items-center gap-3">
          <Button to="/create" variant="primary" size="lg">
            Start a wish
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </AnimatedContent>
      </div>
    </section>
  )
}
