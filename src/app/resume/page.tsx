import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const selectedWork = [
  {
    title: 'Digital NSW HTML email system',
    href: 'https://email.digital.nsw.gov.au',
    description:
      'An accessible, reusable email framework for NSW Government, built end-to-end across templates, components, documentation and the supporting site.',
  },
  {
    title: 'NSW Design System',
    href: 'https://designsystem.nsw.gov.au',
    description:
      'Front-end utility framework, Sass theming model, design tokens, documentation and reusable interactive components including Popover, Tooltip, Toggletip, Back to top and Card carousel.',
  },
  {
    title: 'Digital NSW',
    href: 'https://digital.nsw.gov.au',
    description:
      'Production web delivery across content, platform maintenance, Drupal, design quality, accessibility and stakeholder support.',
  },
  {
    title: 'AlburyCity',
    href: 'https://www.alburycity.nsw.gov.au',
    description:
      'A responsive, mobile-first council website redesign that increased mobile traffic and modernised the service experience.',
  },
  {
    title: 'FlyAlbury',
    href: 'https://www.flyalbury.com.au',
    description:
      'Regional airport website delivery and maintenance supporting passenger information, destination content and local government service updates.',
  },
  {
    title: 'Albury Entertainment Centre',
    href: 'https://www.alburyentertainmentcentre.com.au',
    description:
      'Venue website delivery and maintenance for event information, performance listings and regional arts audience engagement.',
  },
]

const experience = [
  {
    period: 'Current',
    role: 'Acting Technology Manager',
    organisation: 'Department of Customer Service, Digital NSW',
    summary:
      'Product ownership, people leadership, strategy, vendor evaluation, roadmap planning and hands-on full stack delivery across digital products and platforms.',
  },
  {
    period: '2024 - current',
    role: 'Senior Application Administrator',
    organisation: 'Department of Customer Service, Digital NSW',
    summary:
      'Application administration, workflow optimisation, stakeholder support and internal tools built with Next.js, React, TypeScript, Node.js, authentication, APIs and database integrations.',
  },
  {
    period: '2023 - 2024',
    role: 'Senior Front End Developer',
    organisation: 'Department of Customer Service, Digital NSW',
    summary:
      "Delivered a major expansion of the NSW Design System's front-end capability across utility classes, Sass theming and reusable interactive components.",
  },
  {
    period: '2022 - 2023',
    role: 'Developer',
    organisation: 'Department of Customer Service, Digital NSW',
    summary:
      'Maintained government websites and digital channels, shipped email templates and contributed the foundations of the Digital NSW email system.',
  },
  {
    period: '2016 - 2022',
    role: 'Digital Designer',
    organisation: 'AlburyCity',
    summary:
      'Designed and shipped websites, applications, landing pages, UI systems and HTML email campaigns from concept through production.',
  },
  {
    period: '2011 - 2015',
    role: 'Marketing Web Officer',
    organisation: 'Charles Sturt University',
    summary:
      'Maintained the university marketing web environment in Squiz Matrix, created HTML email campaigns and supported web policy, analytics and UI standards.',
  },
  {
    period: '2010 - 2011',
    role: 'Marketing and Communications Officer',
    organisation: 'Murray Arts',
    summary:
      'Managed newsletters, website updates, annual report production and weekly radio segments supporting regional arts marketing and community programs.',
  },
  {
    period: '2007 - 2009',
    role: 'Administrative Assistant',
    organisation: 'The Tasmanian Polytechnic',
    summary:
      'Provided administrative, financial, student-facing and team coordination support across the Clothing, Textiles and Design department.',
  },
  {
    period: '2006',
    role: 'Venue Hire Coordinator / Museum Assistant',
    organisation: 'Canberra Museum and Gallery',
    summary:
      'Coordinated events, service providers, gallery operations, reporting and environmental monitoring for museum displays and exhibitions.',
  },
]

const capabilities = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'Tailwind CSS',
  'Drupal',
  'Squiz Matrix',
  'Design systems',
  'WCAG 2.2',
  'Figma',
  'Illustrator',
  'Azure',
  'Power Platform',
  'PostgreSQL (Neon)',
  'libSQL (Turso)',
  'MongoDB',
  'Vercel',
  'REST APIs',
  'GraphQL',
  'Authentication',
  'GitHub Actions',
  'WordPress',
  'WAI-ARIA',
  'SEO',
  'Performance',
  'Photoshop',
  'InDesign',
]

const education = [
  'Diploma of Information Technology (Multimedia), TAFE NSW',
  'Certificate III in Printing and Graphic Arts, Tasmanian Polytechnic',
  'Bachelor of Arts (Visual Arts), Australian National University',
  'Certificate I in Clothing Production, Canberra Institute of Technology',
]

