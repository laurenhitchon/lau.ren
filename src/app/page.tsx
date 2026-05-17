import Link from 'next/link'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'

const homeLinks = [
  {
    href: '/resume',
    title: 'Resume',
    description: 'Career history, selected work, capabilities, education and credentials.',
  },
  {
    href: '/writing',
    title: 'Writing',
    description:
      'Notes on design systems, accessibility, front-end development and digital product work.',
  },
  {
    href: '/contact',
    title: 'Contact',
    description: 'Get in touch about product, engineering, design systems or web delivery work.',
  },
]

export default function Home() {
  return (
    <main className='site-shell'>
      <SiteHeader />

      <div className='vertical-name' aria-hidden='true'>
        Lauren Hitchon
      </div>

      <section className='home-hero' aria-labelledby='home-title'>
        <p className='availability'>Lauren Hitchon</p>
        <h1 id='home-title'>Technology leadership, full stack development and design systems.</h1>
        <p className='lede'>
          I work across product strategy, accessible interface design and hands-on engineering for
          public sector digital services.
        </p>
      </section>

      <section className='section-grid home-links' aria-label='Site sections'>
        <div className='section-heading'>
          <p>Start here</p>
          <h2>Explore</h2>
        </div>
        <div className='link-list'>
          {homeLinks.map((item) => (
            <article className='work-item' key={item.href}>
              <h3>
                <Link href={item.href}>{item.title}</Link>
              </h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
