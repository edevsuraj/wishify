import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Ban,
  Check,
  ChevronLeft,
  Copy,
  Feather,
  Heart,
  Languages,
  Lock,
  Maximize2,
  Monitor,
  Palette,
  PencilLine,
  Play,
  Plus,
  Quote,
  RotateCcw,
  Search,
  Shuffle,
  Smartphone,
  Sparkles,
  Wand2,
  X,
} from 'lucide-react'
import usePageMeta from '../lib/usePageMeta.js'
import { LIMITS } from '../lib/share.js'
import {
  OCCASION_GROUPS,
  OCCASION_IDS,
  OCCASIONS,
  OCCASIONS_BY_GROUP,
  getOccasion,
  getOccasionGroup,
  headingsFor,
  searchOccasions,
  suggestionsFor,
} from '../lib/occasions.js'
import {
  TEMPLATE_IDS,
  getTemplate,
  getTemplatesForOccasion,
  suggestedTemplates,
} from '../lib/templates.js'
import { buildWishUrl, sanitizeText } from '../lib/share.js'
import { createSampleWish } from '../lib/sample.js'
import { addRecentTemplate, clearDraft, readDraft, readRecentTemplates, saveDraft, EMPTY_DRAFT } from '../lib/session.js'
import { copyText } from '../lib/clipboard.js'
import Stepper from '../components/create/Stepper.jsx'
import ShareResult from '../components/create/ShareResult.jsx'
import TemplateThumb from '../components/templates/TemplateThumb.jsx'
import WishStage from '../components/greeting/WishStage.jsx'
import Modal from '../components/ui/Modal.jsx'
import Button from '../components/ui/Button.jsx'
import AdSlot from '../components/ads/AdSlot.jsx'
import { useToast } from '../components/ui/Toast.jsx'
import OccasionCard from '../components/occasions/OccasionCard.jsx'
import OccasionArt from '../components/art/OccasionArt.jsx'

const ANIMATION_OPTIONS = [
  { id: 'full', label: 'Full', hint: 'All the magic', icon: Sparkles },
  { id: 'subtle', label: 'Subtle', hint: 'Softer motion', icon: Feather },
  { id: 'none', label: 'None', hint: 'Still & calm', icon: Ban },
]

const STEP_ERROR_KEYS = {
  1: ['occasion'],
  2: ['template'],
  3: ['recipient', 'message', 'sender', 'heading', 'relationship'],
  4: ['occasion', 'template', 'recipient', 'message', 'sender', 'heading', 'relationship'],
}

function buildInitialWish(params) {
  const draft = readDraft()
  const base = { ...EMPTY_DRAFT, ...(draft || {}) }
  const queryOccasion = params.get('occasion')
  const queryTemplate = params.get('template')

  const occasion = OCCASION_IDS.includes(queryOccasion)
    ? queryOccasion
    : OCCASION_IDS.includes(base.occasion)
      ? base.occasion
      : null

  const template = TEMPLATE_IDS.includes(queryTemplate)
    ? queryTemplate
    : TEMPLATE_IDS.includes(base.template)
      ? base.template
      : null

  return {
    ...base,
    occasion,
    template,
    animation: ANIMATION_OPTIONS.some((option) => option.id === base.animation) ? base.animation : 'full',
  }
}

function resolveStartStep(wish, params) {
  const completed = wish.recipient.trim().length > 0 && wish.message.trim().length > 0
  const maxAllowed = !wish.occasion ? 1 : !wish.template ? 2 : completed ? 4 : 3
  const requested = Number.parseInt(params.get('step') || '', 10)

  if ([1, 2, 3, 4].includes(requested)) return Math.min(requested, maxAllowed)
  if (params.has('template') && wish.occasion) return Math.min(3, maxAllowed)
  if (completed && wish.occasion && wish.template) return 4
  if (!wish.occasion) return 1
  if (!wish.template) return 2
  return 3
}

function validateWish(wish) {
  const errors = {}
  const recipient = wish.recipient.trim()
  const message = wish.message.trim()

  if (!wish.occasion) errors.occasion = 'Pick an occasion to get started.'
  if (!wish.template) errors.template = 'Choose a design you love.'
  if (!recipient) errors.recipient = 'Add the recipient’s name.'
  else if (recipient.length > LIMITS.recipient) errors.recipient = `Keep the name under ${LIMITS.recipient} characters.`

  if (!message) errors.message = 'Write a short message — even one line matters.'
  else if (message.length < 3) errors.message = 'A few more words, please.'
  else if (message.length > LIMITS.message) errors.message = `Keep the message under ${LIMITS.message} characters.`

  if (wish.sender.trim().length > LIMITS.sender) errors.sender = `Keep your name under ${LIMITS.sender} characters.`
  if (wish.heading.trim().length > LIMITS.heading) errors.heading = `Keep the heading under ${LIMITS.heading} characters.`
  if (wish.relationship.trim().length > LIMITS.relationship) {
    errors.relationship = `Keep the relationship under ${LIMITS.relationship} characters.`
  }

  return errors
}

