import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AnimatedContent from '../react-bits/AnimatedContent.jsx'
import OccasionCard from '../occasions/OccasionCard.jsx'
import { CORE_OCCASIONS } from '../../lib/occasions.js'

export default function Occasions() {
  return (
    <section id="occasions" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-coral/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-page relative">
        <AnimatedContent className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">
              <span className="h-px w-6 bg-coral/50" />
              Real moments, beautifully sent
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              Every occasion has a feeling
            </h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-cocoa">
              Twelve starting points, from the obvious to the just-because. Pick one and we’ll
              suggest designs and words that fit.
            </p>
          </div>
          <Link
            to="/create"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-ink/12 bg-white/70 px-4 py-2.5 text-sm font-medium text-cocoa transition hover:border-ink/25 hover:bg-white hover:text-ink sm:self-auto"
          >
            Start from scratch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </AnimatedContent>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {CORE_OCCASIONS.map((occasion, index) => (
            <AnimatedContent key={occasion.id} delay={Math.min(index * 0.035, 0.3)} y={18}>
              <OccasionCard
                occasion={occasion}
                to={`/create?occasion=${occasion.id}`}
                size="tall"
                showBlurb={false}
                priority={index < 4}
              />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
