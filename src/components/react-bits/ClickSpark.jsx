import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/**
 * ClickSpark — adapted from React Bits (https://reactbits.dev).
 * Tiny spark burst on click. Purely decorative, pointer-events-none.
 */
export default function ClickSpark({
  children,
  className = '',
  color = '#E8607A',
  count = 7,
  radius = 22,
}) {
  const [bursts, setBursts] = useState([])
  const idRef = useRef(0)
  const reduced = useReducedMotion()

  const handlePointerDown = useCallback(
    (event) => {
      if (reduced) return
      const rect = event.currentTarget.getBoundingClientRect()
      const id = (idRef.current += 1)
      setBursts((prev) => [
        ...prev.slice(-2),
        { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
      ])
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((burst) => burst.id !== id))
      }, 600)
    },
    [reduced],
  )

  return (
    <div className={`relative ${className}`} onPointerDown={handlePointerDown}>
      {children}
      <AnimatePresence>
        {bursts.map((burst) => (
          <span
            key={burst.id}
            aria-hidden="true"
            className="pointer-events-none absolute z-30"
            style={{ left: burst.x, top: burst.y }}
          >
            {Array.from({ length: count }).map((_, index) => {
              const angle = (Math.PI * 2 * index) / count + 0.3
              return (
                <motion.span
                  key={index}
                  className="absolute block h-1 w-1 rounded-full"
                  style={{ background: color }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    scale: 0.4,
                  }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              )
            })}
          </span>
        ))}
      </AnimatePresence>
    </div>
  )
}
