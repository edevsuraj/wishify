import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Particles — adapted from React Bits (https://reactbits.dev).
 * Lightweight canvas field; renders a single static frame when the user
 * prefers reduced motion.
 */
export default function Particles({
  className = '',
  quantity = 42,
  color = '232, 96, 122',
  sizeMin = 1,
  sizeMax = 2.8,
  speed = 0.28,
  opacity = 0.55,
}) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let particles = []
    let frame = 0

    const build = () => {
      particles = Array.from({ length: quantity }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: sizeMin + Math.random() * (sizeMax - sizeMin),
        vx: (Math.random() - 0.5) * speed,
        vy: -(0.08 + Math.random() * speed),
        alpha: 0.25 + Math.random() * opacity,
      }))
    }

    const paint = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -12) {
          p.y = height + 12
          p.x = Math.random() * width
        }
        if (p.x < -12) p.x = width + 12
        if (p.x > width + 12) p.x = -12
      }
      paint()
      frame = requestAnimationFrame(tick)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(rect.width, 1)
      height = Math.max(rect.height, 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
      paint()
      if (!reduced) {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(tick)
      }
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [quantity, color, sizeMin, sizeMax, speed, opacity, reduced])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
