import { Info } from 'lucide-react'

export function LegalSection({ title, id, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-[1.35rem]">{title}</h2>
      <div className="mt-3 space-y-3 text-[0.94rem] leading-[1.8] text-cocoa">{children}</div>
    </section>
  )
}

export function BulletList({ items }) {
  return (
    <ul className="space-y-2.5 pl-0">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-coral/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function Callout({ children, tone = 'cream' }) {
  const styles =
    tone === 'warm'
      ? 'border-coral/15 bg-[#FFF3EE] text-cocoa'
      : 'border-ink/[0.07] bg-cream text-cocoa'
  return (
    <div className={`flex gap-3 rounded-2xl border px-4 py-3.5 text-sm leading-relaxed ${styles}`}>
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
      <div>{children}</div>
    </div>
  )
}

export function LastUpdated({ date, children }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-taupe">
      <span>Last updated · {date}</span>
      {children}
    </div>
  )
}