const certifications = [
  'Digital Leadership, UNSW',
  'Advanced Analytics, UNSW',
  'Web Development (Back-End), TAFE NSW',
  'Microsoft Certified: Azure AI Fundamentals',
  'Microsoft Certified: Azure Fundamentals',
  'Responsive Web Design, freeCodeCamp',
  'Front End Development Libraries, freeCodeCamp',
  'JavaScript Algorithms and Data Structures, freeCodeCamp',
]

const softSkills = [
  'Leadership',
  'People management',
  'Product ownership',
  'Stakeholder engagement',
  'Client interaction',
  'Project management',
  'Time management',
  'Communication',
  'Collaboration',
  'Problem-solving',
  'Adaptability',
  'Attention to detail',
  'Accountability',
]

function ExternalLink({
  href,
  children,
}: Readonly<{
  href: string
  children: React.ReactNode
}>) {
  return (
    <a href={href} target='_blank' rel='noreferrer'>
      {children}
    </a>
  )
}

export default function ResumePage() {
  return (
    <main className='site-shell'>
      <SiteHeader />

      <div className='vertical-name' aria-hidden='true'>
        Lauren Hitchon
      </div>

      <section className='hero' aria-labelledby='intro-title'>
        <div className='hero-copy'>
          <p className='availability'>Available for thoughtful digital product work</p>
          <h1 id='intro-title'>
            Lauren Hitchon is a technology manager, full stack developer and design systems
            practitioner.
          </h1>
          <p className='lede'>
            I build rich, accessible web products end-to-end: Next.js applications, authentication,
            REST and GraphQL APIs, database integrations, HTML email systems, CMS platforms and
            production design systems.
          </p>
        </div>
        <aside className='hero-note' aria-label='Current focus'>
          <span>Now</span>
          <p>
            Acting Technology Manager at Digital NSW, leading product strategy, delivery and people
            management while staying close to the code.
          </p>
        </aside>
      </section>

      <section className='statement' aria-label='Professional statement'>
        <p>
          I came to technology through digital design, so I care about the full surface of a
          product: how it is planned, written, designed, built, maintained and experienced.
          Accessibility is a baseline, not an add-on.
        </p>
      </section>

      <section className='section-grid' id='work' aria-labelledby='work-title'>
        <div className='section-heading'>
          <p>Selected work</p>
          <h2 id='work-title'>Built and maintained</h2>
        </div>
        <div className='link-list'>
          {selectedWork.map((item) => (
            <article className='work-item' key={item.title}>
              <h3>
                <ExternalLink href={item.href}>{item.title}</ExternalLink>
              </h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='section-grid' aria-labelledby='practice-title'>
        <div className='section-heading'>
          <p>Practice</p>
          <h2 id='practice-title'>Where I work best</h2>
        </div>
        <div className='practice-copy'>
          <p>
            I work comfortably between product strategy and implementation: shaping roadmaps,
            clarifying stakeholder needs, mentoring technical staff, managing delivery and building
            the product details myself when that is the shortest path to quality.
          </p>
          <p>
            My long-running CMS background covers Squiz Matrix and Drupal, with WordPress in the
            mix, and more than a decade of production work across government, education, arts and
            local government digital services.
          </p>
        </div>
      </section>

      <section className='section-grid' id='experience' aria-labelledby='experience-title'>
        <div className='section-heading'>
          <p>Experience</p>
          <h2 id='experience-title'>Career history</h2>
        </div>
        <ol className='timeline'>
          {experience.map((item) => (
            <li key={`${item.role}-${item.period}`}>
              <time>{item.period}</time>
              <div>
                <h3>{item.role}</h3>
                <p className='organisation'>{item.organisation}</p>
                <p>{item.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className='section-grid' aria-labelledby='tools-title'>
        <div className='section-heading'>
          <p>Tools</p>
          <h2 id='tools-title'>Capabilities</h2>
        </div>
        <ul className='capability-list' aria-label='Technical capabilities'>
          {capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>

      <section className='section-grid' aria-labelledby='soft-skills-title'>
        <div className='section-heading'>
          <p>Soft skills</p>
          <h2 id='soft-skills-title'>How I work</h2>
        </div>
        <ul className='capability-list' aria-label='Soft skills'>
          {softSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className='section-grid' aria-labelledby='education-title'>
        <div className='section-heading'>
          <p>Education</p>
          <h2 id='education-title'>Formal study</h2>
        </div>
        <ul className='education-list'>
          {education.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className='section-grid' aria-labelledby='certifications-title'>
        <div className='section-heading'>
          <p>Credentials</p>
          <h2 id='certifications-title'>Certifications</h2>
        </div>
        <ul className='education-list'>
          {certifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </main>
  )
}
