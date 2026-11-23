/**
 * ShinyText — adapted from React Bits (https://reactbits.dev).
 * A quiet light sweep across small labels. The sheen is a duplicated,
 * clipped text layer so the base text always stays legible.
 */
export default function ShinyText({ children, className = '', speed = 5 }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-clip-text text-transparent"
        style={{
          backgroundImage:
            'linear-gradient(110deg, transparent 38%, rgba(255,255,255,0.95) 50%, transparent 62%)',
          backgroundSize: '250% 100%',
          animation: `shimmer ${speed}s linear infinite`,
        }}
      >
        {children}
      </span>
    </span>
  )
}
