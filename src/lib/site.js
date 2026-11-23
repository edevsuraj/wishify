export const SITE = {
  name: 'Wishify',
  tagline: 'A little happiness, beautifully delivered.',
  description:
    'Create a beautiful, personalized digital wish and share it with one link. No accounts, no app, no fuss.',
  // Replace with your own inbox before launching.
  email: 'hello@wishify.app',
  repo: 'https://github.com/DavidHDev/react-bits',
}

export const ADS = {
  client: (import.meta.env.VITE_ADSENSE_CLIENT || '').trim(),
  slots: {
    home: (import.meta.env.VITE_ADSENSE_SLOT_HOME || '').trim(),
    templates: (import.meta.env.VITE_ADSENSE_SLOT_TEMPLATES || '').trim(),
    create: (import.meta.env.VITE_ADSENSE_SLOT_CREATE || '').trim(),
    wish: (import.meta.env.VITE_ADSENSE_SLOT_WISH || '').trim(),
  },
  get enabled() {
    return this.client.length > 0
  },
}