function errorsForStep(errors, step) {
  const keys = STEP_ERROR_KEYS[step] || []
  const result = {}
  for (const key of keys) {
    if (errors[key]) result[key] = errors[key]
  }
  return result
}

function FieldError({ children }) {
  if (!children) return null
  return <p className="mt-1.5 text-xs font-medium text-red-600">{children}</p>
}

function DesignOption({ template, selected, recommended, onSelect, onHover, occasionId }) {
  const occasion = getOccasion(occasionId)
  const sample = createSampleWish(occasionId || 'birthday', template.id)

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(template.id)}
      onMouseEnter={() => onHover?.(template.id)}
      onFocus={() => onHover?.(template.id)}
      onMouseLeave={() => onHover?.(null)}
      onBlur={() => onHover?.(null)}
      className={`group flex h-full flex-col rounded-2xl border p-2 text-left transition-all duration-200 ${
        selected
          ? 'border-coral bg-coral/[0.04] shadow-[0_0_0_4px_rgba(232,96,122,0.1)]'
          : 'border-ink/[0.08] bg-white hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-soft'
      }`}
    >
      <span className="relative block overflow-hidden rounded-xl ring-1 ring-ink/[0.05]">
        <span className="block transition-transform duration-500 group-hover:scale-[1.025]">
          <TemplateThumb template={template} name={sample.recipient} heading={occasion?.heading || 'A Wish'} />
        </span>
        {recommended && !selected && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-[0.12em] text-coral-deep shadow-sm backdrop-blur">
            Suggested
          </span>
        )}
        {selected && (
          <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-coral text-white shadow-md">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col px-0.5 pt-2.5">
        <span className="flex items-center justify-between gap-2">
          <span className="text-[0.8rem] font-semibold tracking-tight text-ink">{template.name}</span>
          <span className="shrink-0 text-[0.5rem] font-bold uppercase tracking-[0.12em] text-taupe">
            {template.vibe}
          </span>
        </span>
        <span className="mt-0.5 line-clamp-1 text-[0.64rem] leading-snug text-taupe">{template.blurb}</span>
      </span>
    </button>
  )
}

