import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  Pencil,
  Share2,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'
import Button from '../ui/Button.jsx'
import QrPanel from './QrPanel.jsx'
import { useToast } from '../ui/Toast.jsx'
import { canNativeShare, copyText, nativeShare } from '../../lib/clipboard.js'
import { whatsappShareUrl } from '../../lib/share.js'

export default function ShareResult({ wish, url, onEdit, onCreateAnother }) {
  const { toast } = useToast()
  const reduced = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const isLong = url.length > 1600

  const copyLink = async () => {
    const ok = await copyText(url)
    if (ok) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
      toast('Link copied — go make someone smile.')
    } else {
      toast('Couldn’t copy automatically. Select the link and copy it manually.', 'error')
    }
  }

  const copyMessage = async () => {
    const ok = await copyText(wish.message)
    toast(ok ? 'Your message is on the clipboard.' : 'Couldn’t copy the message.', ok ? 'success' : 'error')
  }

  const handleShare = async () => {
    if (canNativeShare()) {
      const result = await nativeShare({
        title: `A wish for ${wish.recipient}`,
        text: 'I made something special for you ❤️',
        url,
      })
      if (result.shared || result.reason === 'cancelled') return
    }
    await copyLink()
  }

  return (
    <div>
      <div className="text-center">
        <motion.span
          initial={reduced ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage/15 text-sage shadow-[0_0_0_10px_rgba(126,154,131,0.06)]"
        >
          <Check className="h-8 w-8" strokeWidth={2.4} aria-hidden="true" />
        </motion.span>
        <p className="eyebrow mt-6 justify-center">
          <span className="h-px w-6 bg-sage/50" />
          Link ready
        </p>
        <h2 className="mt-3 font-elegant text-3xl font-medium tracking-[-0.005em] text-ink sm:text-4xl">
          Your wish is ready to travel.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cocoa">
          Send it however feels right. It opens instantly on any device — no app, no account, no
          waiting.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <label htmlFor="share-url" className="label-tiny">
            Your shareable link
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-ink/10 bg-white p-2 shadow-inner">
            <input
              id="share-url"
              readOnly
              value={url}
              onFocus={(event) => event.target.select()}
              className="min-w-0 flex-1 bg-transparent px-2 text-[0.72rem] text-cocoa outline-none"
              aria-describedby="share-url-note"
            />
            <Button variant={copied ? 'whatsapp' : 'primary'} size="sm" onClick={copyLink} className="shrink-0">
              {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>

          {isLong && (
            <div className="mt-3 flex gap-2.5 rounded-2xl border border-gold/25 bg-[#FFF8E8] px-3.5 py-3 text-[0.75rem] leading-relaxed text-cocoa">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
              <p>
                This link is on the longer side ({url.length.toLocaleString()} characters). Some
                chat apps may clip it. If you can, trim the message slightly — under about 1,400
                characters is safest.
              </p>
            </div>
          )}

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Button
              href={whatsappShareUrl(url, wish)}
              target="_blank"
              rel="noreferrer noopener"
              variant="whatsapp"
              size="md"
              className="w-full"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Share on WhatsApp
            </Button>
            {canNativeShare() ? (
              <Button variant="secondary" onClick={handleShare} className="w-full">
                <Share2 className="h-4 w-4" aria-hidden="true" />
                More sharing options
              </Button>
            ) : (
              <Button variant="secondary" onClick={copyMessage} className="w-full">
                <Copy className="h-4 w-4" aria-hidden="true" />
                Copy message
              </Button>
            )}
            <Button href={url} target="_blank" rel="noreferrer noopener" variant="secondary" className="w-full">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              See what they’ll see
            </Button>
            {canNativeShare() && (
              <Button variant="secondary" onClick={copyMessage} className="w-full">
                <Copy className="h-4 w-4" aria-hidden="true" />
                Copy message
              </Button>
            )}
          </div>

          <div
            id="share-url-note"
            className="mt-5 rounded-2xl border border-ink/[0.07] bg-cream px-4 py-3 text-[0.72rem] leading-relaxed text-cocoa"
          >
            <strong className="font-semibold text-ink">A small heads-up:</strong> the link contains
            the whole wish, so anyone who has it can open it. It isn’t stored on a server and can’t
            be edited or revoked later.
          </div>

          <div className="mt-6 flex flex-col justify-center gap-2 border-t border-ink/[0.07] pt-5 sm:flex-row">
            <Button variant="ghost" onClick={onEdit} className="w-full sm:w-auto">
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Edit this wish
            </Button>
            <Button variant="secondary" onClick={onCreateAnother} className="w-full sm:w-auto">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Create another wish
            </Button>
          </div>
        </div>

        <QrPanel url={url} wish={wish} />
      </div>
    </div>
  )
}
