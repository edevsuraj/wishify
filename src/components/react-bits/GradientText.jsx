import { useReducedMotion } from 'framer-motion'

/**
 * GradientText — adapted from React Bits (https://reactbits.dev).
 * Animated four-stop gradient clipped to the text.
 */
export default function GradientText({
  children,
  className = '',
  colors = '#D14A66, #E8607A, #E9A23B, #C99A3F, #D14A66',
  speed = 8,
}) {
  const reduced = useReducedMotion()
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(100deg, ${colors})`,
        backgroundSize: '280% 100%',
        animation: reduced ? 'none' : `shimmer ${speed}s linear infinite`,
      }}
    >
      {children}
    </span>
  )
}
