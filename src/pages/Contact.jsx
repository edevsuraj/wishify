import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Copy, Mail, MessageCircleQuestion, Send } from 'lucide-react'
import usePageMeta from '../lib/usePageMeta.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import { SITE } from '../lib/site.js'
import { copyText } from '../lib/clipboard.js'
import { useToast } from '../components/ui/Toast.jsx'

export default function Contact() {
  usePageMeta(
    'Contact',
    'Get in touch with Wishify — questions, feedback, accessibility notes, or just a hello. No support form spam, just a real inbox.',
  )

  const { toast } = useToast()
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [opened, setOpened] = useState(false)

  const handleCopyEmail = async () => {
    const ok = await copyText(SITE.email)
    toast(ok ? 'Email address copied.' : 'Couldn’t copy the address.', ok ? 'success' : 'error')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = `Wishify — ${topic.trim() || 'Hello'}`
    const body = [
      message.trim(),
      '',
      name.trim() ? `— ${name.trim()}` : '',
      '',
      'Sent from the Wishify contact page.',
    ].join('\n')
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title="Tell us what you’re thinking."
        lead="Feedback, a bug, an accessibility issue, a design idea, or simply a wish that made someone’s day — it all lands in a real inbox and gets read."
      />

      <section className="container-page py-14 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <div className="rounded-[1.6rem] border border-ink/[0.07] bg-paper p-6 shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-coral ring-1 ring-ink/[0.04]">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-[1.05rem] font-semibold text-ink">The direct route</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-cocoa">
                Email is the fastest way to reach us. No ticket numbers, no chatbot loop.
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-3 inline-block break-all font-display text-lg font-semibold text-ink underline decoration-coral/40 underline-offset-4 transition hover:decoration-coral"
              >
                {SITE.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-3.5 py-1.5 text-xs font-medium text-cocoa transition hover:border-ink/25 hover:text-ink"
              >
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                Copy address
              </button>
              <p className="mt-4 text-[0.7rem] leading-relaxed text-taupe">
                We usually reply within a couple of days. Wishify is a small project, not a
                24/7 support desk — but every message is read by a person.
              </p>
            </div>

            <div className="rounded-[1.6rem] border border-ink/[0.07] bg-cream p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-gold-deep ring-1 ring-ink/[0.04]">
                <MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-[1.05rem] font-semibold text-ink">Check the FAQ first</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-cocoa">
                Most questions — accounts, link privacy, editing, message limits — are answered
                there.
              </p>
              <Link
                to="/about#faq"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline"
              >
                Read the FAQ
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-[1.6rem] border border-coral/15 bg-[#FFF4EE] p-6">
              <p className="text-sm leading-relaxed text-cocoa">
                <strong className="font-semibold text-ink">A note on wish links:</strong> we cannot
                retrieve, edit, or delete a greeting from a link. Those links live entirely in the
                URL and never touch a database. If a link isn’t opening, ask the sender to resend
                the complete URL, including everything after the # symbol.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[1.8rem] border border-ink/[0.07] bg-paper p-6 shadow-soft sm:p-8"
          >
            <h2 className="text-xl font-semibold tracking-tight text-ink">Write a message</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-cocoa">
              This form opens your own email app with everything filled in. Nothing is submitted to
              this website.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="contact-name" className="field-label">
                  Your name <span className="text-xs font-normal text-taupe">optional</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={60}
                  placeholder="Alex"
                  className="field-input"
                />
              </div>

              <div>
                <label htmlFor="contact-topic" className="field-label">
                  What’s it about? <span className="text-xs font-normal text-taupe">optional</span>
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  className="field-input appearance-none"
                >
                  <option value="">Just saying hello</option>
                  <option value="Feedback or idea">Feedback or idea</option>
                  <option value="Something is broken">Something is broken</option>
                  <option value="Accessibility">Accessibility</option>
                  <option value="Privacy question">Privacy question</option>
                  <option value="Advertising or partnerships">Advertising or partnerships</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="field-label">
                  Message
                  <span className="text-xs font-normal text-taupe">{message.length}/1200</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  value={message}
                  onChange={(event) => setMessage(event.target.value.slice(0, 1200))}
                  placeholder="Tell us what’s on your mind…"
                  className="field-input resize-y"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                <Send className="h-4 w-4" aria-hidden="true" />
                Open in your email app
              </Button>

              {opened && (
                <p className="flex items-center justify-center gap-1.5 text-center text-xs font-medium text-sage">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Your email app should now be open. If nothing happened, email us directly at {SITE.email}.
                </p>
              )}

              <p className="text-center text-[0.68rem] leading-relaxed text-taupe">
                We don’t store form submissions. See our{' '}
                <Link to="/privacy" className="underline underline-offset-2 hover:text-ink">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
