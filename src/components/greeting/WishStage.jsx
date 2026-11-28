import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { getTemplate } from '../../lib/templates.js'
import CoverScreen from './CoverScreen.jsx'
import GreetingFrame from './GreetingFrame.jsx'

/**
 * Handles the emotional sequence: sealed cover → open → greeting.
 * `autoOpen` is used by the creator's live preview; the real link starts
 * closed so the recipient gets the moment of opening it.
 */
export default function WishStage({
  wish,
  autoOpen = false,
  onOpenedChange,
  interactive = false,
  className = '',
}) {
  const [opened, setOpened] = useState(autoOpen)
  const [bursts, setBursts] = useState([])
  const reduced = useReducedMotion()
  const setting = wish.animation || 'full'
  const motionMode = reduced || setting === 'none' ? 'off' : setting
  const accent = getTemplate(wish.template)?.cover?.accent || '#E8607A'

  const stageRef = useRef(null)
  const glowRef = useRef(null)
  const burstId = useRef(0)
  const timers = useRef(new Set())
  const frame = useRef(0)
  const wasOpened = useRef(opened)

  useEffect(() => {
    setOpened(autoOpen)
  }, [autoOpen])

  useEffect(() => {
    onOpenedChange?.(opened)
  }, [opened, onOpenedChange])

  const spawnBurst = useCallback(
    (x, y, count) => {
      if (motionMode === 'off' || !interactive) return
      const key = ++burstId.current
      const pieces = Array.from({ length: count }, (_, index) => ({
        id: `${key}-${index}`,
        x,
        y,
        index,
      }))
      setBursts((prev) => [...prev, ...pieces].slice(-36))
      const timer = window.setTimeout(() => {
        setBursts((prev) => prev.filter((piece) => !pieces.some((added) => added.id === piece.id)))
        timers.current.delete(timer)
      }, 1100)
      timers.current.add(timer)
    },
    [interactive, motionMode],
  )

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer))
      timers.current.clear()
      if (frame.current) window.cancelAnimationFrame(frame.current)
    },
    [],
  )

  // A small celebration the moment the greeting is revealed.
  useEffect(() => {
    if (interactive && opened && !wasOpened.current) {
      const rect = stageRef.current?.getBoundingClientRect()
      if (rect) {
        spawnBurst(rect.width / 2, rect.height * 0.55, motionMode === 'subtle' ? 4 : 10)
      }
    }
    wasOpened.current = opened
  }, [opened, interactive, motionMode, spawnBurst])

  const handlePointerDown = (event) => {
    if (!interactive || !opened || motionMode === 'off' || event.button !== 0) return
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    spawnBurst(event.clientX - rect.left, event.clientY - rect.top, motionMode === 'subtle' ? 3 : 5)
  }

  const handlePointerMove = (event) => {
    if (!interactive || motionMode === 'off' || !glowRef.current || frame.current) return
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    frame.current = window.requestAnimationFrame(() => {
      glowRef.current?.style.setProperty('--wish-gx', `${x}px`)
      glowRef.current?.style.setProperty('--wish-gy', `${y}px`)
      frame.current = 0
    })
  }

  return (
    <div
      ref={stageRef}
      data-motion={motionMode}
      data-interactive={interactive ? 'true' : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      <AnimatePresence initial={false}>
        {!opened ? (
          <motion.div
            key="cover"
            className="absolute inset-0 z-20"
            initial={false}
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.965, filter: 'blur(4px)' }
            }
            transition={{ duration: reduced ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <CoverScreen wish={wish} onOpen={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="greeting"
            id="wish-details"
            className="absolute inset-0"
            initial={reduced ? false : { opacity: 0, scale: 0.985, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <GreetingFrame wish={wish} />
          </motion.div>
        )}
      </AnimatePresence>

      {interactive && motionMode !== 'off' && (
        <>
          <div
            ref={glowRef}
            aria-hidden="true"
            className="wish-pointer-glow pointer-events-none absolute inset-0 z-30"
            style={{ '--wish-glow': `${accent}2e` }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
            {bursts.map((piece) => {
              const dx = (piece.index % 2 ? 1 : -1) * (12 + piece.index * 4)
              return (
                <span
                  key={piece.id}
                  className="wish-spark"
                  style={{
                    left: piece.x,
                    top: piece.y,
                    color: piece.index % 3 === 0 ? '#E9A23B' : accent,
                    animationDelay: `${piece.index * 35}ms`,
                    '--wish-dx': `${dx}px`,
                    '--wish-rot': `${(piece.index - 2) * 14}deg`,
                  }}
                >
                  {piece.index % 2 === 0 ? (
                    <Heart className="h-full w-full" fill="currentColor" strokeWidth={0} />
                  ) : (
                    <Sparkles className="h-full w-full" />
                  )}
                </span>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
