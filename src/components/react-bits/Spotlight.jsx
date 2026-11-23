import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Spotlight — adapted from React Bits (https://reactbits.dev).
 * A soft radial light that follows the pointer. Disabled for reduced motion
 * and on touch-only devices it simply rests at the top centre.
 */
export default function Spotlight({
  className = '',
  color = 'rgba(255, 255, 255, 0.55)',
  size = 620,
  children,
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const handleMove = (event) => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} onPointerMove={handleMove} className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-80 transition-opacity duration-500"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 0%), ${color}, transparent 68%)`,
        }}
      />
      {children}
    </div>
  )
}
