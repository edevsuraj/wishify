export default function PageHeader({ eyebrow, title, lead, children, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center items-center' : 'items-start'
  return (
    <section className="relative overflow-hidden border-b border-ink/[0.06]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-aurora opacity-55" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grain opacity-[0.025]" />
      <div className={`container-page relative flex flex-col py-14 sm:py-20 ${alignment}`}>
        {eyebrow && (
          <p className="eyebrow">
            <span className="h-px w-6 bg-coral/50" />
            {eyebrow}
          </p>
        )}
        <h1
          className={`mt-4 font-elegant text-[2.4rem] font-medium leading-[1.06] tracking-[-0.01em] text-ink sm:text-5xl ${
            align === 'center' ? 'max-w-3xl' : 'max-w-4xl'
          }`}
        >
          {title}
        </h1>
        {lead && (
          <p
            className={`mt-5 text-[1rem] leading-relaxed text-cocoa sm:text-[1.08rem] ${
              align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'
            }`}
          >
            {lead}
          </p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  )
}
