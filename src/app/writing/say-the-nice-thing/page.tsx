import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '../../components/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'

export const metadata: Metadata = {
  title: 'Say the nice thing',
  description:
    'Software development has plenty of feedback and surprisingly little praise. On noticing good work and actually telling the person who did it.',
  alternates: {
    canonical: '/writing/say-the-nice-thing',
  },
}

export default function SayTheNiceThingPost() {
  return (
    <main className='site-shell'>
      <SiteHeader />

      <div className='vertical-name' aria-hidden='true'>
        Writing
      </div>

      <article className='article' aria-labelledby='post-title'>
        <header className='article-header'>
          <p className='availability'>Working together</p>
          <time className='post-date' dateTime='2026-09'>
            September 2026
          </time>
          <h1 id='post-title'>Say the nice thing</h1>
          <p className='lede'>
            There’s a strange thing that happens when you work with good developers.
          </p>
        </header>

        <div className='article-body'>
          <p>You notice things.</p>

          <p>
            You notice that someone took a slightly more difficult path because it left the codebase
            cleaner for whoever came along next. You notice the person who renamed the confusing
            variable while they were fixing something completely unrelated. The developer who added
            the test for the weird edge case nobody had thought about yet. The person who stopped
            halfway through implementing something and said, “Hang on, I think there’s a simpler way
            to do this.”
          </p>

          <p>
            You notice the PR that is unusually easy to review because someone bothered to explain{' '}
            <em>why</em>, not just what they changed.
          </p>

          <p>You notice when somebody cares.</p>

          <p>And then, weirdly, you often say absolutely nothing.</p>

          <p>
            I’ve been thinking about this lately because software development has an enormous amount
            of feedback built into it, but surprisingly little of it is praise.
          </p>

          <p>Our tools are basically designed to tell us what’s wrong.</p>

          <p>
            The build failed. The test failed. The dependency is vulnerable. The linter is unhappy.
            The accessibility check found something. The code review has seven comments. Production
            is throwing errors. Copilot thinks you&#x27;ve introduced a security problem. Someone
            has found an edge case.
          </p>

          <p>Red everywhere.</p>

          <p>When everything works?</p>

          <p>Green tick.</p>

          <p>Move on.</p>

          <p>Humans aren&#x27;t much better.</p>

          <p>
            Code review naturally draws our attention to the things we think should change. We leave
            comments on the questionable implementation and scroll straight past the thoughtful one.
            We point out the missing error handling but say nothing about the really nice
            abstraction three lines above it.
          </p>

          <p>That makes sense. The job is partly to find problems.</p>

          <p>But it creates a fairly distorted picture of what people are contributing.</p>

          <p>
            I know there have been plenty of times when I’ve looked through somebody’s code and
            thought, <em>that’s clever</em>. Or{' '}
            <em>that&#x27;s much cleaner than what was here before</em>. Or{' '}
            <em>I wouldn&#x27;t have thought to do it that way.</em>
          </p>

          <p>And then I&#x27;ve kept scrolling.</p>

          <p>Which is ridiculous when you think about it.</p>

          <p>Because typing:</p>

          <p>“Nice solution.”</p>

          <p>takes approximately four seconds.</p>

          <p>Saying:</p>

          <p>“I really like how you&#x27;ve done this. It&#x27;s much easier to understand.”</p>

          <p>might take eight.</p>

          <p>And yet the person on the other side of that PR might remember it for years.</p>

          <p>Especially the people who are still finding their feet.</p>

          <p>
            Software has a peculiar way of making perfectly competent people feel incompetent. There
            is always another framework you don&#x27;t know, another person who understands the
            infrastructure better than you do, another acronym everyone else apparently learned
            while you were out getting coffee.
          </p>

          <p>
            Even very experienced developers can spend an afternoon staring at something thinking,{' '}
            <em>I have absolutely no idea what I&#x27;m doing.</em>
          </p>

          <p>Then someone whose opinion they respect says, “This is really good work.”</p>

          <p>And suddenly the internal calibration shifts a little.</p>

          <p>
            <em>Oh.</em>
          </p>

          <p>
            <em>Maybe I do know what I&#x27;m doing.</em>
          </p>

          <p>
            I&#x27;ve realised, too, that compliments don&#x27;t have to come from the most
            experienced person in the room to matter.
          </p>

          <p>
            You don&#x27;t need to be the world&#x27;s authority on React to recognise beautifully
            structured React code. You don&#x27;t need twenty years of security experience to
            appreciate that somebody has carefully thought through permissions. You don&#x27;t need
            to be someone&#x27;s manager to notice that they patiently helped another developer
            understand something without making them feel stupid.
          </p>

          <p>
            In fact, some of the nicest things worth acknowledging aren&#x27;t particularly
            technical.
          </p>

          <p>“I noticed how much time you spent helping them with that.”</p>

          <p>“You explained that really well.”</p>

          <p>“Thanks for challenging that assumption.”</p>

          <p>“That PR description made this incredibly easy to review.”</p>

          <p>“You always leave things a little better than you found them.”</p>

          <p>“I trust your judgement on this.”</p>

          <p>That last one can mean a lot.</p>

          <p>
            There are people I&#x27;ve worked with whose habits have quietly changed the way I work.
          </p>

          <p>People who made me more careful.</p>

          <p>People who made me question assumptions instead of blindly accepting them.</p>

          <p>People who showed me that accessibility isn&#x27;t something you check at the end.</p>

          <p>People who taught me that boring code can be excellent code.</p>

          <p>People whose documentation saved me hours.</p>

          <p>People whose patience made it safe to ask a stupid question.</p>

          <p>People whose standards made mine higher simply because I worked alongside them.</p>

          <p>I&#x27;m not sure I&#x27;ve told all of them.</p>

          <p>That&#x27;s the bit that bothers me.</p>

          <p>
            We tend to assume people know when they&#x27;re good at something. Or that they know we
            respect them. Or that somebody else has probably told them.
          </p>

          <p>Maybe they do.</p>

          <p>Maybe nobody has.</p>

          <p>And there’s another reason I think this matters in software.</p>

          <p>The things we praise become part of the culture.</p>

          <p>If the only thing we celebrate is shipping quickly, people learn to ship quickly.</p>

          <p>
            But if we notice the person who removed unnecessary complexity, we&#x27;re saying
            simplicity matters.
          </p>

          <p>
            If we praise someone for raising an uncomfortable concern before release, we&#x27;re
            saying speaking up matters.
          </p>

          <p>
            If we thank the developer who wrote excellent documentation, we&#x27;re saying the work
            after the code matters.
          </p>

          <p>
            If we recognise someone for helping a junior developer instead of finishing their own
            ticket ten minutes earlier, we&#x27;re saying people matter.
          </p>

          <p>Tiny comments quietly describe the kind of team we want to be.</p>

          <p>So I&#x27;ve been trying to get better at not letting the nice thought disappear.</p>

          <p>
            When I&#x27;m reviewing a PR and something makes me think <em>that&#x27;s good</em>, I
            try to actually write it.
          </p>

          <p>When somebody handles a difficult problem thoughtfully, tell them.</p>

          <p>When someone teaches you something, tell them.</p>

          <p>
            When you steal one of their techniques six months later because it was genuinely better
            than yours, definitely tell them.
          </p>

          <p>
            It doesn&#x27;t need to become a ceremony. Nobody needs a Teams meeting called{' '}
            <em>Developer Appreciation Alignment Session</em>. Please, God, no.
          </p>

          <p>Just say the nice thing when you notice it.</p>

          <p>
            Because we&#x27;re already very good at telling each other when something could be
            better.
          </p>

          <p>
            We should probably get equally good at telling each other when something already is.
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
