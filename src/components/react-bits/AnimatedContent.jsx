import { motion, useReducedMotion } from 'framer-motion'

/**
 * AnimatedContent — adapted from React Bits (https://reactbits.dev).
 * Scroll reveal with a soft spring-like ease.
 */
export default function AnimatedContent({
  children,
  className = '',
  delay = 0,
  y = 26,
  duration = 0.7,
  once = true,
  as = 'div',
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as] || motion.div

  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
