// Dev-only helper: collect openly licensed photo candidates from Openverse.
// Usage: node scripts/fetch-candidates.mjs
import { writeFile, mkdir } from 'node:fs/promises'

const queries = {
  birthday: 'birthday cake balloons celebration',
  anniversary: 'anniversary romantic flowers',
  love: 'romantic couple sunset',
  friendship: 'friends laughing together',
  wedding: 'wedding floral decoration',
  congratulations: 'graduation celebration',
  'good-morning': 'sunrise coffee morning',
  'good-night': 'moon night sky',
  'thank-you': 'flowers gift thank you',
  'best-wishes': 'sunrise new journey',
  festival: 'festival lights celebration',
  custom: 'love letter flowers',
  diwali: 'diwali diya lights',
  holi: 'holi festival colors',
  'raksha-bandhan': 'rakhi festival',
  janmashtami: 'krishna janmashtami',
  'ganesh-chaturthi': 'ganesh chaturthi',
  navratri: 'navratri garba',
  'durga-puja': 'durga puja',
  'ram-navami': 'ram navami',
  'makar-sankranti': 'makar sankranti kite',
  'maha-shivratri': 'shiva temple',
  'karwa-chauth': 'karwa chauth',
  dussehra: 'dussehra',
  'eid-al-fitr': 'eid al fitr mosque',
  'eid-al-adha': 'eid al adha',
  ramadan: 'ramadan lantern',
  'ramadan-mubarak': 'ramadan iftar food',
  'islamic-new-year': 'muharram mosque',
  'milad-un-nabi': 'milad un nabi mosque',
  christmas: 'christmas tree lights',
  easter: 'easter eggs flowers',
  'good-friday': 'church cross',
  'new-year': 'new year fireworks',
  thanksgiving: 'thanksgiving dinner table',
  gurpurab: 'golden temple amritsar',
  vaisakhi: 'vaisakhi sikh',
  'bandi-chhor-divas': 'golden temple festival lights',
  'buddha-purnima': 'buddha statue',
  vesak: 'vesak lantern',
  'mahavir-jayanti': 'jain temple',
  paryushan: 'jain temple',
  'jain-diwali': 'jain temple lamp',
  'independence-day': 'india flag',
  'republic-day': 'india republic day parade',
  onam: 'onam pookalam',
  pongal: 'pongal festival',
  bihu: 'bihu festival',
  lohri: 'lohri bonfire',
}

const licenses = 'cc0,pdm,by,by-sa'
const entries = Object.entries(queries)
const out = {}

async function get(id, q, attempt = 0) {
  const url =
    'https://api.openverse.org/v1/images/?q=' +
    encodeURIComponent(q) +
    `&page_size=10&license=${licenses}&mature=false`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Wishify/1.0 (image curation)' },
      signal: AbortSignal.timeout(25000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    out[id] = (json.results || []).map((r) => ({
      title: r.title,
      creator: r.creator,
      license: r.license,
      license_url: r.license_url,
      source: r.source,
      foreign_landing_url: r.foreign_landing_url,
      url: r.url,
      thumbnail: r.thumbnail,
      width: r.width,
      height: r.height,
    }))
    console.log(`${id}: ${out[id].length}`)
  } catch (error) {
    if (attempt < 2) {
      await new Promise((resolve) => setTimeout(resolve, 1200 * (attempt + 1)))
      return get(id, q, attempt + 1)
    }
    out[id] = []
    console.warn(`${id}: failed ${error.message}`)
  }
}

let cursor = 0
async function worker() {
  while (cursor < entries.length) {
    const [id, q] = entries[cursor++]
    await get(id, q)
  }
}

await Promise.all(Array.from({ length: 5 }, worker))
await mkdir('scripts/data', { recursive: true })
await writeFile('scripts/data/openverse-candidates.json', JSON.stringify(out, null, 2))
console.log('Wrote scripts/data/openverse-candidates.json')
