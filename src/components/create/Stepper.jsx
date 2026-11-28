import { Check } from 'lucide-react'

const STEPS = [
  { number: 1, label: 'Occasion', short: 'Occasion' },
  { number: 2, label: 'Design', short: 'Design' },
  { number: 3, label: 'Words & send', short: 'Send' },
]

export default function Stepper({ current, maxStep = 3, onSelect }) {
  return (
    <nav aria-label="Wish creation progress">
      <ol className="grid grid-cols-3 gap-1.5 sm:gap-3">
        {STEPS.map((step) => {
          const complete = current > step.number
          const active = current === step.number
          const reachable = step.number <= maxStep
          return (
            <li key={step.number}>
              <button
                type="button"
                onClick={() => reachable && !active && onSelect?.(step.number)}
                disabled={!reachable || active}
                aria-current={active ? 'step' : undefined}
                className={`group flex w-full flex-col gap-2 rounded-lg text-left ${
                  reachable ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
              >
                <span
                  className={`h-1 w-full rounded-full transition-colors duration-300 ${
                    active || complete ? 'bg-coral' : 'bg-ink/10'
                  }`}
                />
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.62rem] font-bold transition-colors ${
                      active
                        ? 'bg-coral text-white shadow-[0_0_0_4px_rgba(232,96,122,0.12)]'
                        : complete
                          ? 'bg-coral/15 text-coral-deep'
                          : 'bg-ink/[0.06] text-taupe'
                    }`}
                  >
                    {complete ? <Check className="h-3 w-3" aria-hidden="true" /> : step.number}
                  </span>
                  <span
                    className={`min-w-0 truncate text-[0.64rem] font-semibold sm:text-xs ${
                      active ? 'text-ink' : complete ? 'text-cocoa' : 'text-taupe'
                    }`}
                  >
                    <span className="sm:hidden">{step.short}</span>
                    <span className="hidden sm:inline">{step.label}</span>
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
