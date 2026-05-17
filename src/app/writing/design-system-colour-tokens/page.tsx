import Link from 'next/link'

import { SiteFooter } from '../../components/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'

export default function DesignSystemColourTokensPost() {
  return (
    <main className='site-shell'>
      <SiteHeader />

      <div className='vertical-name' aria-hidden='true'>
        Writing
      </div>

      <article className='article' aria-labelledby='post-title'>
        <header className='article-header'>
          <p className='availability'>Build notes</p>
          <time className='post-date' dateTime='2025-12'>
            December 2025
          </time>
          <h1 id='post-title'>Making colour tokens do the boring work</h1>
          <p className='lede'>
            The NSWDS colour utilities were built to stop palette data, theme logic and export
            formats from being scattered through component code.
          </p>
        </header>

        <div className='article-body'>
          <p>
            The NSWDS app now has colour utilities in <code>color-palette.ts</code> and{' '}
            <code>colors.ts</code>. They sit behind the palette pages, theme tools, colour pairing
            tool, pattern palettes and data exports. The useful lesson was not that tokens should
            exist. That is table stakes. The useful lesson was how much cleaner the system becomes
            when the palette source and the transformation logic are not tangled together.
          </p>

          <p>
            <code>color-palette.ts</code> is the source layer. It defines the base colour sets:
            brand, Aboriginal, semantic, sequential and diverging palettes. <code>colors.ts</code>{' '}
            is the engine layer. It converts, interpolates, names, formats and exports those colours
            into the shapes the rest of the app needs.
          </p>

          <h2>Keep the source boring</h2>

          <p>
            A good token source file should be easy to inspect. The base palettes in{' '}
            <code>color-palette.ts</code> are plain records of named colour arrays. That makes the
            authoring layer obvious: these are the colours the system starts from, grouped by the
            way people actually use them.
          </p>

          <p>
            The authored sets are not all the same kind of colour. Brand palettes, Aboriginal
            palettes, semantic colours and data visualisation ramps have different jobs. Keeping
            those groups explicit prevents the rest of the app from treating every colour as if it
            should behave the same way.
          </p>

          <p>
            The best practice here is simple: do not make the base palette clever. Make it stable,
            named and boring. Put the cleverness in functions that can be tested, reused and
            replaced.
          </p>

          <h2>Use one colour space for generation</h2>

          <p>
            The generation functions in <code>colors.ts</code> work in OKLCH.{' '}
            <code>oklchConverter</code> turns authored hex values into OKLCH, then{' '}
            <code>interpolateColors</code>, <code>GenerateInterpolatedColors</code> and{' '}
            <code>generateDataVisColors</code> build usable scales from those anchors.
          </p>

          <p>
            That decision matters. If a design system is going to generate shades, it needs a colour
            space that behaves closer to how people perceive colour. OKLCH gives the utilities a
            better basis for interpolation than bouncing between arbitrary hex values and hoping the
            middle tones feel right.
          </p>

          <p>
            The extra start and stop colours from <code>addStartStopToColorArray</code> are also a
            practical detail. Generated scales often need breathing room beyond the authored
            anchors, especially when the final output is sliced back into named token steps.
          </p>

          <h2>Name tokens for use</h2>

          <p>
            <code>createColorArray</code> turns generated colour data into token objects with{' '}
            <code>token</code>, <code>oklch</code>, <code>hex</code>, <code>rgb</code> and{' '}
            <code>hsl</code>. It also applies the NSW 01 to 04 names to the 800, 600, 400 and 200
            steps.
          </p>

          <p>
            That is a useful split between machine naming and human naming. Developers need stable
            tokens like <code>nsw-blue-600</code>. Designers and documentation need labels like NSW
            Blue 02. Both should come from the same data, or the system starts drifting.
          </p>

          <p>
            Numeric shade steps are not glamorous, but they are predictable. Predictable beats
            expressive when tokens need to work across CSS variables, Tailwind output, JSON exports,
            component props and documentation.
          </p>

          <h2>Generate themes from tokens</h2>

          <p>
            The <code>generateColorThemes</code> function creates the smaller theme sets from the
            full palette data. It uses <code>themeIndices</code> and <code>themeTokens</code> to
            pull out the 200, 400, 600 and 800 steps that theme tools and interface previews rely
            on.
          </p>

          <p>
            This is the right kind of constraint. A theme builder does not need every generated
            shade all the time. It needs the usable decision points: light surface, lighter support,
            strong brand colour and dark anchor. Smaller theme sets make UI tools easier to scan and
            harder to misuse.
          </p>

          <p>
            The lesson is to avoid making components know how to derive their own theme palettes.
            Components should consume already-shaped theme data. Generation belongs closer to the
            token layer.
          </p>

          <h2>Export for real workflows</h2>

          <p>
            Tokens become more useful when they can leave the app cleanly.{' '}
            <code>renderColorOutput</code> supports CSS, SCSS, Less, Tailwind, JSON, JavaScript and
            TypeScript output. <code>renderColorOutputToDTFM</code> handles a design-token JSON
            shape with structured colour values when the selected format is not hex.
          </p>

          <p>
            That sounds like plumbing, but it is product work. A design system has multiple
            consumers. Some people need CSS variables. Some need Tailwind-compatible custom
            properties. Some need JSON for token pipelines. Some just need a TypeScript object they
            can paste into a prototype.
          </p>

          <p>
            The best practice is not to make one export format sacred. Keep the internal data shape
            consistent, then render it into the formats teams actually use.
          </p>

          <h2>Small helpers matter</h2>

          <p>
            A few of the most useful functions are intentionally small. <code>getColorValue</code>{' '}
            gives components one way to read a colour in the selected format.{' '}
            <code>isLightColor</code> gives UI components a quick brightness check.{' '}
            <code>getSurroundingColors</code> helps pull a local range around a theme colour.
          </p>

          <p>
            These helpers keep display components from becoming token processors. That is the line
            worth protecting. Components can choose how to present colour, but they should not
            reinvent how colour data is generated, named or exported.
          </p>

          <h2>The useful pattern</h2>

          <p>
            The reusable pattern is: author the base palette once, convert it into a rich colour
            object, generate the scales, name the tokens, derive smaller theme sets, then export the
            same data into the formats teams need.
          </p>

          <p>
            That makes the system easier to extend. Adding a palette is mostly data. Improving the
            scale generation is mostly utility work. Changing an export format does not require
            rewriting the theme tools. That separation is what keeps design-system colour work from
            turning into a pile of one-off swatches.
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
