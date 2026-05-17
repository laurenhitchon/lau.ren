import type { Metadata } from 'next'
import './globals.css'

const adobeFontsKitId = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT_ID

export const metadata: Metadata = {
  title: 'Lauren Hitchon',
  description: 'Technology manager, full stack developer and design systems practitioner.',
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
