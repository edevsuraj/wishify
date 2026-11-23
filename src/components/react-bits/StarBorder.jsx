/**
 * StarBorder — adapted from React Bits (https://reactbits.dev).
 * Wraps content in a slowly rotating conic-gradient border.
 */
export default function StarBorder({
  children,
  className = '',
  innerClassName = '',
  as: Tag = 'span',
  radius = 'rounded-full',
}) {
  return (
    <Tag className={`relative inline-flex overflow-hidden ${radius} p-[1.5px] ${className}`}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[260%] w-[260%] -translate-x-1/2 -translate-y-1/2 animate-borderSpin opacity-80"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(246,198,204,0.95) 60deg, rgba(233,162,59,0.9) 130deg, transparent 190deg, transparent 360deg)',
        }}
      />
      <span className={`relative z-10 inline-flex w-full items-center justify-center ${radius} ${innerClassName}`}>
        {children}
      </span>
    </Tag>
  )
}
