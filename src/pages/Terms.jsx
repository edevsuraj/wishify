import { Link } from 'react-router-dom'
import usePageMeta from '../lib/usePageMeta.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import { BulletList, Callout, LastUpdated, LegalSection } from '../components/ui/Prose.jsx'
import { SITE } from '../lib/site.js'

const UPDATED = '23 November 2026'

export default function Terms() {
  usePageMeta(
    'Terms',
    'The simple rules for using Wishify: be kind, share thoughtfully, and understand that self-contained links cannot be edited or revoked.',
  )

  return (
    <>
      <PageHeader
        eyebrow="The fine print"
        title="A few reasonable rules."
        lead="Wishify is a free, static greeting tool. These terms explain what you can expect from it and what it expects from you — in language intended to be readable."
      >
        <LastUpdated date={UPDATED} />
      </PageHeader>

      <div className="container-page py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          <Callout tone="warm">
            <strong className="font-semibold text-ink">The short version:</strong> use Wishify to be
            kind. Don’t use it to harass, deceive, or break the law. Your greeting is your
            responsibility, and once a link is shared it cannot be taken back.
          </Callout>

          <LegalSection title="1. Accepting these terms">
            <p>
              By using Wishify, you agree to these terms. If you do not agree, please do not use the
              site. These terms apply to everyone who creates a wish or opens a wish link. There is
              no account to close; simply stop using the site if you no longer accept the terms.
            </p>
          </LegalSection>

          <LegalSection title="2. What Wishify is">
            <p>
              Wishify is a free, browser-based tool for creating personalised digital greetings. It
              is a static front-end application: there is no user account, no storage of greetings
              on a server, and no guarantee that any particular link will remain accessible if the
              site itself is discontinued.
            </p>
            <p>
              We may change, improve, or remove features at any time. Because no greeting data is
              stored by us, changes to the site cannot retroactively alter the content that is
              already encoded in a link.
            </p>
          </LegalSection>

          <LegalSection title="3. Your content and your responsibility">
            <p>
              You are responsible for everything you put into a wish — names, messages, headings,
              and relationship labels. By creating a wish you confirm that:
            </p>
            <BulletList
              items={[
                'You have the right to use the content you enter, and sharing it will not violate anyone’s privacy, copyright, or other rights.',
                'You will not use Wishify to harass, threaten, defame, impersonate, deceive, or discriminate against anyone.',
                'You will not include illegal content, explicit content involving minors, malware, or attempts to exploit the service.',
                'You understand that the recipient’s name and message are visible to anyone who obtains the link.',
              ]}
            />
            <p>
              We provide the tool, but we do not review, moderate, host, or endorse greetings.
              Because no content is stored on our servers, we generally cannot remove a greeting
              that has already been shared.
            </p>
          </LegalSection>

          <LegalSection title="4. Self-contained links">
            <p>
              Greeting data is encoded into the URL fragment. This has practical consequences you
              should understand before sharing:
            </p>
            <BulletList
              items={[
                'Anyone with the link can view the greeting. The link is the only access control.',
                'Links cannot be edited, revoked, tracked, or deleted by Wishify.',
                'Chat apps, email clients, or link shorteners may truncate long URLs. If a link is clipped, the greeting may not open.',
                'If you need to change the content, create a new wish and share the new link.',
              ]}
            />
          </LegalSection>

          <LegalSection title="5. Acceptable use">
            <p>You agree not to:</p>
            <BulletList
              items={[
                'Attempt to disrupt, overload, or reverse-engineer the site in a way that harms other users.',
                'Use automated means to generate excessive requests that degrade the service.',
                'Misrepresent Wishify as your own product, or use its branding in a misleading way.',
                'Use the service in violation of applicable laws or the rights of others.',
              ]}
            />
          </LegalSection>

          <LegalSection title="6. Advertising and third parties">
            <p>
              Wishify may display clearly labelled advertising through Google AdSense once a
              publisher configuration is in place and you consent. Ads are placed outside the
              greeting and never gate functionality. Third-party ad providers operate under their
              own terms and privacy policies. We do not control their content, and their
              availability is not guaranteed.
            </p>
            <p>
              The site also loads web fonts from Google Fonts. Your use of those services is subject
              to their respective policies.
            </p>
          </LegalSection>

          <LegalSection title="7. Intellectual property">
            <p>
              The Wishify name, visual design, and original code are protected by applicable
              intellectual property laws. You may not copy or redistribute the site as your own
              product. Third-party libraries and motion inspiration are used under their respective
              open-source licences (see the About page for credits).
            </p>
            <p>
              You retain whatever rights you hold in the words you write. Because the greeting is not
              stored by us, we claim no licence over your message beyond the technical act of
              encoding it into the link at your request.
            </p>
          </LegalSection>

          <LegalSection title="8. Availability and warranties">
            <p>
              Wishify is provided “as is” and “as available”, without warranties of any kind, express
              or implied, including merchantability, fitness for a particular purpose, or
              non-infringement. We do not guarantee that the site will be uninterrupted, error-free,
              or that every link will work in every app, browser, or region.
            </p>
            <p>
              Hosting is provided by Cloudflare Pages under its free tier. There is no paid
              dependency or service-level agreement.
            </p>
          </LegalSection>

          <LegalSection title="9. Limitation of liability">
            <p>
              To the fullest extent permitted by applicable law, Wishify and its operators are not
              liable for indirect, incidental, special, consequential, or punitive damages arising
              from your use of the site, including lost data, missed messages, or the consequences of
              sharing a link with the wrong person. Your sole remedy if you are dissatisfied is to
              stop using the site.
            </p>
          </LegalSection>

          <LegalSection title="10. Changes to these terms">
            <p>
              We may update these terms from time to time. The “last updated” date at the top of the
              page reflects the latest version. Continued use of Wishify after a change means you
              accept the revised terms.
            </p>
          </LegalSection>

          <LegalSection title="11. Governing law">
            <p>
              These terms are governed by the laws applicable in the operator’s jurisdiction,
              without regard to conflict-of-law principles. If any provision is found to be
              unenforceable, the remaining provisions remain in effect.
            </p>
          </LegalSection>

          <LegalSection title="12. Contact">
            <p>
              Questions about these terms? Email{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-ink underline decoration-coral/40 underline-offset-4 hover:decoration-coral"
              >
                {SITE.email}
              </a>
              . For how we handle data, see our{' '}
              <Link to="/privacy" className="font-medium text-ink underline decoration-coral/40 underline-offset-4 hover:decoration-coral">
                Privacy policy
              </Link>
              .
            </p>
          </LegalSection>
        </div>
      </div>
    </>
  )
}
