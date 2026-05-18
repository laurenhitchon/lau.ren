import type { Metadata } from 'next'
import './globals.css'
import { createPageMetadata, pages, siteName, siteUrl } from './seo'

const adobeFontsKitId = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT_ID

export const metadata: Metadata = {
  ...createPageMetadata(pages.home),
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  title: {
    default: pages.home.socialTitle,
    template: `%s | ${siteName}`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' data-scroll-behavior='smooth'>
      <head>
        {adobeFontsKitId ? (
          <link rel='stylesheet' href={`https://use.typekit.net/${adobeFontsKitId}.css`} />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  )
}
