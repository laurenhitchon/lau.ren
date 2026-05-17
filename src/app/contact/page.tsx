import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { ContactForm } from './ContactForm'

const contactLinks = [
  {
    label: 'Email',
    value: 'lauren@hitchon.me',
    href: 'mailto:lauren@hitchon.me',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/laurenhitchon',
    href: 'https://www.linkedin.com/in/laurenhitchon',
  },
  {
    label: 'GitHub',
    value: 'github.com/laurenhitchon',
    href: 'http://github.com/laurenhitchon',
  },
]

export default function ContactPage() {
  return (
    <main className='site-shell'>
      <SiteHeader />

      <div className='vertical-name' aria-hidden='true'>
        Contact
      </div>

      <section className='page-intro' aria-labelledby='contact-title'>
        <p className='availability'>Contact</p>
        <h1 id='contact-title'>For thoughtful digital product work.</h1>
        <p className='lede'>
          I am based in Albury, NSW, and work across technology leadership, full stack development,
          design systems and accessible web delivery.
        </p>
      </section>

      <section className='section-grid' aria-labelledby='contact-links-title'>
        <div className='section-heading'>
          <p>Details</p>
          <h2 id='contact-links-title'>Get in touch</h2>
        </div>
        <div className='link-list'>
          {contactLinks.map((item) => (
            <article className='work-item' key={item.href}>
              <h3>{item.label}</h3>
              <p>
                <a href={item.href}>{item.value}</a>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className='section-grid' aria-labelledby='contact-form-title'>
        <div className='section-heading'>
          <p>Message</p>
          <h2 id='contact-form-title'>Contact form</h2>
        </div>
        <ContactForm />
      </section>

      <SiteFooter showWebsite={false} />
    </main>
  )
}
