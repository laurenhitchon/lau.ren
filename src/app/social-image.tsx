import { ImageResponse } from 'next/og'

import { siteName, siteUrl, type PageSeo } from './seo'

export const socialImageSize = {
  width: 1200,
  height: 630,
}

export const socialImageContentType = 'image/png'

export function createSocialImage(page: PageSeo) {
  const host = new URL(siteUrl).host

  return new ImageResponse(
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#f8f8f5',
        color: '#171716',
        padding: '70px 76px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          backgroundImage: 'linear-gradient(90deg, rgba(23, 23, 22, 0.06) 1px, transparent 1px)',
          backgroundSize: '160px 100%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 72,
          bottom: 58,
          display: 'flex',
          color: 'rgba(111, 44, 36, 0.16)',
          fontFamily: 'Georgia, serif',
          fontSize: 210,
          lineHeight: 1,
        }}
      >
        LH
      </div>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          color: '#6f6d67',
          fontFamily: 'Arial, sans-serif',
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 4,
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        <span>{page.eyebrow}</span>
        <span>{host}</span>
      </div>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: 900,
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#171716',
            fontFamily: 'Georgia, serif',
            fontSize: 90,
            lineHeight: 0.95,
          }}
        >
          {page.imageTitle}
        </div>
        <div
          style={{
            display: 'flex',
            maxWidth: 790,
            marginTop: 30,
            color: '#4e4c47',
            fontFamily: 'Arial, sans-serif',
            fontSize: 34,
            lineHeight: 1.28,
          }}
        >
          {page.imageSubtitle}
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          color: '#6f2c24',
          fontFamily: 'Arial, sans-serif',
          fontSize: 25,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        <span
          style={{
            display: 'flex',
            width: 84,
            height: 3,
            background: '#6f2c24',
          }}
        />
        <span>{siteName}</span>
      </div>
    </div>,
    socialImageSize,
  )
}
