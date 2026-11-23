import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import Button from '../ui/Button.jsx'
import AnimatedContent from '../react-bits/AnimatedContent.jsx'

export default function FinalCta() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-10">
      <div className="relative mx-auto max-w-[86rem] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem]">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, #C94261 0%, #E8607A 42%, #E9A23B 100%)',
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-[#FFE7B8]/30 blur-3xl" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.15]" />
          {[
            { top: '18%', left: '6%', size: 18, delay: '0s' },
            { top: '62%', left: '12%', size: 12, delay: '-2s' },
            { top: '26%', right: '10%', size: 16, delay: '-1s' },
            { top: '70%', right: '6%', size: 22, delay: '-3s' },
          ].map((heart) => (
            <span
              key={`${heart.top}-${heart.left || heart.right}`}
              className="absolute animate-float text-white/30"
              style={{
                top: heart.top,
                left: heart.left,
                right: heart.right,
                animationDelay: heart.delay,
              }}
            >
              <Heart style={{ width: heart.size, height: heart.size }} fill="currentColor" aria-hidden="true" />
            </span>
          ))}
        </div>

        <div className="relative px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
          <AnimatedContent>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Someone is waiting for this
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl">
              Someone out there could use a little happiness today.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-white/75">
              Take two minutes. Pick a design. Say the thing you’ve been meaning to say. Send it in
              one link.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/create" variant="white" size="lg" className="w-full sm:w-auto">
                Create a Wish
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                to="/templates"
                size="lg"
                className="w-full border border-white/30 bg-white/10 text-white backdrop-blur hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto"
              >
                Browse designs
              </Button>
            </div>
            <p className="mt-6 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/50">
              Free forever · No sign-up · Works on any device
            </p>
          </AnimatedContent>
        </div>
      </div>
    </section>
  )
}
