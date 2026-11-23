import { useEffect, useState } from 'react'
import { Download, QrCode, TriangleAlert } from 'lucide-react'
import { downloadDataUrl } from '../../lib/clipboard.js'

/**
 * The QR module is loaded lazily — only after a visitor actually generates a
 * link — so it never affects the initial page weight.
 */
export default function QrPanel({ url, wish }) {
  const [src, setSrc] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setSrc('')
    setError(false)

    import('qrcode')
      .then(async (mod) => {
        const QR = mod.default ?? mod
        const dataUrl = await QR.toDataURL(url, {
          errorCorrectionLevel: 'L',
          margin: 1,
          width: 512,
          color: { dark: '#241C18', light: '#FFFDF9' },
        })
        if (!cancelled) setSrc(dataUrl)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })

    return () => {
      cancelled = true
    }
  }, [url])

  const handleDownload = () => {
    if (!src) return
    const safeName = (wish?.recipient || 'wish').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')
    downloadDataUrl(src, `wishify-${safeName || 'wish'}.png`)
  }

  return (
    <div className="rounded-[1.6rem] border border-ink/[0.07] bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <QrCode className="h-4 w-4 text-coral" aria-hidden="true" />
          Scan to open
        </p>
        <span className="rounded-full bg-cream px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-taupe">
          QR code
        </span>
      </div>

      <div className="mt-4 grid place-items-center rounded-2xl bg-cream p-3">
        {src ? (
          <img
            src={src}
            alt={`QR code that opens the wish for ${wish?.recipient || 'your recipient'}`}
            className="h-auto w-full max-w-[208px] rounded-lg"
          />
        ) : error ? (
          <div className="flex h-[208px] w-full max-w-[208px] flex-col items-center justify-center gap-2 rounded-lg bg-white px-4 text-center">
            <TriangleAlert className="h-5 w-5 text-gold-deep" aria-hidden="true" />
            <p className="text-[0.72rem] leading-relaxed text-cocoa">
              The QR code couldn’t be generated. The link above still works.
            </p>
          </div>
        ) : (
          <div className="h-[208px] w-[208px] max-w-full animate-pulse rounded-lg bg-ink/[0.06]" aria-label="Generating QR code" />
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <p className="text-[0.66rem] leading-relaxed text-taupe">
          Point a phone camera at the code to open the wish. Longer messages create denser codes.
        </p>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!src}
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-ink/10 px-3 py-1.5 text-[0.66rem] font-semibold text-cocoa transition hover:border-ink/25 hover:text-ink disabled:opacity-40"
        >
          <Download className="h-3 w-3" aria-hidden="true" />
          Save
        </button>
      </div>
    </div>
  )
}
