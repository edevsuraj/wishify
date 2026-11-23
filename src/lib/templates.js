import { OCCASION_MAP } from './occasions.js'

/**
 * Template catalogue. Metadata lives here (safe to import anywhere);
 * the actual React components live in `src/templates/index.js`.
 */
export const TEMPLATES = [
  {
    id: 'elegant-celebration',
    name: 'Elegant Celebration',
    blurb: 'Ivory paper, gold foil and quiet ceremony.',
    vibe: 'Timeless',
    tags: ['birthday', 'wedding', 'anniversary', 'best-wishes', 'congratulations', 'custom', 'diwali', 'durga-puja', 'christmas', 'gurpurab', 'independence-day', 'republic-day', 'gudi-padwa', 'eid-al-fitr', 'mahavir-jayanti', 'ram-navami'],
    groups: ['everyday', 'hindu', 'christian', 'sikh', 'jain', 'islamic', 'national', 'regional'],
    accent: '#C99A3F',
    cover: {
      bg: 'linear-gradient(150deg, #FDFAF3 0%, #F5E9D4 55%, #EAD9BA 100%)',
      ink: '#2F261B',
      muted: '#7C6A4C',
      accent: '#A9822F',
      button: '#241C18',
      buttonText: '#FBF3E2',
    },
  },
  {
    id: 'romantic-hearts',
    name: 'Romantic Hearts',
    blurb: 'Deep rose, handwritten script and floating hearts.',
    vibe: 'Romantic',
    tags: ['love', 'anniversary', 'wedding', 'custom', 'good-night', 'karwa-chauth'],
    groups: ['everyday', 'hindu'],
    accent: '#E8607A',
    cover: {
      bg: 'linear-gradient(150deg, #4A1730 0%, #6D2244 50%, #43122B 100%)',
      ink: '#FFF1F3',
      muted: '#E7B8C4',
      accent: '#F6A6B2',
      button: '#F6C6CC',
      buttonText: '#4A1730',
    },
  },
  {
    id: 'floral-garden',
    name: 'Floral Garden',
    blurb: 'Pressed botanicals, sage green and morning light.',
    vibe: 'Botanical',
    tags: ['wedding', 'birthday', 'thank-you', 'best-wishes', 'anniversary', 'good-morning', 'easter', 'onam', 'milad-un-nabi'],
    groups: ['everyday', 'christian', 'hindu', 'regional', 'islamic'],
    accent: '#7E9A83',
    cover: {
      bg: 'linear-gradient(150deg, #F5F7EC 0%, #E4EDDC 50%, #D6E3CF 100%)',
      ink: '#26382B',
      muted: '#5C735F',
      accent: '#557A5C',
      button: '#2C4633',
      buttonText: '#F4F8EC',
    },
  },
  {
    id: 'minimal-luxury',
    name: 'Minimal Luxury',
    blurb: 'Charcoal, hairline gold and editorial space.',
    vibe: 'Modern',
    tags: ['congratulations', 'best-wishes', 'wedding', 'custom', 'birthday', 'thank-you', 'good-friday', 'islamic-new-year', 'paryushan'],
    groups: ['everyday', 'islamic', 'jain', 'buddhist', 'christian'],
    accent: '#C9A45C',
    cover: {
      bg: 'linear-gradient(160deg, #151311 0%, #211D19 55%, #151311 100%)',
      ink: '#F6F1E6',
      muted: '#A79B88',
      accent: '#C9A45C',
      button: '#F6F1E6',
      buttonText: '#141210',
    },
  },
  {
    id: 'cute-playful',
    name: 'Cute & Playful',
    blurb: 'Sticker shapes, wiggly type and pure joy.',
    vibe: 'Playful',
    tags: ['birthday', 'friendship', 'congratulations', 'good-morning', 'custom', 'raksha-bandhan', 'holi', 'makar-sankranti'],
    groups: ['everyday', 'hindu', 'regional'],
    accent: '#F2A93B',
    cover: {
      bg: 'linear-gradient(150deg, #FFF3C4 0%, #FFE29A 55%, #FFD0B5 100%)',
      ink: '#3A2A12',
      muted: '#7E6434',
      accent: '#E05A3F',
      button: '#3A2A12',
      buttonText: '#FFF3C4',
    },
  },
  {
    id: 'golden-memories',
    name: 'Golden Memories',
    blurb: 'Warm film grain, a keepsake frame, sepia glow.',
    vibe: 'Nostalgic',
    tags: ['anniversary', 'festival', 'thank-you', 'best-wishes', 'birthday', 'wedding', 'diwali', 'ganesh-chaturthi', 'durga-puja', 'gurpurab', 'pongal', 'chhath-puja', 'jain-diwali'],
    groups: ['everyday', 'hindu', 'sikh', 'jain', 'regional', 'islamic', 'christian'],
    accent: '#B98A46',
    cover: {
      bg: 'linear-gradient(150deg, #3A2A1C 0%, #57402A 52%, #2C2015 100%)',
      ink: '#F8E9CE',
      muted: '#CBAA7C',
      accent: '#E1B873',
      button: '#F4E1C2',
      buttonText: '#332416',
    },
  },
  {
    id: 'magical-night-sky',
    name: 'Magical Night Sky',
    blurb: 'A quiet sky, a paper moon and one shooting star.',
    vibe: 'Dreamy',
    tags: ['good-night', 'birthday', 'love', 'festival', 'custom', 'janmashtami', 'maha-shivratri', 'ramadan', 'vesak', 'bandi-chhor-divas', 'lohri'],
    groups: ['everyday', 'hindu', 'islamic', 'buddhist', 'sikh', 'regional'],
    accent: '#8C9EE8',
    cover: {
      bg: 'linear-gradient(160deg, #0B1026 0%, #18214A 55%, #0A0E20 100%)',
      ink: '#EEF1FF',
      muted: '#9AA7D8',
      accent: '#D8C98A',
      button: '#EEF1FF',
      buttonText: '#101634',
    },
  },
  {
    id: 'colorful-confetti',
    name: 'Colorful Confetti',
    blurb: 'Bold gradients, paper ribbons, party energy.',
    vibe: 'Joyful',
    tags: ['birthday', 'congratulations', 'festival', 'friendship', 'custom', 'holi', 'navratri', 'vaisakhi', 'bihu', 'independence-day'],
    groups: ['everyday', 'hindu', 'sikh', 'regional', 'national'],
    accent: '#E85D75',
    cover: {
      bg: 'linear-gradient(150deg, #FFF9F4 0%, #FFE9E2 48%, #FDE2EC 100%)',
      ink: '#2B2020',
      muted: '#7A5E5E',
      accent: '#D14A66',
      button: '#2B2020',
      buttonText: '#FFF6F1',
    },
  },
  {
    id: 'paper-card',
    name: 'Paper Greeting Card',
    blurb: 'Notebook paper, washi tape and real handwriting.',
    vibe: 'Handmade',
    tags: ['thank-you', 'friendship', 'good-morning', 'custom', 'birthday', 'thanksgiving'],
    groups: ['everyday', 'christian', 'regional'],
    accent: '#B06A4A',
    cover: {
      bg: 'linear-gradient(150deg, #F7F0E2 0%, #EFE4CE 55%, #E3D3B7 100%)',
      ink: '#3B2E22',
      muted: '#806A55',
      accent: '#A96B4B',
      button: '#3B2E22',
      buttonText: '#FBF3E4',
    },
  },
  {
    id: 'neon-celebration',
    name: 'Neon Celebration',
    blurb: 'After-dark glow, electric type, big-night energy.',
    vibe: 'Electric',
    tags: ['congratulations', 'birthday', 'festival', 'friendship', 'love', 'new-year', 'republic-day'],
    groups: ['everyday', 'national', 'christian', 'hindu'],
    accent: '#F45D9C',
    cover: {
      bg: 'linear-gradient(150deg, #0B0714 0%, #170B2C 55%, #080510 100%)',
      ink: '#F4ECFF',
      muted: '#A18BBF',
      accent: '#6CF0E1',
      button: '#F45D9C',
      buttonText: '#170B2C',
    },
  },
  {
    id: 'soft-pastel',
    name: 'Soft Pastel Dreams',
    blurb: 'Blush clouds, lilac light and a gentle whisper.',
    vibe: 'Airy',
    tags: ['good-morning', 'love', 'birthday', 'friendship', 'custom', 'anniversary', 'easter', 'buddha-purnima', 'ramadan-mubarak', 'gudi-padwa'],
    groups: ['everyday', 'christian', 'buddhist', 'islamic', 'hindu', 'regional'],
    accent: '#B79BD8',
    cover: {
      bg: 'linear-gradient(150deg, #FDF3F7 0%, #F2E9FA 50%, #E5F1F0 100%)',
      ink: '#3E3044',
      muted: '#8A7792',
      accent: '#8C6FB0',
      button: '#3E3044',
      buttonText: '#FBF4FA',
    },
  },
  {
    id: 'cinematic-surprise',
    name: 'Cinematic Surprise',
    blurb: 'Letterboxed, spotlighted — a wish with credits.',
    vibe: 'Dramatic',
    tags: ['love', 'anniversary', 'congratulations', 'custom', 'good-night', 'dussehra', 'good-friday', 'lohri', 'milad-un-nabi'],
    groups: ['everyday', 'hindu', 'christian', 'regional', 'islamic', 'sikh'],
    accent: '#D8B26A',
    cover: {
      bg: 'linear-gradient(150deg, #08080A 0%, #17141A 55%, #060607 100%)',
      ink: '#F4EEE2',
      muted: '#948B7B',
      accent: '#D8B26A',
      button: '#F4EEE2',
      buttonText: '#0B0A0C',
    },
  },
]

