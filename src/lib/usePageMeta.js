import { useEffect } from 'react'

/** Small SPA-friendly document head helper. */
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · Wishify` : 'Wishify — Beautiful personalized wishes'
    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }
  }, [title, description])
}
