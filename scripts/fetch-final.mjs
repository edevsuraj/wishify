import { readFile, writeFile, mkdir } from 'node:fs/promises'

const data = JSON.parse(await readFile('scripts/data/openverse-candidates.json', 'utf8'))
const picks = {
  'anniversary-src': data.anniversary[0],
  'diwali-src': data.diwali[0],
  'diwali-alt-src': data.diwali[1],
  'holi-src': data.holi[4],
  'rakhi-src': data['raksha-bandhan'][5],
}
await mkdir('scripts/data/final-src', { recursive: true })
for (const [name, item] of Object.entries(picks)) {
  if (!item) continue
  for (const src of [item.url, item.thumbnail]) {
    try {
      const res = await fetch(src, { headers: { 'User-Agent': 'Wishify/1.0' }, signal: AbortSignal.timeout(30000) })
      if (!res.ok) continue
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < 2000) continue
      await writeFile(`scripts/data/final-src/${name}.jpg`, buf)
      console.log(`${name}: ${buf.length}`)
      break
    } catch (error) {
      console.log(`${name} failed: ${error.message}`)
    }
  }
}
