import Link from 'next/link'

import { SiteFooter } from '../../components/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'

export default function NswEmailToolkitPost() {
  return (
    <main className='site-shell'>
      <SiteHeader />

      <div className='vertical-name' aria-hidden='true'>
        Writing
      </div>

      <article className='article' aria-labelledby='post-title'>
        <header className='article-header'>
          <p className='availability'>HTML email</p>
          <time className='post-date' dateTime='2026-04'>
            April 2026
          </time>
          <h1 id='post-title'>What the NSW Email Toolkit gets right</h1>
          <p className='lede'>
            Government email is often treated as a small delivery detail. It is not. For many
            people, email is the service surface they see most often.
          </p>
        </header>

        <div className='article-body'>
          <p>
            The <a href='https://email.digital.nsw.gov.au/'>NSW Email Toolkit</a> exists to make
            those service surfaces more consistent, accessible and maintainable. It brings reusable
            templates, components, standards, guidance and tools into one place so NSW Government
            teams can send emails that feel official, work across clients and are easier to review.
          </p>

          <p>
            That matters because HTML email is still one of the strangest parts of front-end
            development. The web has moved on, but email clients have not moved evenly. Outlook,
            mobile clients and webmail all carry their own rendering behaviours. Good email systems
            accept that reality. They give teams a constrained, tested foundation instead of asking
            every campaign, service update or transaction to rediscover the same edge cases.
          </p>

          <h2>Consistency builds trust</h2>

          <p>
            The toolkit frames consistent NSW Government branding as a core feature, not surface
            decoration. Shared headers, footers, logo rules, colour guidance, spacing, typography
            and content patterns help an email feel recognisably official. In a government context,
            that is a trust signal. People should not have to work out whether an email about a
            service, event, payment or disruption is legitimate from scratch each time.
          </p>

          <h2>Accessibility needs defaults</h2>

          <p>
            Accessible email depends on boring details done well: readable type, sufficient colour
            contrast, meaningful links, useful alt text, clear headings, generous tap targets and
            logical mobile stacking. The toolkit turns those decisions into reusable defaults. That
            is the point of a design system. It does not remove judgement, but it moves the baseline
            closer to quality before a team starts customising.
          </p>

          <h2>Components make maintenance possible</h2>

          <p>
            The component library covers the pieces teams reach for repeatedly: buttons, dividers,
            images, links, headers, footers, hero banners, callouts, cards, lists, tables and
            templates for transactional, informational, promotional and internal communications.
            Those patterns are practical because they map to real publishing needs. They also make
            handover easier. A new team member can understand a template made of named parts faster
            than a hand-coded one-off file.
          </p>

          <h2>The best systems reduce decisions</h2>

          <p>
            What I like about the NSW Email Toolkit is that it treats email as a product surface
            with standards, not a disposable campaign artefact. It gives designers, developers,
            content people and service teams a shared language. The result is quieter than a bespoke
            template, but it is also more useful: fewer avoidable decisions, fewer rendering
            surprises, and a clearer path to emails that people can read, trust and act on.
          </p>
        </div>

        <footer className='article-footer'>
          <Link href='/writing'>Back to writing</Link>
        </footer>
      </article>

      <SiteFooter />
    </main>
  )
}
