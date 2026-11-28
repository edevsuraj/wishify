import { useEffect, useRef, useState } from 'react'
import { Copy, Wallet } from 'lucide-react'
import { copyText } from '../../lib/clipboard.js'
import { SITE, UPI_LINK } from '../../lib/site.js'

export default function UpiButton({ className = '', showLabel = true }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleCopy = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    const ok = await copyText(SITE.upi)
    if (!ok) return
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <a
        href={UPI_LINK}
        title={`Pay ${SITE.upiName} via UPI`}
        aria-label={`Open UPI app to pay ${SITE.upiName} at ${SITE.upi}`}
        className="inline-flex items-center gap-1.5"
      >
        <Wallet className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span>{showLabel ? `UPI: ${SITE.upi}` : SITE.upi}</span>
      </a>
      <button
        type="button"
        onClick={handleCopy}
        title="Copy UPI ID"
        aria-label={`Copy UPI ID ${SITE.upi}`}
        className="shrink-0 opacity-60 transition hover:opacity-100"
      >
        <Copy className="h-3 w-3" aria-hidden="true" />
      </button>
      {copied && <span className="text-sage">Copied</span>}
    </span>
  )
}
