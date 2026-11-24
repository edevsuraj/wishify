import { Link } from 'react-router-dom'
import usePageMeta from '../lib/usePageMeta.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import { BulletList, Callout, LastUpdated, LegalSection } from '../components/ui/Prose.jsx'
import { SITE } from '../lib/site.js'

const UPDATED = '23 November 2026'

export default function Privacy() {
  usePageMeta(
    'Privacy',
    'How Wishify handles data: greeting content lives inside the link fragment, not on a server. No accounts, no recipient database, no tracking pixels.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Privacy, plainly"
        title="Your words belong to you (and the person you send them to)."
        lead="Wishify is a static website. There is no account system, no recipient database, and no server that stores your greeting. This page explains exactly what that means in practice."
      >
        <LastUpdated date={UPDATED} />
      </PageHeader>

      <div className="container-page py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <Callout tone="warm">
            <strong className="font-semibold text-ink">The short version:</strong> your greeting is
            encoded into the link itself. It is never uploaded or stored by us. Anyone who has the
            link can read it, so share it the way you would share a postcard. Links cannot be
            revoked or edited.
          </Callout>

          <LegalSection title="1. What a wish link contains">
            <p>
              When you generate a wish, these details are written as readable parameters after the{' '}
              <code className="rounded bg-cream px-1 py-0.5 text-[0.85em]">#</code> in the URL,
              with normal URL escaping for spaces and non-Latin text:
            </p>
            <BulletList
              items={[
                'The occasion you chose.',
                'The recipient’s name and, optionally, your name and relationship.',
                'Your personal message and optional short heading.',
                'The selected design and animation preference.',
              ]}
            />
            <p>
              The fragment after the <code className="rounded bg-cream px-1 py-0.5 text-[0.85em]">#</code>{' '}
              is processed entirely by the browser. Standard HTTP requests do not include it, so
              the greeting content is not sent to Cloudflare or to us when a recipient opens the
              link. Anyone with access to the URL — including a chat provider or someone looking
              over a shoulder — can read it.
            </p>
          </LegalSection>

          <LegalSection title="2. What we do not collect">
            <BulletList
              items={[
                'No account, email address, or password is required.',
                'No recipient list or greeting content is stored in a database.',
                'We do not use analytics, tracking pixels, fingerprinting, or advertising retargeting of our own.',
                'We do not sell, rent, or share personal information — we do not have it to share.',
              ]}
            />
          </LegalSection>

          <LegalSection title="3. Hosting and technical data">
            <p>
              Wishify is hosted as a static site on Cloudflare Pages or Vercel. Like any web host,
              the provider may process standard request information (such as IP address, user agent,
              and the requested page) to deliver and secure the site. This is infrastructure-level
              processing and does not include the greeting stored in the URL fragment.
            </p>
            <p>
              We load typefaces from Google Fonts. That request goes to Google’s servers and may
              reveal your IP address and browser details to them, as described in Google’s privacy
              policy. If you prefer to avoid third-party font requests, your browser’s blocking
              tools or a privacy-focused browser can prevent them; the site remains usable with
              fallback fonts.
            </p>
          </LegalSection>

          <LegalSection title="4. Advertising (when enabled)">
            <p>
              Wishify is free to use. To help cover hosting costs, the site is prepared to display
              advertising through Google AdSense. The ad system is disabled by default and only
              activates when a publisher ID is configured and you explicitly accept ads.
            </p>
            <BulletList
              items={[
                'Ads are clearly labelled and placed outside the greeting itself. They never cover or interrupt a greeting animation.',
                'You are never asked to click an ad to unlock a feature.',
                'When ads are enabled and you consent, Google and its partners may use cookies or similar technologies to serve and measure ads. Google may personalise ads based on your activity on this and other sites.',
                'You can decline ads; the site continues to work fully. You can change your choice later by clearing this site’s data in your browser settings.',
                'You can learn about Google’s advertising practices and opt out of personalised advertising at Google’s Ads Settings and the Google Privacy Policy.',
              ]}
            />
            <p>
              We do not claim that any ad configuration guarantees approval, revenue, or any
              particular result. If ads are enabled in the future, this page will continue to
              describe the actual configuration.
            </p>
          </LegalSection>

          <LegalSection title="5. Cookies and local storage">
            <p>
              Wishify does not set advertising or tracking cookies by default. We use browser
              storage in two small, functional ways:
            </p>
            <BulletList
              items={[
                'sessionStorage keeps a draft of the wish you are currently creating, so switching designs or steps does not lose your words. It is cleared when you close the tab, start a new wish, or clear site data.',
                'localStorage stores only your ad-consent choice (and, in the current session, recently used designs). It is a preference, not a tracking identifier.',
              ]}
            />
            <p>
              Greeting links do not rely on localStorage, cookies, or any account. They work on a
              different device, in a private window, and after clearing browser data.
            </p>
          </LegalSection>

          <LegalSection title="6. Your choices and the limits of self-contained links">
            <BulletList
              items={[
                'Share the link only with the person (or people) you intend to see the wish. Possession of the link is the only access control.',
                'We cannot edit, delete, recall, or track a wish after it is shared. The content is part of the link, not a record we control.',
                'If you send a wish to the wrong person, the practical remedy is to ask them not to share it further; we cannot revoke it.',
                'You can clear the locally saved draft at any time using “Start fresh” in the creator, or by clearing site data in your browser.',
                'If a link is clipped by a chat app, the recipient may not be able to open it. Sending a shorter message reduces this risk.',
              ]}
            />
          </LegalSection>

          <LegalSection title="7. Children">
            <p>
              Wishify is not directed at children under 13, and we do not knowingly collect personal
              information from them. Because no account is created and no greeting is stored by us,
              there is no child-specific profile on our systems.
            </p>
          </LegalSection>

          <LegalSection title="8. Security">
            <p>
              Decoded link data is validated against strict allowlists and length limits, and all
              personalised text is rendered as plain text by React — never as HTML or executable
              code. No decoded content is evaluated. The site is served over HTTPS. No system is
              perfectly secure, and no transmission over the internet can be guaranteed to be
              completely private, but the architecture deliberately minimises what can be exposed.
            </p>
          </LegalSection>

          <LegalSection title="9. Changes to this policy">
            <p>
              If Wishify changes in a way that affects this policy — for example, enabling ads or
              adding a new third-party service — we will update this page and its “last updated”
              date. Because there is no account, we cannot email you about changes; please check
              back if it matters to you.
            </p>
          </LegalSection>

          <LegalSection title="10. Contact">
            <p>
              Questions about privacy? Email{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-ink underline decoration-coral/40 underline-offset-4 hover:decoration-coral"
              >
                {SITE.email}
              </a>
              . You can also read our{' '}
              <Link to="/terms" className="font-medium text-ink underline decoration-coral/40 underline-offset-4 hover:decoration-coral">
                Terms
              </Link>{' '}
              and{' '}
              <Link to="/about" className="font-medium text-ink underline decoration-coral/40 underline-offset-4 hover:decoration-coral">
                About page
              </Link>
              .
            </p>
          </LegalSection>
        </div>
      </div>
    </>
  )
}
