import { useReducedMotion } from 'framer-motion'
import { getTemplateComponent } from '../../templates/index.js'

/**
 * Single rendering surface shared by the live preview and the real greeting,
 * so what the creator sees is exactly what the recipient gets.
 */
export default function GreetingFrame({ wish, className = '' }) {
  const reduced = useReducedMotion()
  const Template = getTemplateComponent(wish.template)
  const setting = wish.animation || 'full'
  const motionMode = reduced || setting === 'none' ? 'off' : setting

  return (
    <div
      className={`relative h-full w-full ${className}`}
      data-motion={motionMode}
      data-template={wish.template}
    >
      <Template wish={wish} />
    </div>
  )
}
