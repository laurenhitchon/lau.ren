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
          <p className='availability'>Build notes</p>
          <time className='post-date' dateTime='2026-02'>
            February 2026
          </time>
          <h1 id='post-title'>A colour pairing tool that does the hard part first</h1>
          <p className='lede'>
            Building the new NSW colour pairing tool was a useful reminder that developer tools get
            better when they are opinionated about the system they belong to.
          </p>
        </header>

        <div className='article-body'>
          <p>
            The{' '}
            <a href='https://app.digital.nsw.gov.au/colour-tools/colour-pairing-tool'>
              NSW colour pairing tool
            </a>{' '}
            is live in the NSWDS app. It started with a practical problem: teams do not need another
            place to paste two hex values and get a contrast ratio back. They need a system-aware
            tool that can answer the next question: given this palette, this background and this
            interface context, which foregrounds are worth using?
          </p>

          <p>
            The main lesson was not about contrast maths. That part is well-defined. The harder work
            was deciding what the tool should refuse to do, what it should recommend by default, and
            how much detail to expose before the interface becomes a spreadsheet with nicer spacing.
          </p>

          <h2>Start with the system</h2>

          <p>
            Free-form colour pickers are tempting because they look powerful. In a design system,
            that freedom can become noise. This tool starts from the NSW brand and Aboriginal
            palettes, asks for a primary and accent family, and always includes grey because neutral
            colour carries a lot of real interface work.
          </p>

          <p>
            The implementation follows that decision. <code>buildPaletteFamilies</code> takes the
            palette data and turns it into UI-ready families, but it only keeps the approved tones
            the tool is designed around: 200, 400, 600 and 800. If a family does not have that full
            set, it does not become an option.
          </p>

          <p>
            That is product design hiding inside a JavaScript function. The data shape prevents the
            interface from drifting into colours the system is not trying to support. It also makes
            the recommendation logic smaller, clearer and easier to test.
          </p>

          <h2>Rank, do not just validate</h2>

          <p>
            Under the interface, the tool uses <code>culori.wcagContrast</code> through a small{' '}
            <code>getContrastRatio</code> helper. From there, <code>buildForegroundCandidates</code>{' '}
            gathers foregrounds from the selected primary family, selected accent family, grey and
            white, then dedupes repeated hex values so the same colour does not show up twice under
            different names.
          </p>

          <p>
            A boolean pass/fail result would have been easy. It also would have stopped too early.
            <code>scoreForegroundCandidates</code> adds the contrast ratio to every option, then{' '}
            <code>getRecommendedCandidate</code> looks for AAA normal text first and gives a small
            preference to colours from the primary family. The default recommendation should be
            strong enough for body copy and still feel like it belongs to the selected colour
            system.
          </p>

          <p>
            The tool still needs to surface useful-but-limited pairings.{' '}
            <code>getForegroundOptionsMeetingAaLarge</code> keeps anything that reaches 3:1 and
            sorts those options by contrast, so a colour can be considered for large text, icons or
            UI treatment without pretending it is safe for normal body copy.
          </p>

          <h2>Make the preview honest</h2>

          <p>
            The preview does not render every example all the time.{' '}
            <code>supportsLargeTextPreview</code> controls whether the large heading appears, and{' '}
            <code>supportsNormalTextPreview</code> controls whether body text and button examples
            appear. If a pairing only passes for large text, the preview narrows to that use case.
            If it fails, the UI says so instead of dressing it up.
          </p>

          <p>
            The status labels come from small functions too: <code>getPreviewHeroRatingLabel</code>,{' '}
            <code>getPreviewHeroStatusLabel</code>, <code>getContrastTone</code> and{' '}
            <code>getCompliancePills</code>. They map the raw ratio to AA large, AA normal, AAA
            large and AAA normal outcomes. Keeping that logic close to the UI matters because the
            labels, colours and preview behaviour all need to move together.
          </p>

          <h2>Make the decision portable</h2>

          <p>
            A pairing tool is not finished if the result cannot be shared. The selected palette,
            primary family, accent family, background and foreground all need to travel with the
            link. <code>getInitialPairingState</code> reads that state on load,{' '}
            <code>parseSharedPairParam</code> handles compact shared pair values, and{' '}
            <code>updateUrlParams</code> keeps the browser URL in sync as the selection changes.
          </p>

          <p>
            The copy action follows the same idea. It gives the foreground token and value,
            background token and value, contrast ratio, and compliance summary. HEX, RGB, HSL and
            OKLCH are all available because designers and developers do not always need the same
            representation at the same point in the work.
          </p>

          <h2>The useful constraint</h2>

          <p>
            The tool is deliberately bounded. It does not let you invent a colour, tune every shade,
            or optimise a one-off combination outside the NSW palettes. For this product, that is
            the right tradeoff. The job is not infinite exploration. The job is to make the approved
            colour system easier to use without making teams manually test every pairing from
            scratch.
          </p>

          <p>
            The developer takeaway is simple: when building design-system tooling, start with the
            tokens, encode the product opinion in small functions, rank useful choices instead of
            only validating input, and make the selected state easy to share. The best tools do not
            just expose data. They reduce the number of shaky decisions a team has to make.
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
