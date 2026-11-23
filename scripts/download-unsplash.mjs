// Dev-only: download candidate photos from Unsplash's CDN for visual curation.
import { writeFile, mkdir } from 'node:fs/promises'

const ids = {
  'birthday-1': 'photo-1530103862676-de8c9debad1d',
  'birthday-2': 'photo-1513151233558-d860c5398176',
  'birthday-3': 'photo-1464349095431-e9a21285b5f3',
  'birthday-4': 'photo-1558636508-e0db3814bd1d',
  'birthday-5': 'photo-1578922746465-3a80a228f223',
  'birthday-6': 'photo-1522673607200-164d1b6ce486',
  'wedding-1': 'photo-1519741497674-611481863552',
  'wedding-2': 'photo-1511285560929-80b456fea0bc',
  'wedding-3': 'photo-1465495976277-4387d4b0b4c6',
  'wedding-4': 'photo-1606800052052-a08af7148866',
  'wedding-5': 'photo-1519225421980-715cb0215aed',
  'flowers-1': 'photo-1490750967868-88aa4486c946',
  'flowers-2': 'photo-1518199266791-5375a83190b7',
  'love-1': 'photo-1516589178581-6cd7833ae3b2',
  'love-2': 'photo-1511988617509-a57c8a288659',
  'friends-1': 'photo-1529156069898-49953e39b3ac',
  'friends-2': 'photo-1543807535-eceef0bc6599',
  'friends-3': 'photo-1529333166437-7750a6dd5a70',
  'graduation-1': 'photo-1523050854058-8df90110c9f1',
  'graduation-2': 'photo-1523580494863-6f3031224c94',
  'party-1': 'photo-1492684223066-81342ee5ff30',
  'party-2': 'photo-1514525253161-7a46d19cd819',
  'morning-1': 'photo-1495474472287-4d71bcdd2085',
  'morning-2': 'photo-1470252649378-9c29740c9fa8',
  'morning-3': 'photo-1500530855697-b586d89ba3ee',
  'night-1': 'photo-1419242902214-272b3f66ee7a',
  'night-2': 'photo-1462331940025-496dfbfc7564',
  'night-3': 'photo-1532767153582-b1a0e5145009',
  'gift-1': 'photo-1513885535751-8b9238bd345a',
  'gift-2': 'photo-1549465220-1a8b9238cd48',
  'beach-1': 'photo-1507525428034-b723cf961d3e',
  'letter-1': 'photo-1517842645767-c639042777db',
}

await mkdir('scripts/data/unsplash', { recursive: true })
const jobs = Object.entries(ids)
async function worker() {
  while (jobs.length) {
    const [name, id] = jobs.shift()
    try {
      const res = await fetch(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`, {
        signal: AbortSignal.timeout(25000),
      })
      if (!res.ok) throw new Error(String(res.status))
      await writeFile(`scripts/data/unsplash/${name}.jpg`, Buffer.from(await res.arrayBuffer()))
      console.log(name)
    } catch (error) {
      console.log(`${name} FAILED ${error.message}`)
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker))
