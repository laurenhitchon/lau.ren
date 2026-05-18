import type { Metadata } from 'next'

export const siteName = 'Lauren Hitchon'
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lau.ren'

export type PageSeo = {
  path: string
  title: Metadata['title']
  socialTitle: string
  description: string
  eyebrow: string
  imageTitle: string
  imageSubtitle: string
  imageAlt: string
}

export const pages = {
  home: {
    path: '/',
    title: {
      absolute: 'Lauren Hitchon - Technology Manager and Full Stack Developer',
    },
    socialTitle: 'Lauren Hitchon - Technology Manager and Full Stack Developer',
    description:
      'Portfolio of Lauren Hitchon, a technology manager, full stack developer and design systems practitioner building accessible public-sector digital products.',
    eyebrow: 'Portfolio',
    imageTitle: 'Lauren Hitchon',
    imageSubtitle: 'Technology leadership, full stack development and design systems.',
    imageAlt:
      'Lauren Hitchon portfolio preview for technology leadership, full stack development and design systems.',
  },
  resume: {
    path: '/resume',
    title: 'Resume - Technology Leadership, Full Stack Development and Design Systems',
    socialTitle:
      'Lauren Hitchon Resume - Technology Leadership, Full Stack Development and Design Systems',
    description:
      'Career history, selected work and capabilities across technology leadership, full stack development, design systems, accessibility and web delivery.',
    eyebrow: 'Resume',
    imageTitle: 'Resume',
    imageSubtitle:
      'Selected work, capabilities and career history across accessible digital products.',
    imageAlt: 'Lauren Hitchon resume preview with selected work, capabilities and career history.',
  },
  writing: {
    path: '/writing',
    title: 'Writing on Design Systems and Front-End Practice',
    socialTitle: 'Lauren Hitchon Writing - Design Systems and Front-End Practice',
    description:
      'Notes by Lauren Hitchon on design systems, accessibility, front-end development and the decisions that make digital products easier to build.',
    eyebrow: 'Writing',
    imageTitle: 'Writing',
    imageSubtitle: 'Notes on design systems, accessibility and maintainable front-end practice.',
    imageAlt:
      'Lauren Hitchon writing preview for notes on design systems, accessibility and front-end practice.',
  },
  contact: {
    path: '/contact',
    title: {
      absolute: 'Contact Lauren Hitchon',
    },
    socialTitle: 'Contact Lauren Hitchon',
    description:
      'Contact Lauren Hitchon about technology leadership, full stack development, design systems and accessible web delivery work.',
    eyebrow: 'Contact',
    imageTitle: 'Contact',
    imageSubtitle: 'For technology leadership, full stack development and design systems work.',
    imageAlt:
      'Lauren Hitchon contact preview for technology leadership, full stack development and design systems work.',
  },
} as const satisfies Record<string, PageSeo>

export function createPageMetadata(page: PageSeo): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title: page.socialTitle,
      description: page.description,
      url: page.path,
      siteName,
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.socialTitle,
      description: page.description,
    },
  }
}
