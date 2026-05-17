import Link from 'next/link'

import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const topics = [
  'Design systems',
  'Accessibility',
  'Front-end development',
  'Digital product delivery',
  'HTML email',
  'Public sector technology',
]

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
          A place for writing about the overlap between design, engineering, accessibility and
          sustainable digital product work.
        </p>
      </section>

      <section className='section-grid' aria-labelledby='topics-title'>
        <div className='section-heading'>
          <p>Topics</p>
          <h2 id='topics-title'>Likely themes</h2>
        </div>
        <ul className='capability-list' aria-label='Writing topics'>
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>

      <section className='section-grid' aria-labelledby='posts-title'>
        <div className='section-heading'>
          <p>Posts</p>
          <h2 id='posts-title'>Latest</h2>
        </div>
        <div className='link-list'>
          <article className='work-item'>
            <h3>
              <Link href='/writing/colour-pairing-tool'>
                Designing colour decisions into the workflow
              </Link>
            </h3>
            <p>
              A note on the NSW colour pairing tool and why accessibility checks work best when they
              are part of design practice, not a final audit.
            </p>
          </article>
          <article className='work-item'>
            <h3>
              <Link href='/writing/nsw-email-toolkit'>What the NSW Email Toolkit gets right</Link>
            </h3>
            <p>
              A short reflection on making government email more consistent, accessible and
              maintainable across teams.
            </p>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
