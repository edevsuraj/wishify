import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Shuffle, Sparkles } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta.js'
import {
  OCCASION_GROUPS,
  OCCASION_MAP,
  OCCASIONS,
  OCCASIONS_BY_GROUP,
} from '../lib/occasions.js'
import { TEMPLATES } from '../lib/templates.js'
import { createSampleWish } from '../lib/sample.js'
import TemplateThumb from '../components/templates/TemplateThumb.jsx'
import Modal from '../components/ui/Modal.jsx'
import Button from '../components/ui/Button.jsx'
import WishStage from '../components/greeting/WishStage.jsx'
import AnimatedContent from '../components/react-bits/AnimatedContent.jsx'
import AdSlot from '../components/ads/AdSlot.jsx'
import OccasionArt from '../components/art/OccasionArt.jsx'

const FILTERS = [
  { id: 'all', label: 'All designs', group: null, sample: 'birthday' },
  { id: 'everyday', label: 'Everyday', group: 'everyday', sample: 'birthday' },
  { id: 'hindu', label: 'Hindu', group: 'hindu', sample: 'diwali' },
  { id: 'islamic', label: 'Islamic', group: 'islamic', sample: 'eid-al-fitr' },
  { id: 'christian', label: 'Christian', group: 'christian', sample: 'christmas' },
  { id: 'sikh', label: 'Sikh', group: 'sikh', sample: 'gurpurab' },
  { id: 'buddhist', label: 'Buddhist', group: 'buddhist', sample: 'buddha-purnima' },
  { id: 'jain', label: 'Jain', group: 'jain', sample: 'mahavir-jayanti' },
  { id: 'national', label: 'National', group: 'national', sample: 'independence-day' },
  { id: 'regional', label: 'Regional', group: 'regional', sample: 'onam' },
]

const CULTURAL_SHORTCUTS = ['diwali', 'eid-al-fitr', 'christmas', 'gurpurab']

