import { Link } from 'react-router-dom'
import { ArrowRight, Eye } from 'lucide-react'
import AnimatedContent from '../react-bits/AnimatedContent.jsx'
import TemplateThumb from '../templates/TemplateThumb.jsx'
import { TEMPLATES } from '../../lib/templates.js'

const FEATURED_IDS = [
  'elegant-celebration',
  'romantic-hearts',
  'magical-night-sky',
  'colorful-confetti',
  'paper-card',
  'cinematic-surprise',
]

const SAMPLE_NAMES = {
  'elegant-celebration': ['Aanya', 'Happy Birthday'],
  'romantic-hearts': ['Meera', 'Happy Anniversary'],
  'magical-night-sky': ['Kabir', 'Good Night'],
  'colorful-confetti': ['Ria', 'Happy Birthday'],
  'paper-card': ['Nani', 'Thank You'],
  'cinematic-surprise': ['Dev', 'With Love'],
}

export default function FeaturedDesigns() {
  const designs = FEATURED_IDS.map((id) => TEMPLATES.find((template) => template.id === id)).filter(Boolean)

  return (
    <section className="relative overflow-hidden bg-[#F4EDE2] py-20 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-coral/10 blur-3xl" />
      <div className="container-page relative">
        <AnimatedContent className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">
              <span className="h-px w-6 bg-coral/50" />
              The gallery
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              Designs with a point of view
            </h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-cocoa">
              Not twelve colour swaps — twelve little worlds. Every one has its own layout,
              typography, ornaments, and personality.
            </p>
          </div>
          <Link
            to="/templates"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition hover:bg-[#3A2C24] sm:self-auto"
          >
            Explore all 12 designs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </AnimatedContent>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((template, index) => {
            const [name, heading] = SAMPLE_NAMES[template.id] || ['Aanya', 'Happy Birthday']
            return (
              <AnimatedContent key={template.id} delay={Math.min(index * 0.05, 0.25)} y={20}>
                <article className="group relative overflow-hidden rounded-[1.6rem] border border-white/60 bg-white/50 p-2.5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <Link
                    to={`/create?template=${template.id}`}
                    className="block overflow-hidden rounded-[1.1rem] ring-1 ring-ink/[0.06]"
                    aria-label={`Create a wish with the ${template.name} design`}
                  >
                    <div className="relative">
                      <TemplateThumb template={template} name={name} heading={heading} />
                      <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/5" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink shadow-sm backdrop-blur">
                        {template.vibe}
                      </span>
                    </div>
                  </Link>
                  <div className="flex items-end justify-between gap-3 px-2 pb-1.5 pt-3.5">
                    <div>
                      <h3 className="text-[0.98rem] font-semibold tracking-tight text-ink">{template.name}</h3>
                      <p className="mt-0.5 text-[0.75rem] leading-snug text-taupe">{template.blurb}</p>
                    </div>
                    <Link
                      to={`/create?template=${template.id}`}
                      aria-label={`Use ${template.name}`}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/10 bg-white text-cocoa transition group-hover:border-coral/30 group-hover:bg-coral group-hover:text-white"
                    >
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </AnimatedContent>
            )
          })}
        </div>

        <AnimatedContent delay={0.1} className="mt-8 flex items-center justify-center gap-2 text-xs text-taupe">
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          Every design supports your own words, names, and animation preference.
        </AnimatedContent>
      </div>
    </section>
  )
}
