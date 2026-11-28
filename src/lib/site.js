export const SITE = {
  name: 'Wishify',
  tagline: 'A little happiness, beautifully delivered.',
  description:
    'Create a beautiful, personalized digital wish and share it with one link. No accounts, no app, no fuss.',
  email: 'edev.suraj@gmail.com',
  donate: 'https://buymeacoffee.com/surajchauhan/',
  upi: '8112773132',
  upiName: 'Suraj Chauhan',
  moreApps: 'https://edevsuraj.github.io/explore-our-apps-and-extensions/',
  repo: 'https://github.com/DavidHDev/react-bits',
}

/** Opens a UPI app with the payee prefilled; falls back to a browser prompt on desktop. */
export const UPI_LINK = `upi://pay?${[
  `pa=${encodeURIComponent(SITE.upi)}`,
  `pn=${encodeURIComponent(SITE.upiName)}`,
  'cu=INR',
  `tn=${encodeURIComponent('Support Wishify')}`,
].join('&')}`

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
