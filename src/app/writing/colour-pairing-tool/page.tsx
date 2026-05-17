import Link from 'next/link'

import { SiteFooter } from '../../components/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'

export default function ColourPairingToolPost() {
  return (
    <main className='site-shell'>
      <SiteHeader />

      <div className='vertical-name' aria-hidden='true'>
        Writing
      </div>

      <article className='article' aria-labelledby='post-title'>
        <header className='article-header'>
          <p className='availability'>Accessibility</p>
          <h1 id='post-title'>Designing colour decisions into the workflow</h1>
          <p className='lede'>
            Colour contrast is easy to check at the end of a project. The better move is to make
            good pairings available before the wrong combinations become part of the design.
          </p>
        </header>

        <div className='article-body'>
          <p>
            The{' '}
            <a href='https://app.digital.nsw.gov.au/colour-tools/colour-pairing-tool'>
              NSW colour pairing tool
            </a>{' '}
            is useful because it turns an accessibility requirement into a decision-making surface.
            Instead of asking teams to remember contrast ratios, inspect every component manually,
            or retrofit colours late in delivery, it lets them choose a primary colour, choose an
            accent colour, and immediately see which text and interface pairings can carry content.
          </p>

          <p>
            That timing matters. Colour is usually chosen early, when a product is still
            establishing hierarchy, tone and brand expression. If accessibility is checked only
            after screens have settled, the conversation becomes defensive: which colours do we have
            to change, and how much will it disrupt the approved design? A pairing tool shifts that
            conversation forward. It lets teams ask: which combinations are safe to use in the first
            place?
          </p>

          <h2>It starts with the system</h2>

          <p>
            The tool is strongest because it does not begin with arbitrary colour input. It begins
            with the NSW colour system. You can work with the brand palette or the Aboriginal
            palette, select primary and accent families, and grey is added automatically as a third
            practical family. That matters because real interfaces rarely use one colour in
            isolation. They use brand colour, supporting colour and neutral surfaces together.
          </p>

          <p>
            The available shades are deliberately constrained. The interface focuses on useful tones
            rather than every possible token, then shows the same colour in HEX, RGB, HSL and OKLCH.
            That combination is very design-system minded: it keeps the choice narrow enough to be
            repeatable, but gives designers and developers the implementation detail they need when
            a pairing moves into a component.
          </p>

          <h2>It recommends, not just reports</h2>

          <p>
            A basic contrast checker tells you whether two colours pass. This tool does more useful
            work than that. For each selected background it builds candidate foregrounds from the
            primary, accent and grey families, checks the contrast ratio, and surfaces options that
            meet the relevant WCAG thresholds: AA large text at 3:1, AA normal text at 4.5:1, and
            AAA normal text at 7:1.
          </p>

          <p>
            The recommendation logic also behaves like a design tool rather than a spreadsheet. It
            prefers foregrounds that move in the right tonal direction, keeps useful distance
            between foreground and background, favours system colours before falling back to white,
            and still ranks by contrast when the choices are otherwise close. The result is a set of
            pairings that feel practical, not merely technically valid.
          </p>

          <h2>It makes the state shareable</h2>

          <p>
            The smaller interaction details are important. A selected pairing can be represented in
            the URL, so a designer, developer or content person can send someone else the exact
            palette, background and foreground being discussed. The preview updates with a clear
            status, compliance pills show which thresholds pass or fail, and the experience includes
            screen-reader announcements for the selected combination.
          </p>

          <h2>Good constraints protect good design</h2>

          <p>
            There is a common fear that accessibility will make an interface visually blunt. In
            practice, the opposite is usually true. Clear constraints force better decisions about
            scale, contrast, emphasis and restraint. If a colour cannot carry body text, it may
            still work as a border, surface, icon accent or decorative cue. The important thing is
            knowing that before the design relies on it for meaning.
          </p>

          <h2>The best standard is one people can use</h2>

          <p>
            Colour contrast is not the whole of accessibility, but it is one of the easiest barriers
            to prevent. The value of the colour pairing tool is not just that it checks
            combinations. It makes the check visible, quick and close to the moment of choice. That
            is how design systems should work: not as a rulebook people remember under pressure, but
            as a set of useful defaults and tools that make the right decision easier than the risky
            one.
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
