import { getOccasion, OCCASION_MAP } from './occasions.js'
import { DEFAULT_TEMPLATE_ID } from './templates.js'

const SAMPLE_NAMES = {
  birthday: 'Aanya',
  anniversary: 'Meera & Rohan',
  love: 'Kabir',
  friendship: 'Zoya',
  wedding: 'Ananya & Dev',
  congratulations: 'Vihaan',
  'good-morning': 'Ishaan',
  'good-night': 'Meher',
  'thank-you': 'Nani',
  'best-wishes': 'Ria',
  festival: 'The Sharma Family',
  custom: 'Sam',
}

/** Example data used on /templates and in marketing previews. */
export function createSampleWish(occasionId = 'birthday', templateId = DEFAULT_TEMPLATE_ID) {
  const occasion = getOccasion(occasionId) || OCCASION_MAP.birthday
  return {
    occasion: occasion.id,
    template: templateId,
    recipient: SAMPLE_NAMES[occasion.id] || 'Aanya',
    sender: 'Aarav',
    heading: occasion.heading,
    relationship: '',
    message: occasion.messages[0],
    animation: 'full',
  }
}
