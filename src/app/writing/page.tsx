import Link from 'next/link'

import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export default function WritingPage() {
  return (
    <main className='site-shell'>
      <SiteHeader />

      <div className='vertical-name' aria-hidden='true'>
        Writing
      </div>

      <section className='page-intro' aria-labelledby='writing-title'>
        <p className='availability'>Writing</p>
        <h1 id='writing-title'>Notes, essays and field observations.</h1>
        <p className='lede'>
          Writing about design systems, accessibility, front-end practice and the small decisions
          that make digital products easier to build and maintain.
        </p>
      </section>

      <section className='section-grid' aria-labelledby='posts-title'>
        <div className='section-heading'>
          <p>Posts</p>
          <h2 id='posts-title'>Latest</h2>
        </div>
        <div className='link-list'>
          <article className='work-item'>
            <div>
              <time className='post-date' dateTime='2026-04'>
                April 2026
              </time>
              <h3>
                <Link href='/writing/nsw-email-toolkit'>What the NSW Email Toolkit gets right</Link>
              </h3>
            </div>
            <p>
              A short reflection on making government email more consistent, accessible and
              maintainable across teams.
            </p>
          </article>
          <article className='work-item'>
            <div>
              <time className='post-date' dateTime='2026-02'>
                February 2026
              </time>
              <h3>
                <Link href='/writing/colour-pairing-tool'>
                  A colour pairing tool that does the hard part first
                </Link>
              </h3>
            </div>
            <p>
              The NSWDS tool does more than calculate contrast. It ranks usable foregrounds, guards
              the preview and keeps the selected state shareable.
            </p>
          </article>
          <article className='work-item'>
            <div>
              <time className='post-date' dateTime='2025-12'>
                December 2025
              </time>
              <h3>
                <Link href='/writing/design-system-colour-tokens'>
                  Making colour tokens do the boring work
                </Link>
              </h3>
            </div>
            <p>
              How the NSWDS colour utilities keep palette data, generated scales, theme slices and
              exports from bleeding into component code.
            </p>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