export default function Templates() {
  usePageMeta(
    'Designs',
    'Explore twelve hand-crafted greeting designs — botanical, cinematic, neon, handwritten and more. Preview each one with your own occasion.',
  )

  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState('all')
  const initialOccasion = params.get('occasion')
  const [previewOccasion, setPreviewOccasion] = useState(
    initialOccasion && OCCASION_MAP[initialOccasion] ? initialOccasion : 'birthday',
  )
  const [replayKey, setReplayKey] = useState(0)

  const designParam = params.get('design')
  const previewTemplate = designParam ? TEMPLATES.find((template) => template.id === designParam) : null
  const activeFilter = FILTERS.find((item) => item.id === filter) || FILTERS[0]
  const sampleOccasion = OCCASION_MAP[filter] || OCCASION_MAP[activeFilter.sample] || OCCASION_MAP.birthday

  const designs = useMemo(
    () =>
      activeFilter.group
        ? TEMPLATES.filter((template) => template.groups?.includes(activeFilter.group))
        : TEMPLATES,
    [activeFilter.group],
  )

  const openPreview = (template) => {
    setReplayKey((key) => key + 1)
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('design', template.id)
        return next
      },
      { replace: false },
    )
  }

  const closePreview = () => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete('design')
        return next
      },
      { replace: true },
    )
  }

  const surpriseMe = () => {
    const pool = designs.length ? designs : TEMPLATES
    const pick = pool[Math.floor(Math.random() * pool.length)]
    openPreview(pick)
  }

  const sampleWish = previewTemplate
    ? createSampleWish(previewOccasion, previewTemplate.id)
    : null

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-12 sm:pt-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-aurora opacity-60" />
        <div className="container-page relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">
                <span className="h-px w-6 bg-coral/50" />
                The gallery
              </p>
              <h1 className="mt-4 font-display text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.025em] text-ink sm:text-6xl">
                Twelve designs.
                <span className="block font-display italic text-coral-deep">One very happy recipient.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-cocoa">
                Each design is its own little world — different type, layout, ornaments, and
                animation. Preview any of them with your occasion, then make it yours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={surpriseMe} size="lg">
                <Shuffle className="h-4 w-4" aria-hidden="true" />
                Surprise me
              </Button>
              <Button to="/create" variant="primary" size="lg">
                Create a wish
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div
            className="mt-9 flex gap-2 overflow-x-auto pb-2 nice-scroll"
            role="tablist"
            aria-label="Filter designs by occasion"
          >
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  filter === item.id
                    ? 'border-ink bg-ink text-cream'
                    : 'border-ink/12 bg-white/70 text-cocoa hover:border-ink/25 hover:bg-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="flex items-center justify-between text-xs text-taupe">
          <p>
            Showing <span className="font-semibold text-ink">{designs.length}</span>{' '}
            {designs.length === 1 ? 'design' : 'designs'}
            {filter !== 'all' ? ` for ${activeFilter.label.toLowerCase()}` : ''}
          </p>
          <p className="hidden items-center gap-1.5 sm:flex">
            <Check className="h-3.5 w-3.5 text-sage" aria-hidden="true" />
            All designs free
          </p>
        </div>

        {designs.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-ink/15 bg-white/50 px-6 py-16 text-center">
            <span className="text-3xl">🪄</span>
            <h2 className="mt-3 text-xl font-semibold text-ink">No designs for this filter yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-cocoa">
              That’s unusual — try another occasion, or start from a blank canvas and pick any
              design you love.
            </p>
            <Button to="/create" variant="primary" className="mt-5">
              Start a wish
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {designs.map((template, index) => (
              <AnimatedContent key={template.id} delay={Math.min(index * 0.03, 0.24)} y={16}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/[0.07] bg-paper p-2.5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-coral/20 hover:shadow-lift">
                  <button
                    type="button"
                    onClick={() => openPreview(template)}
                    className="relative overflow-hidden rounded-[1.05rem] ring-1 ring-ink/[0.06]"
                    aria-label={`Preview ${template.name}`}
                  >
                    <TemplateThumb
                      template={template}
                      name={createSampleWish(sampleOccasion.id, template.id).recipient}
                      heading={sampleOccasion.heading}
                    />
                    <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/60 via-transparent to-transparent pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink shadow-soft">
                        <Sparkles className="h-3 w-3 text-coral" aria-hidden="true" />
                        Live preview
                      </span>
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col px-2 pb-1.5 pt-4">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-[0.98rem] font-semibold tracking-tight text-ink">{template.name}</h2>
                      <span className="shrink-0 rounded-full bg-cream px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.12em] text-taupe">
                        {template.vibe}
                      </span>
                    </div>
                    <p className="mt-1 flex-1 text-[0.76rem] leading-relaxed text-taupe">{template.blurb}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Link
                        to={`/create?template=${template.id}&occasion=${sampleOccasion.id}`}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-3 py-2 text-[0.72rem] font-semibold text-cream transition hover:bg-[#3A2C24]"
                      >
                        Use this design
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => openPreview(template)}
                        className="grid h-8 w-8 place-items-center rounded-full border border-ink/10 text-cocoa transition hover:border-ink/25 hover:text-ink"
                        aria-label={`Preview ${template.name} full screen`}
                      >
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              </AnimatedContent>
            ))}
          </div>
        )}
      </section>

      <AdSlot placement="templates" className="pb-14" />

      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-ink/[0.06] bg-[#F1E9DC] p-8 sm:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-coral/15 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Still deciding?</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Let the moment pick for you.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-cocoa">
                Choose an occasion and we’ll suggest designs that suit it. You can switch at any
                time without losing a single word.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {CULTURAL_SHORTCUTS.map((id) => {
                const occasion = OCCASION_MAP[id]
                if (!occasion) return null
                return (
                  <Link
                    key={occasion.id}
                    to={`/create?occasion=${occasion.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 py-1.5 pl-1.5 pr-3.5 text-xs font-medium text-cocoa transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
                  >
                    <span className="h-7 w-7 overflow-hidden rounded-full ring-1 ring-black/5">
                      {occasion.image ? (
                        <img src={occasion.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <OccasionArt occasion={occasion} className="h-full w-full" />
                      )}
                    </span>
                    {occasion.label}
                  </Link>
                )
              })}
              <Button to="/create" variant="primary" size="sm">
                Start a wish
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={Boolean(previewTemplate)}
        onClose={closePreview}
        label={previewTemplate ? `${previewTemplate.name} preview` : 'Design preview'}
        bare
        className="bg-paper"
      >
        {previewTemplate && sampleWish && (
          <div className="flex flex-col">
            <div className="relative h-[min(70svh,720px)] w-full overflow-hidden bg-[#1B1512]">
              <WishStage
                key={`${previewTemplate.id}-${previewOccasion}-${replayKey}`}
                wish={sampleWish}
                autoOpen
              />
            </div>
            <div className="flex flex-col gap-4 border-t border-ink/[0.07] bg-paper p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{previewTemplate.name}</p>
                <p className="truncate text-xs text-taupe">{previewTemplate.blurb}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-taupe">
                  Preview as
                  <select
                    value={previewOccasion}
                    onChange={(event) => setPreviewOccasion(event.target.value)}
                    className="max-w-[13rem] rounded-full border border-ink/12 bg-white px-3 py-1.5 text-xs font-medium normal-case tracking-normal text-cocoa outline-none focus:border-coral/50"
                  >
                    {OCCASION_GROUPS.map((group) => (
                      <optgroup key={group.id} label={group.label}>
                        {(OCCASIONS_BY_GROUP[group.id] || []).map((occasion) => (
                          <option key={occasion.id} value={occasion.id}>
                            {occasion.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </label>
                <Button
                  to={`/create?occasion=${previewOccasion}&template=${previewTemplate.id}`}
                  variant="coral"
                  size="md"
                >
                  Use this design
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
