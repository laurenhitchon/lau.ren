import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '../../components/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'

export const metadata: Metadata = {
  title: 'Maintenance should be a system',
  description:
    'How shared configuration, reusable CI and Renovate keep a fleet of Next.js applications consistent without hiding risk.',
  alternates: {
    canonical: '/writing/maintenance-should-be-a-system',
  },
}

export default function MaintenanceShouldBeASystemPost() {
  return (
    <main className='site-shell'>
      <SiteHeader />

      <div className='vertical-name' aria-hidden='true'>
        Writing
      </div>

      <article className='article' aria-labelledby='post-title'>
        <header className='article-header'>
          <p className='availability'>Engineering systems</p>
          <time className='post-date' dateTime='2026-08'>
            August 2026
          </time>
          <h1 id='post-title'>Maintenance should be a system</h1>
          <p className='lede'>
            The hard part of running a fleet of Next.js applications is not setting up linting or CI
            once. It is making sure every app still agrees six months later.
          </p>
        </header>

        <div className='article-body'>
          <p>
            Over the past few months, I have been turning the maintenance of the NSW Design System
            application fleet into a system of its own. The work now lives across{' '}
            <a href='https://github.com/digitalnsw/nswds-devops'>nswds-devops</a>,{' '}
            <a href='https://github.com/digitalnsw/nswds-eslint-config'>nswds-eslint-config</a>,{' '}
            <a href='https://github.com/digitalnsw/nswds-prettier-config'>nswds-prettier-config</a>{' '}
            and a shared Renovate policy.
          </p>

          <p>
            None of those pieces is especially interesting in isolation. The useful part is how they
            fit together. Shared policy has one owner. Changes move through predictable channels.
            Low-risk work can merge itself, while risky changes remain visible and deliberate.
          </p>

          <h2>The problem was drift</h2>

          <p>
            The fleet includes 24 consumer repositories: mostly Next.js applications, plus package,
            email and infrastructure projects with their own constraints. The same commit scripts,
            branch rules, release configuration and CI workflows had been copied into each one.
            Unsurprisingly, those copies had drifted into three or four different versions.
          </p>

          <p>
            That kind of drift is easy to ignore because every repository can still look healthy on
            its own. The cost appears later. A fix has to be repeated across a dozen apps. A new
            check lands in some pipelines but not others. An upgrade works in the newest project and
            fails in the oldest one for reasons nobody has written down.
          </p>

          <p>
            The answer was not a longer setup checklist. Checklists describe policy. They do not
            keep applying it after the project has launched.
          </p>

          <h2>Use two paths for change</h2>

          <p>
            <code>nswds-devops</code> is now the source of truth for shared scripts, commit rules,
            release configuration and CI. It distributes those things in two different ways because
            they carry different levels of risk.
          </p>

          <p>
            Files such as shell scripts and root configuration move through file-sync pull requests.
            Each repository gets a visible diff and its usual required checks still decide whether
            that change can merge. The change is authored once, but it does not bypass the evidence
            each consumer repo provides.
          </p>

          <p>
            CI logic uses reusable GitHub Actions workflows. Consumer repositories contain small
            stubs pinned to a protected <code>v1</code> tag, while the actual jobs live in{' '}
            <code>nswds-devops</code>. Moving that tag updates the fleet at once, so promotion is
            treated like a deployment: the target must be on <code>main</code>, its checks must be
            green, and the promotion records the previous commit for rollback.
          </p>

          <p>
            That split is deliberate. Reviewable file changes travel by pull request. Shared CI
            behaviour can roll out or roll back in one operation. A breaking workflow change gets a
            new major tag and migrates through the stubs instead of quietly changing the meaning of
            <code>v1</code>.
          </p>

          <h2>Make the green tick useful</h2>

          <p>
            The shared merge gate checks more than whether <code>next build</code> happens to pass.
            It scans for conflict markers, verifies the committed lockfile with a clean install,
            builds the application, then runs the lint, test and formatting jobs the repository
            exposes. Missing capabilities can be opted out explicitly, but they should not disappear
            because one app forgot to copy a workflow step.
          </p>

          <p>
            The surrounding governance follows the same approach. Commit messages are checked
            against the release types. Branch names are validated against policy read from the pull
            request base, so a branch cannot weaken the rule that judges it. The two representations
            of allowed commit types are compared in CI so they cannot drift apart.
          </p>

          <p>
            A required check only matters if it tests the failure mode the team thinks it tests.
            Much of this work has been about closing the quiet gaps between “configured” and
            “actually enforced”.
          </p>

          <h2>Package the rules apps should extend</h2>

          <p>
            Whole-file sync is right for files that should be identical. ESLint and Prettier are
            different. Applications need a shared base, but they also need room for generated files,
            build artefacts and framework-specific paths. That is why those rules moved into npm
            packages instead of another set of copied config files.
          </p>

          <p>
            <code>@nswds/eslint-config</code> provides a Next.js flat-config entry point built on
            <code>core-web-vitals</code> and TypeScript, plus a framework-free base for token
            pipelines, infrastructure and Node scripts. Both enforce the same Prettier integration
            and console policy. Repositories spread the shared config, then append the small set of
            ignores or overrides that genuinely belong to them.
          </p>

          <p>
            The package also owns the compatibility work. When ESLint 10 removed an API still used
            by a React plugin inside <code>eslint-config-next</code>, the shim and its regression
            test went into one place. The test lints a real JSX file because loading a config
            successfully is not proof that a plugin can run.
          </p>

          <p>
            <code>@nswds/prettier-config</code> is smaller on purpose. It publishes the common
            formatting options as plain JSON. Simple repositories reference it directly; Tailwind
            applications extend it locally to add import sorting, class sorting and their own
            stylesheet path. Its tests ask Prettier whether every option is recognised, catching a
            particularly dull failure mode where a misspelled key is silently ignored.
          </p>

          <p>
            The migration reformatted zero files. The existing configs already agreed; the change
            removed duplication. That was a useful constraint. Centralisation should not create a
            giant cosmetic diff just to prove it happened.
          </p>

          <h2>Automate according to risk</h2>

          <p>
            Renovate connects the shared packages back to their consumers. Each repository gets a
            small synced <code>renovate.json</code>, while the actual policy lives in the
            <code>nswds-devops</code> preset. A policy change applies on Renovate&apos;s next run;
            changing the pointer itself still travels through the normal file-sync path.
          </p>

          <p>
            The policy is intentionally more specific than “keep everything up to date”. Non-major
            updates arrive on a weekly schedule. Minor updates to <code>0.x</code> packages are
            split into their own pull requests because SemVer does not promise they are safe.
            Development dependency patches can automerge after a three-day release age, as can the
            lint and formatting packages, because required checks measure their effect directly.
            Production dependencies and majors still need human review.
          </p>

          <p>
            Monthly lockfile maintenance can also merge itself after a clean install passes. Known
            incompatible majors are blocked with the failure and removal condition written into the
            rule. Security update ownership stays with Snyk, avoiding two bots opening different
            fixes for the same vulnerability.
          </p>

          <p>
            Renovate also rebases ordinary pull requests only when they conflict. With strict branch
            protection, the default behaviour could rebase every open dependency PR after every
            merge and rerun the entire CI suite across the fleet. Paying for repeated green checks
            that do not help the triggering merge is not governance. It is just churn.
          </p>

          <h2>Consistency does not mean pretending every repo is identical</h2>

          <p>
            Some repositories publish npm packages through OIDC. One has a Power Platform deployment
            workflow named <code>release.yml</code>. The UI monorepo has its own release and
            formatting structure. Those differences are encoded as sync groups and extension points
            rather than overwritten for the sake of a tidy diagram.
          </p>

          <p>
            This is the tradeoff in central tooling: every improvement has a wider reach, but so
            does every mistake. Protected workflow promotion, consumer pull requests, package tests,
            required checks and explicit exceptions keep that reach useful. The goal is consistent
            outcomes, not identical repositories.
          </p>

          <h2>The useful lesson</h2>

          <p>
            Well-maintained Next.js applications do not come from occasionally finding time for a
            dependency week. They come from making maintenance part of the delivery system: one
            place to change policy, a controlled way to distribute it, checks that exercise real
            failure modes, and automation that earns its authority by staying inside clear risk
            boundaries.
          </p>

          <p>
            The boring work still exists. It is now done once, reviewed at the right level, and
            allowed to propagate without relying on somebody remembering which repository missed the
            last upgrade. That is what makes the fleet easier to govern, and much less tiring to
            maintain.
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
