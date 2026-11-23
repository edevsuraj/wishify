import { writeFile, mkdir } from 'node:fs/promises'

const ids = {
  'night-a': 'photo-1475274047050-1d0c0975c63e',
  'night-b': 'photo-1532693322450-2cb5c511067d',
  'night-c': 'photo-1502134249126-9f3755a50d78',
  'night-d': 'photo-1444703686981-a3abbc4d4fe3',
  'night-e': 'photo-1519681393784-d120267933ba',
  'couple-a': 'photo-1518621736915-f3b1c41b52a2',
  'couple-b': 'photo-1494774157365-9e04c6720e47',
  'couple-c': 'photo-1503516459261-40c66117780a',
  'couple-d': 'photo-1522098543979-ffc7f79a56c4',
  'couple-e': 'photo-1516726817505-f5ed825624d8',
  'couple-f': 'photo-1501901609772-df0848060b33',
  'grad-a': 'photo-1627556704290-2b1f5853ff78',
  'grad-b': 'photo-1541339907198-e08756dedf3f',
  'grad-c': 'photo-1564981797816-1043664bf78d',
  'grad-d': 'photo-1607013251379-e6eecfffe234',
  'hero-a': 'photo-1533174072545-7a4b6ad7a6c3',
  'hero-b': 'photo-1492684223066-81342ee5ff30',
  'hero-c': 'photo-1514525253161-7a46d19cd819',
}

await mkdir('scripts/data/batch2', { recursive: true })
const jobs = Object.entries(ids)
async function worker() {
  while (jobs.length) {
    const [name, id] = jobs.shift()
    try {
      const res = await fetch(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`, {
        signal: AbortSignal.timeout(25000),
      })
      if (!res.ok) throw new Error(String(res.status))
      await writeFile(`scripts/data/batch2/${name}.jpg`, Buffer.from(await res.arrayBuffer()))
      console.log(name)
    } catch (error) {
      console.log(`${name} FAILED ${error.message}`)
    }
  }
}
await Promise.all(Array.from({ length: 5 }, worker))
