import ElegantCelebration from './ElegantCelebration.jsx'
import RomanticHearts from './RomanticHearts.jsx'
import FloralGarden from './FloralGarden.jsx'
import MinimalLuxury from './MinimalLuxury.jsx'
import CutePlayful from './CutePlayful.jsx'
import GoldenMemories from './GoldenMemories.jsx'
import MagicalNightSky from './MagicalNightSky.jsx'
import ColorfulConfetti from './ColorfulConfetti.jsx'
import PaperCard from './PaperCard.jsx'
import NeonCelebration from './NeonCelebration.jsx'
import SoftPastelDreams from './SoftPastelDreams.jsx'
import CinematicSurprise from './CinematicSurprise.jsx'
import { DEFAULT_TEMPLATE_ID } from '../lib/templates.js'

export const TEMPLATE_COMPONENTS = {
  'elegant-celebration': ElegantCelebration,
  'romantic-hearts': RomanticHearts,
  'floral-garden': FloralGarden,
  'minimal-luxury': MinimalLuxury,
  'cute-playful': CutePlayful,
  'golden-memories': GoldenMemories,
  'magical-night-sky': MagicalNightSky,
  'colorful-confetti': ColorfulConfetti,
  'paper-card': PaperCard,
  'neon-celebration': NeonCelebration,
  'soft-pastel': SoftPastelDreams,
  'cinematic-surprise': CinematicSurprise,
}

export function getTemplateComponent(templateId) {
  return TEMPLATE_COMPONENTS[templateId] || TEMPLATE_COMPONENTS[DEFAULT_TEMPLATE_ID]
}
