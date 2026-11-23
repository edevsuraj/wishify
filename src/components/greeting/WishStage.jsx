import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import CoverScreen from './CoverScreen.jsx'
import GreetingFrame from './GreetingFrame.jsx'

/**
 * Handles the emotional sequence: sealed cover → open → greeting.
 * `autoOpen` is used by the creator's live preview; the real link starts
 * closed so the recipient gets the moment of opening it.
 */
export default function WishStage({ wish, autoOpen = false, onOpenedChange, className = '' }) {
  const [opened, setOpened] = useState(autoOpen)
  const reduced = useReducedMotion()
  const setting = wish.animation || 'full'
  const motionMode = reduced || setting === 'none' ? 'off' : setting

  useEffect(() => {
    setOpened(autoOpen)
  }, [autoOpen])

  useEffect(() => {
    onOpenedChange?.(opened)
  }, [opened, onOpenedChange])

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} data-motion={motionMode}>
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
    </div>
  )
}
