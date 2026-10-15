import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '../../components/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'

export const metadata: Metadata = {
  title: 'One pixel of page colour',
  description:
    'Debugging a 1px line under the footer logo in Windows Outlook, and what it taught about how Word measures a line box.',
  alternates: {
    canonical: '/writing/one-pixel-of-page-colour',
  },
}

export default function OnePixelOfPageColourPost() {
  return (
    <main className='site-shell'>
      <SiteHeader />

      <div className='vertical-name' aria-hidden='true'>
        Writing
      </div>

      <article className='article' aria-labelledby='post-title'>
        <header className='article-header'>
          <p className='availability'>HTML email</p>
          <time className='post-date' dateTime='2026-10'>
            October 2026
          </time>
          <h1 id='post-title'>One pixel of page colour</h1>
          <p className='lede'>
            Windows Outlook was drawing a thin line of background colour under the footer logo.
            Finding out why meant learning how Word measures a line, and the first fix caused the
            second bug.
          </p>
        </header>

        <div className='article-body'>
          <p>
            The NSW email component package is being rebuilt on react-email, and its rendered output
            is checked against the old framework in real Outlook clients. One of those checks kept
            showing the same thing: a 1px line of the page colour between the footer&apos;s dark
            rows, almost always under the linked logo at the bottom. Not in every email. Not at
            every DPI. Only in Word-based Outlook, 2016 and later.
          </p>

          <p>
            That kind of bug is easy to wave away. It is one pixel, it only shows on a dark fill,
            and the old framework drew it too. But a design system exists to make these decisions
            once, and a visible hairline on a government footer is exactly the sort of thing that
            makes an email look slightly wrong without anyone being able to say why. So it got
            chased.
          </p>

          <h2>A twip is not nothing</h2>

          <p>
            Windows Outlook renders HTML with the Word engine, and Word measures in twips: a
            twentieth of a point, 1440 to the inch, 15 to a pixel at 96 DPI. Each row holding an
            image was coming out about three twips taller than the image. Three twips is a fifth of
            a pixel, which is invisible on its own. Down an email with a dozen rows, Word eventually
            rounds the accumulated excess into one real pixel, and that pixel is painted in the
            page&apos;s background colour.
          </p>

          <p>
            Two things were producing the excess. The image&apos;s cell, its wrapper and its link
            all carried a unitless <code>line-height: 1</code>, which Word does not read as an exact
            height. And the table around a left-aligned image carried{' '}
            <code>align=&quot;left&quot;</code>, which Word treats as a float, and every float costs
            about a twip.
          </p>

          <p>
            The first fix set the line height to the image&apos;s height in pixels and dropped the{' '}
            <code>align</code> attribute from left-aligned tables, since a table sits at the left
            anyway. Measured on testi.at with sixteen stacked rows per variant, the image rows came
            out exact. But the footer line was still there in two of six test footers. The text and
            list tables were full width, so their <code>align</code> never placed anything, yet Word
            still floated them and still charged the twip. Removing every left-aligned float was
            what cleared the line from all six.
          </p>

          <h2>The fix that clipped every image</h2>

          <p>
            Two days later the same test matrix showed a different problem. Every image, the logo
            included, was drawn with its top cut off. A 640 by 56 banner lost 11px at 96 DPI, 14 at
            120 and 17 at 150. The 64 by 69 logo lost 14.
          </p>

          <p>
            The cause was the exact line height. Word places an inline image on the line&apos;s
            baseline, and in a line that is exactly the image&apos;s height, the baseline sits about
            four fifths of the way down. So the image was being drawn a fifth of its height too
            high, and the top fifth was clipped by the cell. The first fix had traded a pixel of
            page colour for a missing fifth of every image, which is not a good trade.
          </p>

          <p>
            What works is a line that is at least the image&apos;s height, with no text to add
            anything to it:
          </p>

          <pre>
            <code>{`<td style="line-height:56px;mso-line-height-rule:at-least;font-size:0;">
  <a href="…" style="line-height:56px;mso-line-height-rule:at-least;font-size:0;">
    <img width="640" height="56" style="display:block;font-size:14px;…">
  </a>
</td>`}</code>
          </pre>

          <p>
            <code>mso-line-height-rule: at-least</code> tells Word the line can grow but not shrink.
            A font size of zero on the cell, wrapper and link means there is no text metric to grow
            it by, so Word draws the line exactly as tall as the image and the image sits where it
            should. The image itself keeps a font size of its own, because when a client blocks
            images the alt text renders in its place and needs to be legible.
          </p>

          <p>
            There is a cost, and it is worth stating plainly. On a scaled display where the
            image&apos;s scaled height is not a whole pixel, such as a 69px logo at 150 DPI becoming
            103.5px, Word rounds an at-least line up to the next pixel. A stack of them can grow by
            up to a pixel a row at that scale. An exact line would hold them, but it cuts the top
            off every image at every scale. The package takes the possible pixel at 150 DPI and
            documents it on the prop.
          </p>

          <h2>Gaps drawn as text</h2>

          <p>
            The same pass found a second source of excess in rows of images. Social icons and icon
            clouds had been drawing the gap between images as an em space in an 8px font, which is
            the usual trick for spacing inline images in Outlook. That text has a descent. The
            descent made each row about 2px taller than its images, and Word 2016 and later rounded
            it into page-coloured lines down a column of rows.
          </p>

          <p>
            Word ignores <code>hspace</code> and image margins, so the gap cannot be put on the
            image. The Word copy of those rows is now one cell per image, with the gap as the
            cell&apos;s right padding, and it breaks the images into as many lines as fit the
            column&apos;s width. A row of icons wider than its column used to draw one icon per line
            in Outlook and widen the email; it now wraps the way the screen version does.
          </p>

          <p>
            Right-aligned tables float too. Eight stacked right-aligned images grew by a pixel at
            120 and 150 DPI for the same reason the left-aligned ones had. So a right-aligned image
            now sits in a full-width table, and the cell&apos;s <code>align</code> places it.
            Centred images keep <code>align=&quot;center&quot;</code> on the table, which Word does
            not float.
          </p>

          <h2>The line down the left</h2>

          <p>
            The third one looked unrelated and was the quickest to fix. A reversed row of columns,
            where the row carries <code>dir=&quot;rtl&quot;</code> so a phone stacks the columns in
            the other order, drew a 1px light line down the left of every column&apos;s content in
            Outlook 2013, 2021 and 2024. Invisible on white, plain on a dark fill. The old framework
            drew it as well.
          </p>

          <p>
            Each column in the Word copy is a ghost <code>&lt;td&gt;</code> inside a conditional
            comment, and those ghost cells were inheriting the row&apos;s right-to-left direction. A
            Word-only diagnostic ruled out the column&apos;s own inner cell: removing its{' '}
            <code>dir</code>, or moving it to the inner table, left the line in place. Only a
            left-to-right ghost cell removed it.
          </p>

          <pre>
            <code>{`<!--[if mso]><td dir="ltr" width="300" style="width:300px;"><![endif]-->`}</code>
          </pre>

          <p>
            The row keeps <code>dir=&quot;rtl&quot;</code>, which still sets the order of the cells.
            Review turned up a sharper version of the fix: write <code>dir=&quot;ltr&quot;</code> on
            every ghost cell, not only when <code>reverse === true</code>, because a reverse of the
            string <code>&quot;true&quot;</code> from untyped data reversed the row but skipped the
            fix. A forward row is left to right already, so the attribute changes nothing there. The
            test also pins that Word&apos;s own table and row carry no <code>dir</code>, because one
            there would put a reversed row back into source order.
          </p>

          <h2>How to see a fifth of a pixel</h2>

          <p>
            None of this could be found by looking at one email. A three-twip error does not show up
            in a single row. The method that worked was to stack the same row eight or sixteen times
            on a dark fill and render the stack across Outlook 2010 to 2024 at 96, 120 and 150 DPI.
            A sub-pixel error that is invisible once becomes a visible line after a dozen repeats,
            and the DPI matrix catches the rounding cases a 96 DPI check never would. The 150 DPI
            logo case only exists because 69 does not scale to a whole number.
          </p>

          <p>
            Each finding then went into a test. The visual specs assert the cell and row are exactly
            the image&apos;s height, that a fluid image shrinking on a phone takes its row with it
            instead of leaving a 317px line box behind, and that a ghost cell carries{' '}
            <code>dir=&quot;ltr&quot;</code>. The point of the test is not to re-run Outlook, which
            it cannot. It is to make the markup that Outlook was measured against the only markup
            the component can produce.
          </p>

          <h2>The lesson</h2>

          <p>
            Word is a word processor, and it lays out HTML the way it lays out a document: as lines
            of text with a baseline, a line height and a font, even when the only thing on the line
            is an image. Every Outlook fix for an image row is really a change to that line box, and
            each change moves the baseline, the descent or the rounding. The first fix here removed
            the excess and moved the baseline. The second removed the baseline problem and accepted
            a rounding one. Neither could have been reasoned out from the CSS spec, because the CSS
            spec is not what is doing the drawing.
          </p>

          <p>
            So measure, stack, and write down the cost of the choice you made. The old framework had
            both the footer line and the column line for years, and nobody could say where they came
            from. Now the package has the markup, the numbers, the clients it was checked in and the
            date, and the next person to touch an image row will know why the line height says{' '}
            <code>at-least</code> and the font size says zero.
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
