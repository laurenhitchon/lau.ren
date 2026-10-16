import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '../../components/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'

export const metadata: Metadata = {
  title: 'Contrast is a measurement',
  description:
    'Building the NSW Colour Contrast Checker: making WCAG numbers true, showing APCA beside them, and where the two models disagree across the NSW palette.',
  alternates: {
    canonical: '/writing/contrast-is-a-measurement',
  },
}

export default function ContrastIsAMeasurementPost() {
  return (
    <main className='site-shell'>
      <SiteHeader />

      <div className='vertical-name' aria-hidden='true'>
        Writing
      </div>

      <article className='article' aria-labelledby='post-title'>
        <header className='article-header'>
          <p className='availability'>Colour and accessibility</p>
          <time className='post-date' dateTime='2026-10'>
            October 2026
          </time>
          <h1 id='post-title'>Contrast is a measurement</h1>
          <p className='lede'>
            The NSW Colour Contrast Checker now has a public home of its own. Building it meant
            treating every number on the page as a claim that has to be true, and being honest about
            where two ways of measuring contrast disagree.
          </p>
        </header>

        <div className='article-body'>
          <p>
            The <a href='https://contrast.design.nsw.gov.au'>NSW Colour Contrast Checker</a> is live
            at contrast.design.nsw.gov.au, open to anyone, no sign-in. Pick a background and a text
            colour from the NSW Government palette and the whole page becomes that pairing, header
            and buttons included. Each colour is named the way designers say it and the way
            developers type it (&ldquo;NSW Blue 01 &middot; nsw-blue-800&rdquo;), the readout says
            which logo colourway the masterbrand allows on that background, and check mode takes any
            pairing you already have, as a token, a palette name or any CSS colour.
          </p>

          <p>
            An earlier version lived inside the NSWDS app, and{' '}
            <Link href='/writing/colour-pairing-tool'>the post about it</Link> covered the product
            decisions: which tones to offer, how to rank foregrounds, how to keep a pairing
            shareable. This one is about the measurement. The arithmetic has been pulled out of a
            client component that now runs past 3,000 lines and put under test, and every number the
            tool prints has had to answer a blunt question: is that actually true?
          </p>

          <h2>The maths everyone agrees on</h2>

          <p>
            WCAG 2.2 contrast is simple and fully specified. Convert each colour&apos;s sRGB
            channels to linear light, weight them into a relative luminance, then compare the two:
          </p>

          <pre>
            <code>{`L = 0.2126 * R + 0.7152 * G + 0.0722 * B
ratio = (L_lighter + 0.05) / (L_darker + 0.05)`}</code>
          </pre>

          <p>
            The result runs from 1:1 to 21:1. Normal text needs 4.5:1 for AA, large text (24px, or
            19px bold) needs 3:1, and AAA asks for 7:1 and 4.5:1. The ratio is symmetric: white on
            navy and navy on white measure the same. This is the part every contrast checker shares.
          </p>

          <p>So the interesting work isn&apos;t the formula. It&apos;s everything around it.</p>

          <h2>Making the numbers true</h2>

          <p>
            Pulling the measurement into <code>lib/contrast.ts</code> and writing tests against it
            turned up three defects, none of them visible in normal use and all of them the kind of
            thing a contrast tool can&apos;t afford.
          </p>

          <p>
            The first was a guard that never ran. The original code returned{' '}
            <code>culori.wcagContrast(a, b) ?? 0</code> so a bad value would read as a fail. But
            culori doesn&apos;t return null on junk input. It throws. The fallback was dead code,
            and the first unvalidated string from check mode would have taken the component down.
            It&apos;s a try/catch now, which also stopped every successful call parsing both colours
            twice, on a function that runs inside a render loop.
          </p>

          <p>
            The second was impossible ratios. A colour can parse cleanly and still sit outside sRGB,
            and the arithmetic doesn&apos;t care. <code>oklch(200% 999 999deg)</code> came back with
            a negative ratio. <code>rgb(999, 999, 999)</code> came back at 22.998:1, better than the
            theoretical maximum. Ratios are now clamped to WCAG&apos;s 1 to 21.
          </p>

          <p>
            The third is my favourite, because it&apos;s so small. A pairing that measured 4.4989:1
            was printed as 4.50, right beside a verdict that said it failed AA. Both were
            &ldquo;correct&rdquo;. <code>toFixed</code> rounds, and 4.4989 rounds up. The fix is to
            truncate:
          </p>

          <pre>
            <code>{`export function formatContrastRatio(ratio: number, digits = 2) {
  const scale = 10 ** digits
  return (Math.floor(ratio * scale) / scale).toFixed(digits)
}`}</code>
          </pre>

          <p>
            Now the printed number is always a value the pairing actually reaches. White on NSW
            Orange 02 reads 3.17:1, not 3.18. Nobody will notice that difference. Somebody will
            notice a 4.50 that fails.
          </p>

          <h2>A second reading: APCA</h2>

          <p>
            Next to the WCAG verdict, the checker shows an experimental APCA comparison. APCA, the
            Accessible Perceptual Contrast Algorithm, measures lightness contrast in a way that
            tries to follow how people actually perceive text on a background. It reports an Lc
            value, from 0 up to about 106 for black on white and 108 for white on black, through
            Color.js&apos;s implementation of version 0.0.98G-4g.
          </p>

          <p>Two things make it feel different to use.</p>

          <p>
            It&apos;s directional. WCAG says white on NSW Blue 01 and NSW Blue 01 on white are both
            14.37:1. APCA scores white text on the navy at Lc 103.6 and navy text on white at Lc
            100.5. White on NSW Orange 02 is Lc 63.4; orange text on white is Lc 58.0, while WCAG
            gives 3.17:1 either way. Light text on a dark background and dark text on a light one
            are different reading experiences, and APCA treats them that way. That also means the
            argument order matters and getting it wrong is silent, so a test pins it.
          </p>

          <p>
            And it has no single pass mark. APCA&apos;s guidance is a lookup table keyed by font
            size and weight. The checker tests two rows: 16px regular body text, which needs Lc 90,
            and large text, which it measures against 28px bold at Lc 43. The large-text example on
            the page is 30px bold, and the table has no 30px row, so the checker takes the stricter
            neighbour rather than the kinder one. 32px bold would only need Lc 40.
          </p>

          <h2>Where the two disagree</h2>

          <p>
            The reason to show both is that they don&apos;t always agree, and the disagreements
            follow a pattern. Running every pairing the checker offers through both models, using
            the site&apos;s own measurement code:
          </p>

          <p>
            The brand palette offers 494 pairs for body text, all at 4.5:1 or better. Only 51 of
            them reach Lc 90. 39 sit below Lc 60, and 14 below Lc 45. Across both the brand and
            Aboriginal palettes it&apos;s 767 body-text pairs, 66 reaching Lc 90 and 99 below Lc 60.
          </p>

          <p>
            The pairs that pass WCAG and score poorly on APCA are almost all mid tones on dark
            backgrounds. NSW Orange 02 on NSW Blue 01 is 4.52:1, a clean AA pass for body text, and
            Lc 39.4. NSW Brown 02 on NSW Red 01 is 4.50:1 and Lc 38.7. Put those side by side on a
            screen and APCA&apos;s reading is easier to believe than WCAG&apos;s.
          </p>

          <p>
            The disagreement runs the other way for pale colours on mid tones. NSW Yellow 04 on NSW
            Purple 02 is 4.25:1, so WCAG files it under large text only. APCA gives it Lc 70.2. 62
            of the brand palette&apos;s large-text-only pairs reach Lc 60 or more.
          </p>

          <p>
            This matches the best-known criticism of the WCAG 2 formula, and seeing it laid out
            across a real palette made it concrete in a way reading about it never did. The ratio is
            simple and stable, which is exactly why it&apos;s a good conformance rule, but it&apos;s
            generous at the dark end and strict with pale text on mid tones.
          </p>

          <h2>Why APCA is labelled experimental</h2>

          <p>
            WCAG 2.2 AA is the standard NSW Government services are measured against, so it decides
            everything the checker recommends: which colours appear in the body-text row, which
            appear under large text only, and the verdict at the top of the page. APCA is shown
            beside it, never instead of it. Its own documentation describes it as the candidate
            contrast method for WCAG 3, which is a long way from being a standard anyone has to
            meet, and the checker&apos;s copy says so in plain words.
          </p>

          <p>
            That has a visible consequence. On most of the pairings the checker recommends for body
            text, the APCA panel says the 16px row fails. That&apos;s deliberate. A tool that hid
            the second reading whenever it was inconvenient wouldn&apos;t be worth showing at all.
          </p>

          <p>
            The practical recommendation is simple. Design to WCAG, because that&apos;s what
            you&apos;re accountable for. Then use the APCA reading to catch pairs that technically
            pass but will read poorly, especially for body copy and especially mid tones on dark
            backgrounds. Don&apos;t use a good APCA score to argue your way past a WCAG fail.
          </p>

          <h2>The checker passes its own test</h2>

          <p>
            A contrast checker that renders its own labels below 4.5:1 is a bad joke, and it&apos;s
            an easy one to tell. The page repaints itself in whatever pairing you choose, so every
            softened caption and secondary label is drawn on colours nobody picked in advance.
          </p>

          <p>
            The trap is <code>opacity</code>. A text colour that clears 4.5:1 clears it by some
            margin, and dimming it spends that margin. White on NSW Fuchsia 02 is 4.51:1. The same
            white at 0.8 opacity composites to 3.27:1. Before this was fixed, the intro text mixed
            its ink 80% toward the background on every pairing, which put it below AA on 60 of 208
            sampled pairings.
          </p>

          <p>
            <code>dimFor</code> turns the question around. Ask for the dim you want, and it returns
            the strongest dim the pair can afford, stepping back toward full strength 5% at a time.
            On white over NSW Fuchsia 02 the answer is no dim at all. The tool publishes the result
            as a CSS custom property and the labels use that, so every de-emphasis is bought out of
            the pair&apos;s actual headroom.
          </p>

          <p>
            Review caught a subtler version of the same mistake. <code>dimFor</code> originally
            scored the blend rounded to a hex colour, but browsers composite opacity in floating
            point, and an audit tool scores the computed colour. Rounding approved dims that
            computed as low as 4.47:1. It now measures the unrounded blend, and a test checks it
            against every palette pairing that clears AA, all 85,764 of them.
          </p>

          <h2>Colour carries more than luminance</h2>

          <p>
            Some colour rules can&apos;t be reduced to a ratio, and the checker is better for not
            pretending otherwise.
          </p>

          <p>
            The logo colourway is one. The obvious approach is to measure the background against the
            logo&apos;s colours and pick a colourway that clears a threshold. That approach got grey
            wrong. NSW Grey 02 clears 8.2:1 against white, so a measured rule handed it the reversed
            logo, but the red waratah sits at about 1.6:1 on that grey and disappears. The brand
            guidelines key the reversed logo to the darkest row of each colour family, so where the
            checker knows a colour&apos;s position on its ramp, that position decides. Only a typed
            colour with no ramp position falls back to measurement.
          </p>

          <p>
            The Aboriginal palette is another. It&apos;s governed material with its own cultural
            protocols, so the protocol note sits beside the controls whenever those colours are on
            screen, not tucked away in the details where it&apos;s easy to miss.
          </p>

          <h2>No answer for a colour nobody entered</h2>

          <p>
            Check mode once had a quiet failure. Type something it couldn&apos;t parse and it fell
            back to a stand-in, black or white, then scored the stand-in. Four green passes, for a
            colour nobody typed. Now there is no result until both colours resolve, the copy buttons
            stay hidden, and the field tells you whether to add a colour or fix one.
          </p>

          <p>
            The same care applies to what leaves the browser. Check mode writes what you type into
            the URL so pairings can be shared, and analytics tools capture the full URL. Those two
            parameters are redacted before anything is sent, so the link still works and the typed
            colours stay out of analytics.
          </p>

          <h2>The lesson</h2>

          <p>
            A contrast checker is a measuring instrument, and an instrument people rely on has to be
            right in the boring places: the rounding, the clamping, the error path, its own
            captions. Those are the bits a user never checks, which is exactly why they need tests.
          </p>

          <p>
            Beyond that, the useful thing a tool like this can do is show where its models disagree
            instead of hiding it. WCAG gives a clear, defensible answer, and it stays in charge.
            APCA explains why some of those passing pairs still look wrong. Put both on the page,
            label which one is the standard, and teams can make better colour decisions than either
            number would give them on its own.
          </p>

          <p>
            If you work on a NSW Government service, try your palette at{' '}
            <a href='https://contrast.design.nsw.gov.au'>contrast.design.nsw.gov.au</a>. The URL
            always matches what&apos;s on screen, so the pairing you settle on is one link away from
            the rest of your team.
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