export const TEMPLATES_BY_ID = Object.fromEntries(TEMPLATES.map((t) => [t.id, t]))
export const TEMPLATE_IDS = TEMPLATES.map((t) => t.id)
export const DEFAULT_TEMPLATE_ID = 'elegant-celebration'

export function getTemplate(id) {
  return TEMPLATES_BY_ID[id] || TEMPLATES_BY_ID[DEFAULT_TEMPLATE_ID]
}

export function getTemplatesForOccasion(occasionId) {
  if (!occasionId) return TEMPLATES
  const occasionGroup = OCCASION_MAP[occasionId]?.group
  const direct = TEMPLATES.filter((t) => t.tags.includes(occasionId))
  const byGroup = TEMPLATES.filter(
    (t) => !direct.includes(t) && occasionGroup && t.groups?.includes(occasionGroup),
  )
  const rest = TEMPLATES.filter((t) => !direct.includes(t) && !byGroup.includes(t))
  return [...direct, ...byGroup, ...rest]
}

export function suggestedTemplates(occasionId) {
  if (!occasionId) return TEMPLATES.slice(0, 4)
  return getTemplatesForOccasion(occasionId).slice(0, 4)
}

export function getTemplateTheme(templateId) {
  return TEMPLATES_BY_ID[templateId]?.cover || TEMPLATES_BY_ID[DEFAULT_TEMPLATE_ID].cover
}
