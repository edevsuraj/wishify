import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const data = JSON.parse(await readFile('scripts/data/openverse-candidates.json', 'utf8'))
await mkdir('scripts/data/thumbs', { recursive: true })

const jobs = []
for (const [id, items] of Object.entries(data)) {
  items.slice(0, 6).forEach((item, index) => jobs.push({ id, index, item }))
}

let done = 0
async function worker() {
  while (jobs.length) {
    const job = jobs.shift()
    const out = `scripts/data/thumbs/${job.id}-${job.index}.jpg`
    if (existsSync(out)) continue
    const sources = [job.item.thumbnail, job.item.url]
    for (const src of sources) {
      try {
        const res = await fetch(src, {
          headers: { 'User-Agent': 'Wishify/1.0' },
          signal: AbortSignal.timeout(20000),
        })
        if (!res.ok) continue
        const buf = Buffer.from(await res.arrayBuffer())
        if (buf.length < 1000) continue
        await writeFile(out, buf)
        break
      } catch {
        /* try next source */
      }
    }
    done += 1
    if (done % 50 === 0) console.log(`${done}/${jobs.length + done}`)
  }
}

await Promise.all(Array.from({ length: 8 }, worker))
console.log('Thumbnails ready')
