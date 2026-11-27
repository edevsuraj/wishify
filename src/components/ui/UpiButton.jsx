import { useEffect, useRef, useState } from 'react'
import { Copy } from 'lucide-react'
import { copyText } from '../../lib/clipboard.js'
import { SITE } from '../../lib/site.js'

export default function UpiButton({ className = '', showLabel = true }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleCopy = async () => {
    const ok = await copyText(SITE.upi)
    if (!ok) return
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Copy UPI ID"
      aria-label={`Copy UPI ID ${SITE.upi}`}
      className={className}
    >
      <Copy className="h-3 w-3 shrink-0" aria-hidden="true" />
      <span>{showLabel ? `UPI: ${SITE.upi}` : SITE.upi}</span>
      {copied && <span className="text-sage">Copied</span>}
    </button>
  )
}
