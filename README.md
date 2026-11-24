# Wishify

Beautiful, personalized wishes that travel as a single link.

Wishify is a client-side React app for creating and sharing greeting cards. Pick an occasion, choose a design, write a message, and send one link over WhatsApp, email, or anywhere else. There is no account, database, or backend.

## Highlights

- **51 occasions** across everyday moments, religious and cultural festivals, national days, and regional celebrations.
- **12 distinct template designs** with their own typography, layout, colour, and motion — not palette swaps of one card.
- **Image-led discovery** on the homepage, create flow, template gallery, and recipient cover.
- **Bilingual writing help** with English and Hindi heading/message suggestions.
- **Premium but restrained motion**: page transitions, scroll reveals, envelope opening, text reveals, hover previews, and occasion-aware effects.
- **Mobile-first recipient experience**, built for links opened from WhatsApp.
- **Link-only storage**: greeting data is compressed and Base64URL-encoded in the URL fragment.
- **Consent-gated ads** that stay disabled until AdSense environment variables are configured.
- **Accessible defaults**: keyboard-friendly controls, visible focus states, large touch targets, and `prefers-reduced-motion` support.

## Stack

- React 18 + Vite 6
- Tailwind CSS 3.4
- React Router 6
- Framer Motion 11
- Lucide icons for small functional actions only
- `qrcode` for share QR codes
- No backend, database, authentication, or paid API

## Run locally

Requirements: Node.js 20+ (tested with Node 24) and npm.

```bash
npm install
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:5173/`.

Production build:

```bash
npm run build
npm run preview
```

The build output is written to `dist/`.

## Deploy to Cloudflare Pages

1. Push the repository to GitHub or GitLab.
2. In Cloudflare Pages, choose **Create a project → Connect to Git**.
3. Use these build settings:

   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 20 or newer

4. Deploy. `public/_redirects` contains the SPA rewrite (`/* /index.html 200`), so direct visits and refreshes on `/create`, `/templates`, `/wish`, and legal pages work.
5. Optionally add a custom domain under **Custom domains**. Cloudflare provisions HTTPS automatically.
6. Add the AdSense environment variables below only when you are ready to display ads, then trigger a new deployment.

`public/_headers` can be used for additional security/cache headers on Cloudflare Pages. The project deliberately avoids a server-side runtime, so the free Pages tier is sufficient.

## Environment variables

Copy `.env.example` to `.env` for local experiments. AdSense is completely inactive while these are blank.

```env
VITE_ADSENSE_CLIENT=
VITE_ADSENSE_SLOT_HOME=
VITE_ADSENSE_SLOT_TEMPLATES=
VITE_ADSENSE_SLOT_CREATE=
VITE_ADSENSE_SLOT_WISH=
```

On Cloudflare Pages, add them under **Settings → Environment variables → Production** and redeploy. Ads also require the visitor’s consent through the in-app consent banner.

The wish page never places an ad over the greeting itself.

## How sharing works

The greeting is packed into the URL fragment, for example:

```text
https://your-domain.example/wish/#eyJ2IjoxLCJvIjoiZGl3YWxpIiwidCI6ImdvbGRlbi1tZW1vcmllcyIs...
```

- Only a small allowlist of occasions and template IDs is accepted.
- Text is sanitized, length-limited, and rendered as React text — never as HTML.
- Invalid, truncated, or oversized payloads show a friendly error screen instead of crashing.
- Because the fragment is not sent to the server, greeting contents are not stored in access logs.
- Anyone with the link can read the greeting. Do not use Wishify for secrets or sensitive information.

## Images and credits

Everyday occasion photographs are stored locally under `public/images/` after curation and cropping. Cultural and religious occasions use bespoke, original SVG artwork in `src/components/art/OccasionArt.jsx`, using symbolic motifs such as diyas, lanterns, flowers, crescents, and architecture rather than depictions of deities or prophets.

Photo sources:

| Use | Source |
| --- | --- |
| Birthday / balloons / celebration | [Unsplash photo 1530103862676-de8c9debad1d](https://unsplash.com/photos/1530103862676-de8c9debad1d), [Unsplash photo 1513151233558-d860c5398176](https://unsplash.com/photos/1513151233558-d860c5398176) |
| Love / couple | [Unsplash photo 1494774157365-9e04c6720e47](https://unsplash.com/photos/1494774157365-9e04c6720e47) |
| Friendship / friends | [Unsplash photo 1529333166437-7750a6dd5a70](https://unsplash.com/photos/1529333166437-7750a6dd5a70) |
| Wedding | [Unsplash photo 1511285560929-80b456fea0bc](https://unsplash.com/photos/1511285560929-80b456fea0bc) |
| Graduation / congratulations | [Unsplash photo 1627556704290-2b1f5853ff78](https://unsplash.com/photos/1627556704290-2b1f5853ff78) |
| Good morning | [Unsplash photo 1495474472287-4d71bcdd2085](https://unsplash.com/photos/1495474472287-4d71bcdd2085) |
| Good night | [Unsplash photo 1532693322450-2cb5c511067d](https://unsplash.com/photos/1532693322450-2cb5c511067d) |
| Thank you / gift | [Unsplash photo 1513885535751-8b9238bd345a](https://unsplash.com/photos/1513885535751-8b9238bd345a) |
| Best wishes | [Unsplash photo 1500530855697-b586d89ba3ee](https://unsplash.com/photos/1500530855697-b586d89ba3ee) |
| Custom / letter | [Unsplash photo 1517842645767-c639042777db](https://unsplash.com/photos/1517842645767-c639042777db) |
| Anniversary | “For you...” by VinothChandar, Flickr, CC BY — [source](https://www.flickr.com/photos/44345361@N06/5736328472) |
| Diwali | “Happy Diwali - Festival of light” by Rameshng, Flickr, CC BY-SA — [source](https://www.flickr.com/photos/39107352@N08/5150423631) |
| Holi | “Holi” by pabak sarkar, Flickr, CC BY — [source](https://www.flickr.com/photos/122393034@N04/13663451105) |

The curation download scripts in `scripts/` are development tools only and are not part of the production bundle. If you replace any photo, update this table and keep the licence/attribution requirements of the original source.

## Project structure

```text
src/
  components/
    art/             Original SVG occasion artwork
    greeting/        Recipient cover, stage, and effects
    home/            Homepage sections
    layout/          Navigation, footer, page transitions
    occasions/       Reusable image/art occasion tiles
    react-bits/      Small React Bits-style motion primitives
    templates/       Template thumbnails and previews
  lib/
    occasions.js     Occasion catalogue, groups, images, bilingual copy
    templates.js     Template metadata, matching, theme helpers
    share.js         Base64URL encode/decode, limits, validation
    sample.js        Sample names and wishes
  pages/             Route-level pages
  templates/         The 12 greeting layouts
public/
  images/            Locally stored occasion and hero photography
  _redirects         SPA fallback for Cloudflare Pages
  robots.txt
```

## Customising

- **Occasions:** edit `src/lib/occasions.js`. Keep IDs stable if links already exist. Add an image under `public/images/occasions/` or an `art` palette/scene.
- **Templates:** edit `src/templates/` and the metadata/matching rules in `src/lib/templates.js`.
- **Colour and type:** see `tailwind.config.js` and `src/index.css`.
- **Brand and contact:** update `src/lib/site.js`. The contact email is currently a placeholder (`hello@wishify.app`) — replace it before launch.

## Pre-launch checklist

- [ ] Replace the placeholder contact email in `src/lib/site.js`.
- [ ] Replace example domain references in metadata if you use a custom domain.
- [ ] Re-check photo licences and attributions for your jurisdiction.
- [ ] Run `npm run build` and test one generated wish end-to-end on a phone.
- [ ] Test a malformed/oversized wish link and confirm the error state is friendly.
- [ ] Configure AdSense env vars only if ads are wanted, and verify the consent flow.
- [ ] Add your own privacy/terms details if your deployment or ad setup differs.

## License

Application code is provided for the project owner’s use. Third-party photographs and fonts remain subject to their respective licences and attribution requirements.
