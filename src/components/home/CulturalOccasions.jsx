import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe2, Languages, Sparkles } from 'lucide-react'
import AnimatedContent from '../react-bits/AnimatedContent.jsx'
import OccasionCard from '../occasions/OccasionCard.jsx'
import OccasionArt from '../art/OccasionArt.jsx'
import { OCCASION_GROUPS, OCCASIONS_BY_GROUP, OCCASION_MAP, CULTURAL_OCCASIONS } from '../../lib/occasions.js'

const GROUPS = OCCASION_GROUPS.filter((group) => group.id !== 'everyday')
const SHOWCASE = ['diwali', 'eid-al-fitr', 'christmas', 'gurpurab']

export default function CulturalOccasions() {
  const [active, setActive] = useState('hindu')
  const group = GROUPS.find((item) => item.id === active) || GROUPS[0]
  const occasions = OCCASIONS_BY_GROUP[group.id] || []

  return (
    <section id="cultural" className="relative scroll-mt-24 overflow-hidden bg-[#160F0C] py-20 text-cream sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-coral/10 blur-3xl" />

      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <AnimatedContent>
            <p className="eyebrow text-gold-light/80">
              <span className="h-px w-6 bg-gold/60" />
              Faith, culture & celebration
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-[-0.02em] text-cream sm:text-[2.7rem]">
              Religious &amp; Cultural Wishes
            </h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-cream/70">
              Diwali diyas, Eid lanterns, Christmas lights, Vaisakhi harvests and more. Every
              tradition is presented with care — choose the occasion that belongs to you, write in
              your own language, and send something that feels personal.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.72rem] font-medium text-cream/60">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <Globe2 className="h-3.5 w-3.5 text-gold-light" aria-hidden="true" />
                {CULTURAL_OCCASIONS.length} cultural celebrations
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <Languages className="h-3.5 w-3.5 text-gold-light" aria-hidden="true" />
                English &amp; हिन्दी ideas
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-gold-light" aria-hidden="true" />
                Respectful, symbolic art
              </span>
            </div>
            <Link
              to="/create"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white"
            >
              Create a cultural wish
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </AnimatedContent>

          <AnimatedContent delay={0.1} className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {SHOWCASE.map((id, index) => {
                const occasion = OCCASION_MAP[id]
                if (!occasion) return null
                return (
                  <Link
                    key={id}
                    to={`/create?occasion=${id}`}
                    className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 shadow-lift ${
                      index % 2 ? 'translate-y-4' : ''
                    }`}
                  >
                    <span className="block aspect-[4/5]">
                      <OccasionArt
                        occasion={occasion}
                        className="h-full w-full transition-transform duration-[900ms] group-hover:scale-105"
                        rounded={false}
                      />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-3.5">
                      <span className="block font-display text-sm font-semibold text-white">{occasion.label}</span>
                      <span className="mt-0.5 block text-[0.6rem] text-white/65">{occasion.tagline}</span>
                    </span>
                  </Link>
                )
              })}
            </div>
            <p className="mt-5 text-center text-[0.62rem] leading-relaxed text-cream/45">
              Artwork is symbolic and made in-house — no borrowed religious imagery.
            </p>
          </AnimatedContent>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
            {GROUPS.map((item) => {
              const isActive = item.id === group.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-full border px-3.5 py-2 text-[0.7rem] font-semibold transition ${
                    isActive
                      ? 'border-cream bg-cream text-ink'
                      : 'border-white/15 bg-white/[0.04] text-cream/70 hover:border-white/35 hover:text-cream'
                  }`}
                >
                  {item.short}
                  <span className={`ml-1.5 text-[0.6rem] ${isActive ? 'text-ink/50' : 'text-cream/40'}`}>
                    {(OCCASIONS_BY_GROUP[item.id] || []).length}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-cream sm:text-2xl">
                {group.label}
              </h3>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-cream/55">{group.blurb}</p>
            </div>
            <Link
              to={`/create?occasion=${occasions[0]?.id || 'custom'}`}
              className="group inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-gold-light hover:text-cream"
            >
              Start with {group.short}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-6">
            {occasions.map((occasion) => (
              <OccasionCard
                key={occasion.id}
                occasion={occasion}
                to={`/create?occasion=${occasion.id}`}
                size="tall"
                className="!rounded-[1.15rem]"
              />
            ))}
          </div>

          <p className="mt-6 text-center text-[0.68rem] leading-relaxed text-cream/45">
            Looking for something else?{' '}
            <Link to="/create?occasion=custom" className="font-semibold text-gold-light underline-offset-4 hover:underline">
              Create a custom wish
            </Link>{' '}
            for any national, regional or personal celebration.
          </p>
        </div>
      </div>
    </section>
  )
}
