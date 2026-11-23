import { Link2, RotateCcw, Share2, Sparkles } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { useToast } from '../ui/Toast.jsx'
import { canNativeShare, copyText, nativeShare } from '../../lib/clipboard.js'

export default function WishActions({ wish, url, onReplay, className = '' }) {
  const { toast } = useToast()

  const handleShare = async () => {
    if (canNativeShare()) {
      const result = await nativeShare({
        title: `A wish for ${wish.recipient}`,
        text: 'I made something special for you ❤️',
        url,
      })
      if (result.shared) return
      if (result.reason === 'cancelled') return
    }
    const ok = await copyText(url)
    toast(
      ok ? 'Link copied — paste it anywhere you like.' : 'Couldn’t copy automatically. Long-press the link to copy it.',
      ok ? 'success' : 'error',
    )
  }

  const handleCopy = async () => {
    const ok = await copyText(url)
    toast(ok ? 'Link copied to your clipboard.' : 'Couldn’t copy. Long-press the link instead.', ok ? 'success' : 'error')
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="grid gap-3 sm:grid-cols-3">
        <Button variant="secondary" size="lg" onClick={onReplay} className="w-full">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Replay the magic
        </Button>
        <Button variant="primary" size="lg" onClick={handleShare} className="w-full">
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share this wish
        </Button>
        <Button variant="coral" size="lg" to="/create" className="w-full">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Create your own
        </Button>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="mx-auto mt-4 flex items-center gap-1.5 text-xs font-medium text-taupe underline-offset-4 transition hover:text-ink hover:underline"
      >
        <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
        Copy this link
      </button>
    </div>
  )
}