export default function Create() {
  usePageMeta(
    'Create a wish',
    'Choose an occasion, pick a design, write your message, and generate one shareable link. Free, private, and no sign-up.',
  )

  const { toast } = useToast()
  const [params, setParams] = useSearchParams()
  const [wish, setWish] = useState(() => buildInitialWish(params))
  const [step, setStep] = useState(() => resolveStartStep(wish, params))
  const [errors, setErrors] = useState({})
  const [generated, setGenerated] = useState(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const [device, setDevice] = useState('mobile')
  const [showFull, setShowFull] = useState(false)
  const [introMode, setIntroMode] = useState(false)
  const [replayKey, setReplayKey] = useState(0)
  const [suggestionSeed, setSuggestionSeed] = useState(0)
  const [recent, setRecent] = useState(() => readRecentTemplates())
  const [group, setGroup] = useState(() => getOccasion(wish.occasion)?.group || 'everyday')
  const [query, setQuery] = useState('')
  const [hoverTemplate, setHoverTemplate] = useState(null)

  const firstStepRender = useRef(true)
  const occasion = getOccasion(wish.occasion)
  const occasionGroup = getOccasionGroup(wish.occasion)
  const language = wish.lang === 'hi' ? 'hi' : 'en'
  const template = wish.template ? getTemplate(wish.template) : null

  const update = useCallback((key, value) => {
    setWish((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
    setGenerated(null)
  }, [])

  const selectOccasion = (id) => {
    const next = getOccasion(id)
    setGroup(next?.group || 'everyday')
    setQuery('')
    setWish((prev) => {
      const headingIsDefault =
        !prev.heading ||
        OCCASIONS.some(
          (item) =>
            item.heading === prev.heading ||
            item.headings?.includes(prev.heading) ||
            item.headingsHi?.includes(prev.heading),
        )
      const language = prev.lang === 'hi' ? 'hi' : 'en'
      const defaultHeading =
        language === 'hi' ? next?.headingsHi?.[0] || next?.heading : next?.heading
      return {
        ...prev,
        occasion: id,
        heading: headingIsDefault ? defaultHeading || '' : prev.heading,
        template: prev.template || next?.defaultTemplate || null,
      }
    })
    setErrors((prev) => {
      const next = { ...prev }
      delete next.occasion
      return next
    })
    setGenerated(null)
  }

  const setLanguage = (lang) => {
    setWish((prev) => {
      const headingIsDefault =
        !prev.heading ||
        OCCASIONS.some(
          (item) =>
            item.heading === prev.heading ||
            item.headings?.includes(prev.heading) ||
            item.headingsHi?.includes(prev.heading),
        )
      const current = getOccasion(prev.occasion)
      const defaultHeading =
        lang === 'hi'
          ? current?.headingsHi?.[0] || current?.heading
          : current?.heading
      return {
        ...prev,
        lang,
        heading: headingIsDefault ? defaultHeading || '' : prev.heading,
      }
    })
    setSuggestionSeed((seed) => seed + 1)
    setGenerated(null)
  }

  const selectTemplate = (id) => {
    update('template', id)
    setRecent(addRecentTemplate(id))
  }

  const copyCurrentMessage = async () => {
    if (!wish.message.trim()) {
      toast('Write something first — then you can copy it.', 'info')
      return
    }
    const ok = await copyText(wish.message)
    toast(ok ? 'Message copied.' : 'Couldn’t copy the message.', ok ? 'success' : 'error')
  }

  const suggestMessage = () => {
    const pool = suggestionsFor(occasion, language).filter((message) => message !== wish.message)
    if (!pool.length) return
    const pick = pool[Math.floor(Math.random() * pool.length)]
    update('message', pick)
  }

  const suggestTemplate = () => {
    const pool = getTemplatesForOccasion(wish.occasion).filter((item) => item.id !== wish.template)
    const list = pool.length ? pool : getTemplatesForOccasion(wish.occasion)
    const pick = list[Math.floor(Math.random() * list.length)]
    if (pick) {
      selectTemplate(pick.id)
      toast(`How about ${pick.name}?`, 'info')
    }
  }

  const maxStep = !wish.occasion
    ? 1
    : !wish.template
      ? 2
      : wish.recipient.trim() && wish.message.trim()
        ? 4
        : 3

  // Keep the URL shareable within the session: occasion, design and step.
  useEffect(() => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (wish.occasion) next.set('occasion', wish.occasion)
        else next.delete('occasion')
        if (wish.template) next.set('template', wish.template)
        else next.delete('template')
        next.set('step', String(step))
        if (next.toString() === prev.toString()) return prev
        return next
      },
      { replace: true },
    )
  }, [wish.occasion, wish.template, step, setParams])

  // Draft persistence (session only, for this tab).
  useEffect(() => {
    const timer = window.setTimeout(() => saveDraft(wish), 350)
    return () => window.clearTimeout(timer)
  }, [wish])

  useEffect(() => {
    if (firstStepRender.current) {
      firstStepRender.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step, generated])

  const goToStep = (nextStep) => {
    if (nextStep > maxStep) {
      toast('Finish the current step first — you’re nearly there.', 'info')
      return
    }
    setErrors({})
    setStep(nextStep)
  }

  const handleBack = () => {
    setStep((current) => Math.max(1, current - 1))
  }

  const handleNext = () => {
    const stepErrors = errorsForStep(validateWish(wish), step)
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors)
      toast(Object.values(stepErrors)[0], 'error')
      if (step === 3) {
        window.setTimeout(() => {
          document.getElementById(stepErrors.recipient ? 'wish-recipient' : 'wish-message')?.focus()
        }, 50)
      }
      return
    }
    setErrors({})
    if (wish.template) setRecent(addRecentTemplate(wish.template))
    setStep((current) => Math.min(4, current + 1))
  }

  const handleGenerate = () => {
    const allErrors = validateWish(wish)
    if (Object.keys(allErrors).length) {
      setErrors(allErrors)
      toast(Object.values(allErrors)[0], 'error')
      setStep(allErrors.occasion ? 1 : allErrors.template ? 2 : 3)
      return
    }

    const url = buildWishUrl(wish)
    if (url.length > 4000) {
      toast('That link is too long to work reliably. Try shortening the message.', 'error')
      return
    }

    setGenerated({ url })
    setRecent(addRecentTemplate(wish.template))
    setStep(4)
    toast('Your wish is ready. The link is waiting below.', 'success')
  }

  const resetAll = () => {
    clearDraft()
    setWish({ ...EMPTY_DRAFT })
    setErrors({})
    setGenerated(null)
    setStep(1)
    setConfirmReset(false)
    setIntroMode(false)
    setReplayKey((key) => key + 1)
    setRecent(readRecentTemplates())
    toast('Fresh start. Who’s the lucky person?', 'info')
  }

  const hasContent =
    Boolean(generated) ||
    Boolean(wish.recipient || wish.sender || wish.heading || wish.relationship || wish.message)

  const messageIdeas = useMemo(() => {
    const pool = suggestionsFor(occasion, language)
    if (!pool.length) return []
    const offset = suggestionSeed % pool.length
    return Array.from({ length: Math.min(3, pool.length) }, (_, index) => pool[(offset + index) % pool.length])
  }, [occasion, language, suggestionSeed])

  const headingIdeas = useMemo(
    () => headingsFor(occasion, language).filter((heading) => heading !== wish.heading).slice(0, 3),
    [occasion, language, wish.heading],
  )

  const previewKey = `${replayKey}-${wish.template || 'none'}`

  const renderStepOne = () => {
    const results = query.trim() ? searchOccasions(query) : OCCASIONS_BY_GROUP[group] || OCCASIONS
    const groupInfo = OCCASION_GROUPS.find((item) => item.id === group)

    return (
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="label-tiny">Step 1 of 4</p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              What are we celebrating?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-cocoa">
              Pick a moment from everyday milestones, or explore festivals and cultural
              celebrations. Everything can still be personalised.
            </p>
          </div>
          {occasion ? (
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-ink/[0.08] bg-white py-1 pl-1 pr-3 text-[0.7rem] font-semibold text-ink shadow-sm">
              <span className="h-7 w-7 overflow-hidden rounded-full">
                <OccasionArt occasion={occasion} className="h-full w-full" />
              </span>
              {occasion.label}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-cream px-3 py-1.5 text-[0.68rem] font-medium text-taupe">
              <Heart className="h-3.5 w-3.5 text-coral" fill="currentColor" aria-hidden="true" />
              Pick one to begin
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search occasions</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Diwali, Eid, birthday, Onam…"
              className="w-full rounded-full border border-ink/10 bg-cream/60 py-2.5 pl-10 pr-10 text-sm text-ink outline-none transition placeholder:text-taupe/70 focus:border-coral/40 focus:bg-white"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-taupe hover:bg-cream hover:text-ink"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </label>
        </div>

        <div className="no-scrollbar -mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {OCCASION_GROUPS.map((item) => {
            const active = !query && group === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setQuery('')
                  setGroup(item.id)
                }}
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold transition ${
                  active
                    ? 'border-ink bg-ink text-cream'
                    : 'border-ink/10 bg-white text-cocoa hover:border-ink/25 hover:text-ink'
                }`}
              >
                {item.short}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="text-[0.72rem] leading-relaxed text-taupe">
            {query ? `Results for “${query}”` : groupInfo?.blurb}
          </p>
          <p className="shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-taupe/80">
            {results.length} occasions
          </p>
        </div>

        <div
          role="radiogroup"
          aria-label="Choose an occasion"
          className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4"
        >
          {results.map((item) => (
            <OccasionCard
              key={item.id}
              occasion={item}
              active={wish.occasion === item.id}
              onSelect={selectOccasion}
              size="compact"
            />
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-4 rounded-2xl border border-dashed border-ink/15 bg-cream/50 px-4 py-8 text-center">
            <p className="text-sm font-semibold text-ink">No occasion matches “{query}”.</p>
            <p className="mt-1 text-xs text-taupe">
              Try a festival name, or choose Custom Wishes for anything else.
            </p>
          </div>
        )}

        <FieldError>{errors.occasion}</FieldError>

        <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-ink/[0.06] bg-cream/70 px-4 py-3 text-[0.72rem] leading-relaxed text-cocoa">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          Every tradition is presented respectfully. You can write in English, हिन्दी, or any
          language you like — or choose{' '}
          <strong className="mx-1 font-semibold text-ink">Custom Wishes</strong> for something else.
        </div>
      </div>
    )
  }

  const renderStepTwo = () => {
    const ordered = getTemplatesForOccasion(wish.occasion)
    const recommendedIds = new Set(suggestedTemplates(wish.occasion).map((item) => item.id))
    const recentTemplates = recent
      .map((id) => TEMPLATE_IDS.includes(id) && getTemplate(id))
      .filter((item) => item && item.id !== '__fallback__')
      .slice(0, 4)
    const previewTemplate = getTemplate(hoverTemplate || wish.template || ordered[0]?.id)
    const previewSample = createSampleWish(wish.occasion || 'birthday', previewTemplate.id)
    const previewOccasion = getOccasion(wish.occasion)
    const previewIsSelected = wish.template === previewTemplate.id

    return (
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="label-tiny">Step 2 of 4</p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Pick a look that feels like them.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-cocoa">
              {occasion
                ? `Twelve distinct designs, with the ones we’d suggest for ${occasion.label.toLowerCase()} badges first.`
                : 'Twelve distinct designs, each with its own layout, type, and personality.'}
            </p>
          </div>
          <button
            type="button"
            onClick={suggestTemplate}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-ink/12 bg-white px-3.5 py-2 text-xs font-semibold text-cocoa transition hover:-translate-y-0.5 hover:border-coral/30 hover:text-ink"
          >
            <Shuffle className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
            Surprise me
          </button>
        </div>

        {recentTemplates.length > 0 && (
          <div className="mt-5 rounded-2xl border border-ink/[0.06] bg-cream/70 p-3">
            <p className="label-tiny">Recently used this session</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {recentTemplates.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectTemplate(item.id)}
                  className={`flex items-center gap-2 rounded-xl border bg-white px-2 py-1.5 text-left text-[0.7rem] font-medium transition hover:-translate-y-0.5 hover:border-coral/30 ${
                    wish.template === item.id ? 'border-coral/40 text-coral-deep' : 'border-ink/10 text-cocoa'
                  }`}
                >
                  <span className="w-6 overflow-hidden rounded ring-1 ring-ink/10">
                    <TemplateThumb template={item} />
                  </span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_286px]">
          <div>
            <div
              role="radiogroup"
              aria-label="Choose a design"
              className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3"
            >
              {ordered.map((item) => (
                <DesignOption
                  key={item.id}
                  template={item}
                  selected={wish.template === item.id}
                  recommended={recommendedIds.has(item.id)}
                  onSelect={selectTemplate}
                  onHover={setHoverTemplate}
                  occasionId={wish.occasion}
                />
              ))}
            </div>

            <FieldError>{errors.template}</FieldError>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-[0.7rem] text-taupe">
              <Palette className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
              Selected:
              <span className="font-semibold text-ink">{template ? template.name : 'none yet'}</span>
              <span aria-hidden="true">·</span>
              <span>Switch designs any time without losing your words.</span>
            </div>
          </div>

          <aside className="xl:sticky xl:top-24 xl:self-start">
            <div className="overflow-hidden rounded-[1.4rem] border border-ink/[0.08] bg-[#EAE1D4] p-2 shadow-soft">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm">
                <TemplateThumb
                  template={previewTemplate}
                  name={previewSample.recipient}
                  heading={previewOccasion?.heading}
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                  {previewIsSelected ? 'Your design' : 'Preview'}
                </span>
              </div>
              <div className="px-2.5 pb-1.5 pt-3">
                <p className="font-display text-base font-semibold tracking-tight text-ink">
                  {previewTemplate.name}
                </p>
                <p className="mt-0.5 text-[0.7rem] leading-relaxed text-cocoa">{previewTemplate.blurb}</p>
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <span className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-taupe">
                    {previewTemplate.vibe}
                  </span>
                  {!previewIsSelected && (
                    <button
                      type="button"
                      onClick={() => selectTemplate(previewTemplate.id)}
                      className="rounded-full bg-ink px-3 py-1.5 text-[0.62rem] font-semibold text-cream transition hover:bg-cocoa"
                    >
                      Use this design
                    </button>
                  )}
                </div>
              </div>
            </div>
            <p className="mt-2.5 px-1 text-center text-[0.65rem] leading-relaxed text-taupe">
              Hover a design to see it larger. The preview matches the final greeting.
            </p>
          </aside>
        </div>
      </div>
    )
  }

  const renderStepThree = () => (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="label-tiny">Step 3 of 4</p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Now the words that matter.
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-cocoa">
            Write it the way you’d say it. The preview updates as you type, so you can watch it come
            together.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <span className="hidden rounded-full bg-sage/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-sage sm:inline-flex">
            Live preview
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="wish-recipient" className="field-label">
                <span>
                  Their name <span className="text-coral">*</span>
                </span>
                <span className="text-[0.68rem] font-normal text-taupe">
                  {wish.recipient.length}/{LIMITS.recipient}
                </span>
              </label>
              <input
                id="wish-recipient"
                type="text"
                value={wish.recipient}
                maxLength={LIMITS.recipient}
                onChange={(event) => update('recipient', event.target.value)}
                placeholder="e.g. Aanya"
                autoComplete="off"
                aria-invalid={Boolean(errors.recipient)}
                aria-describedby={errors.recipient ? 'recipient-error' : undefined}
                className="field-input"
              />
              <div id="recipient-error">
                <FieldError>{errors.recipient}</FieldError>
              </div>
            </div>

            <div>
              <label htmlFor="wish-relationship" className="field-label">
                <span>
                  Relationship <span className="text-[0.65rem] font-normal text-taupe">optional</span>
                </span>
                <span className="text-[0.68rem] font-normal text-taupe">
                  {wish.relationship.length}/{LIMITS.relationship}
                </span>
              </label>
              <input
                id="wish-relationship"
                type="text"
                list="relationship-options"
                value={wish.relationship}
                maxLength={LIMITS.relationship}
                onChange={(event) => update('relationship', event.target.value)}
                placeholder="Friend, sister, my person…"
                autoComplete="off"
                aria-invalid={Boolean(errors.relationship)}
                className="field-input"
              />
              <datalist id="relationship-options">
                {(occasion?.relationships || []).map((relationship) => (
                  <option key={relationship} value={relationship} />
                ))}
              </datalist>
              <FieldError>{errors.relationship}</FieldError>
            </div>

            <div>
              <label htmlFor="wish-sender" className="field-label">
                <span>
                  Your name <span className="text-[0.65rem] font-normal text-taupe">optional</span>
                </span>
                <span className="text-[0.68rem] font-normal text-taupe">
                  {wish.sender.length}/{LIMITS.sender}
                </span>
              </label>
              <input
                id="wish-sender"
                type="text"
                value={wish.sender}
                maxLength={LIMITS.sender}
                onChange={(event) => update('sender', event.target.value)}
                placeholder="Aarav"
                autoComplete="off"
                aria-invalid={Boolean(errors.sender)}
                className="field-input"
              />
              <FieldError>{errors.sender}</FieldError>
            </div>

            <div>
              <label htmlFor="wish-heading" className="field-label">
                <span>
                  Short heading <span className="text-[0.65rem] font-normal text-taupe">optional</span>
                </span>
                <span className="text-[0.68rem] font-normal text-taupe">
                  {wish.heading.length}/{LIMITS.heading}
                </span>
              </label>
              <input
                id="wish-heading"
                type="text"
                value={wish.heading}
                maxLength={LIMITS.heading}
                onChange={(event) => update('heading', event.target.value)}
                placeholder={occasion?.heading || 'A little something for you'}
                autoComplete="off"
                aria-invalid={Boolean(errors.heading)}
                className="field-input"
              />
              <FieldError>{errors.heading}</FieldError>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-taupe">
              <Languages className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
              Suggestion language
            </p>
            <div className="inline-flex rounded-full border border-ink/10 bg-white p-0.5" role="group" aria-label="Suggestion language">
              {[
                { id: 'en', label: 'English' },
                { id: 'hi', label: 'हिन्दी' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setLanguage(option.id)}
                  aria-pressed={language === option.id}
                  className={`rounded-full px-3 py-1 text-[0.66rem] font-semibold transition ${
                    language === option.id ? 'bg-ink text-cream' : 'text-cocoa hover:text-ink'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {headingIdeas.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-taupe">Heading ideas</span>
              {headingIdeas.map((heading) => (
                <button
                  key={heading}
                  type="button"
                  onClick={() => update('heading', heading)}
                  className="chip"
                >
                  {heading}
                </button>
              ))}
            </div>
          )}

          <div>
            <label htmlFor="wish-message" className="field-label">
              <span>
                Your message <span className="text-coral">*</span>
              </span>
              <span className="text-[0.68rem] font-normal text-taupe">
                {wish.message.length}/{LIMITS.message}
              </span>
            </label>
            <textarea
              id="wish-message"
              rows={6}
              value={wish.message}
              maxLength={LIMITS.message}
              onChange={(event) => update('message', event.target.value)}
              placeholder="Write it like you’d say it — the small, specific things always land best."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className="field-input resize-y leading-relaxed"
            />
            <div id="message-error">
              <FieldError>{errors.message}</FieldError>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={suggestMessage}
                className="chip"
                title="Fill in a random suggested message"
              >
                <Wand2 className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
                Surprise me
              </button>
              <button
                type="button"
                onClick={() => setSuggestionSeed((seed) => seed + 1)}
                className="chip"
                title="Show three different suggestions"
              >
                <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
                More ideas
              </button>
              <button type="button" onClick={copyCurrentMessage} className="chip">
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                Copy
              </button>
            </div>

            {messageIdeas.length > 0 && (
              <div className="mt-3 space-y-2">
                {messageIdeas.map((idea) => {
                  const selected = wish.message.trim() === idea.trim()
                  return (
                    <button
                      key={idea}
                      type="button"
                      onClick={() => update('message', idea)}
                      className={`group flex w-full items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[0.74rem] leading-relaxed transition ${
                        selected
                          ? 'border-coral/30 bg-coral/[0.05] text-ink'
                          : 'border-ink/[0.07] bg-cream/60 text-cocoa hover:border-coral/25 hover:bg-white'
                      }`}
                    >
                      <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral/60" aria-hidden="true" />
                      <span className="flex-1">{idea}</span>
                      {selected ? (
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral" aria-hidden="true" />
                      ) : (
                        <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-taupe/50 transition group-hover:text-coral" aria-hidden="true" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <fieldset>
            <legend className="field-label">
              Animation preference
              <span className="text-[0.65rem] font-normal text-taupe">Reduced motion is always respected</span>
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {ANIMATION_OPTIONS.map((option) => {
                const Icon = option.icon
                const active = wish.animation === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => update('animation', option.id)}
                    className={`flex flex-col items-start gap-1.5 rounded-xl border px-3 py-2.5 text-left transition ${
                      active
                        ? 'border-coral/40 bg-coral/[0.06] text-ink'
                        : 'border-ink/10 bg-white text-cocoa hover:border-ink/20'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? 'text-coral' : 'text-taupe'}`} aria-hidden="true" />
                    <span className="text-[0.78rem] font-semibold">{option.label}</span>
                    <span className="text-[0.62rem] leading-none text-taupe">{option.hint}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.6rem] border border-ink/[0.08] bg-[#EAE1D4] p-2.5 shadow-soft">
            <div className="mb-2 flex items-center justify-between px-1.5">
              <span className="label-tiny">Live preview</span>
              <span className="max-w-[60%] truncate text-[0.65rem] font-medium text-taupe">
                {template?.name || 'Choose a design'}
              </span>
            </div>
            <div className="h-[440px] overflow-hidden rounded-2xl bg-white ring-1 ring-ink/[0.05] sm:h-[540px]">
              <WishStage key={wish.template || 'preview'} wish={wish} autoOpen />
            </div>
          </div>
          <p className="mt-3 text-center text-[0.68rem] leading-relaxed text-taupe">
            Updates instantly. Your words and chosen design are saved in this tab.
          </p>
        </div>
      </div>
    </div>
  )

  const renderStepFour = () => (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="label-tiny">Step 4 of 4</p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            One last look before it travels.
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-cocoa">
            This is exactly what they’ll see. Try both screen sizes, replay the reveal, then generate
            your link.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <span className="hidden rounded-full bg-sage/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-sage sm:inline-flex">
            Nothing sent yet
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr] xl:gap-8">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-ink/[0.07] bg-cream/70 p-2">
            <div className="flex items-center gap-1 rounded-full border border-ink/10 bg-white p-1">
              <button
                type="button"
                onClick={() => setDevice('mobile')}
                aria-pressed={device === 'mobile'}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.68rem] font-semibold transition ${
                  device === 'mobile' ? 'bg-ink text-cream' : 'text-cocoa hover:text-ink'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                Mobile
              </button>
              <button
                type="button"
                onClick={() => setDevice('desktop')}
                aria-pressed={device === 'desktop'}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.68rem] font-semibold transition ${
                  device === 'desktop' ? 'bg-ink text-cream' : 'text-cocoa hover:text-ink'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                Desktop
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() => setReplayKey((key) => key + 1)}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[0.66rem] font-semibold text-cocoa transition hover:bg-white hover:text-ink"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Replay
              </button>
              <button
                type="button"
                onClick={() => {
                  setIntroMode((value) => !value)
                  setReplayKey((key) => key + 1)
                }}
                aria-pressed={introMode}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[0.66rem] font-semibold transition ${
                  introMode ? 'bg-coral/10 text-coral-deep' : 'text-cocoa hover:bg-white hover:text-ink'
                }`}
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                Opening
              </button>
              <button
                type="button"
                onClick={() => setShowFull(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[0.66rem] font-semibold text-cocoa shadow-sm ring-1 ring-ink/[0.06] transition hover:text-ink"
              >
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                Full screen
              </button>
            </div>
          </div>

          <div className="mt-4">
            {device === 'mobile' ? (
              <div className="mx-auto w-full max-w-[360px]">
                <div className="rounded-[2.7rem] border-[9px] border-[#211A16] bg-[#211A16] shadow-lift">
                  <div className="relative h-[520px] overflow-hidden rounded-[2.05rem] bg-[#0E0B09] sm:h-[580px]">
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-2 z-30 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/15"
                    />
                    <WishStage key={previewKey} wish={wish} autoOpen={!introMode} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-ink/15 bg-[#211A16] p-2 shadow-lift">
                <div className="flex items-center gap-1.5 px-2 pb-2 pt-1">
                  <span className="h-2 w-2 rounded-full bg-[#F26B5E]" />
                  <span className="h-2 w-2 rounded-full bg-[#F2C14E]" />
                  <span className="h-2 w-2 rounded-full bg-[#7BC47F]" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-white/10 px-2 py-1 text-[0.55rem] text-white/45">
                    wishify.app/wish/#your-wish
                  </span>
                </div>
                <div className="h-[520px] overflow-hidden rounded-xl bg-white">
                  <WishStage key={previewKey} wish={wish} autoOpen={!introMode} />
                </div>
              </div>
            )}
          </div>

          <p className="mt-3 text-center text-[0.68rem] leading-relaxed text-taupe">
            {introMode
              ? 'The sealed opening is showing. Click “Open Your Surprise” inside the preview to reveal the card.'
              : 'This is the recipient’s view. Use “Opening” to preview the reveal animation.'}
          </p>
        </div>

        <aside className="space-y-3.5">
          <div className="rounded-2xl border border-ink/[0.07] bg-cream/70 p-5">
            <p className="label-tiny">Final check</p>
            <div className="mt-3 flex items-start gap-3">
              <div className="w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-ink/10">
                <TemplateThumb
                  template={template}
                  name={wish.recipient || 'Someone Special'}
                  heading={wish.heading || occasion?.heading}
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{template?.name || 'No design yet'}</p>
                <p className="mt-0.5 text-[0.7rem] text-taupe">
                  {occasion ? `${occasionGroup?.label || occasion.label} · ${occasion.label}` : 'Occasion needed'}
                </p>
              </div>
            </div>

            <dl className="mt-4 space-y-2.5 border-t border-ink/[0.07] pt-4 text-[0.78rem]">
              <div className="flex justify-between gap-3">
                <dt className="text-taupe">To</dt>
                <dd className="max-w-[65%] truncate text-right font-medium text-ink">
                  {wish.recipient || '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-taupe">From</dt>
                <dd className="max-w-[65%] truncate text-right font-medium text-ink">
                  {wish.sender || 'Not shown'}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-taupe">Animation</dt>
                <dd className="text-right font-medium capitalize text-ink">{wish.animation}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-taupe">Message</dt>
                <dd className="text-right font-medium text-ink">{wish.message.length} characters</dd>
              </div>
            </dl>

            <p className="mt-4 line-clamp-4 rounded-xl bg-white/70 px-3 py-2.5 font-display text-[0.78rem] italic leading-relaxed text-cocoa">
              “{wish.message || 'Your message will appear here.'}”
            </p>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="mt-4 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-cocoa underline-offset-4 hover:text-ink hover:underline"
            >
              <PencilLine className="h-3.5 w-3.5" aria-hidden="true" />
              Edit details
            </button>
          </div>

          <div className="rounded-2xl border border-ink/[0.07] bg-white p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Lock className="h-4 w-4 text-sage" aria-hidden="true" />
              Before you generate
            </p>
            <ul className="mt-2.5 space-y-1.5 text-[0.72rem] leading-relaxed text-cocoa">
              <li>• Anyone with the link can open this wish.</li>
              <li>• It isn’t stored on a server, and can’t be edited or revoked.</li>
              <li>• Keep the message short enough for chat apps.</li>
            </ul>
            <div className="mt-4 flex items-center gap-1.5 rounded-xl bg-sage/10 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-sage">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Ready when you are
            </div>
          </div>

          <p className="px-1 text-center text-[0.65rem] leading-relaxed text-taupe">
            Nothing leaves your browser until you choose to share the generated link.
          </p>
        </aside>
      </div>
    </div>
  )

  const nextLabel =
    step === 1 ? 'Choose a design' : step === 2 ? 'Write the words' : step === 3 ? 'Preview the wish' : 'Generate'

  return (
    <>
      <section className="relative overflow-hidden pb-8 pt-10 sm:pt-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-aurora opacity-45" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grain opacity-[0.02]" />
        <div className="container-page relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">
                <span className="h-px w-6 bg-coral/50" />
                Create a wish
              </p>
              <h1 className="mt-3 max-w-2xl font-display text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink sm:text-5xl">
                {wish.recipient.trim()
                  ? `Let’s make ${wish.recipient.trim()}’s day.`
                  : 'Let’s make someone’s day.'}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-cocoa sm:text-[0.98rem]">
                Pick a moment, choose a look, and say the thing that matters. You can change
                everything until you generate the link.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden text-[0.68rem] text-taupe sm:inline">Draft saved in this tab</span>
              <button
                type="button"
                onClick={() => (hasContent ? setConfirmReset(true) : resetAll())}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/70 px-3.5 py-2 text-xs font-semibold text-cocoa transition hover:border-ink/25 hover:bg-white hover:text-ink"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Start fresh
              </button>
            </div>
          </div>

          <div className="mt-8">
            <Stepper current={generated ? 4 : step} maxStep={generated ? 4 : maxStep} onSelect={goToStep} />
          </div>
        </div>
      </section>

      <div className="container-page pb-16">
        <div className="relative rounded-[1.8rem] border border-ink/[0.07] bg-paper p-4 shadow-soft sm:rounded-[2rem] sm:p-7 lg:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={generated ? 'share-result' : `step-${step}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {generated ? (
                <ShareResult
                  wish={wish}
                  url={generated.url}
                  onEdit={() => {
                    setGenerated(null)
                    setStep(3)
                  }}
                  onCreateAnother={resetAll}
                />
              ) : step === 1 ? (
                renderStepOne()
              ) : step === 2 ? (
                renderStepTwo()
              ) : step === 3 ? (
                renderStepThree()
              ) : (
                renderStepFour()
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {!generated && (
          <div className="sticky bottom-3 z-30 mt-4 flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-paper/95 p-2.5 shadow-lift backdrop-blur-md sm:px-4">
            <div className="hidden items-center gap-2 pl-2 text-[0.7rem] text-taupe sm:flex">
              <Lock className="h-3.5 w-3.5 text-sage" aria-hidden="true" />
              Step {step} of 4 · saved in this tab
            </div>
            <div className="flex flex-1 items-center justify-between gap-2 sm:flex-none">
              <Button variant="ghost" size="md" onClick={handleBack} disabled={step === 1}>
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </Button>
              {step < 4 ? (
                <Button variant="primary" size="md" onClick={handleNext}>
                  {nextLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button variant="coral" size="md" onClick={handleGenerate}>
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Generate Shareable Link
                </Button>
              )}
            </div>
          </div>
        )}

        <AdSlot placement="create" className="mt-10" />
      </div>

      <Modal
        open={showFull}
        onClose={() => setShowFull(false)}
        label="Full screen wish preview"
        bare
        className="max-w-[1100px] bg-[#0E0B09]"
      >
        <div className="h-[min(88svh,900px)] w-full overflow-hidden rounded-3xl">
          <WishStage key={`full-${previewKey}`} wish={wish} autoOpen={!introMode} />
        </div>
      </Modal>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} label="Start a new wish">
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cream text-coral">
            <RotateCcw className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
            Start with a clean page?
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-cocoa">
            This clears the draft saved in this tab. Any link you’ve already generated and shared
            will keep working.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>
              Keep editing
            </Button>
            <Button variant="coral" onClick={resetAll}>
              Start fresh
            </Button>
          </div>
        </div>
      </Modal>

      <p className="container-page pb-10 text-center text-[0.65rem] text-taupe">
        Prefer to browse first?{' '}
        <Link to="/templates" className="font-medium text-cocoa underline-offset-4 hover:text-ink hover:underline">
          Explore all twelve designs
        </Link>
      </p>
    </>
  )
}
