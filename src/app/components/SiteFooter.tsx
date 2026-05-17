export function SiteFooter({
  showWebsite = true,
}: Readonly<{
  showWebsite?: boolean
}>) {
  return (
    <footer className='footer'>
      <div>
        <p className='footer-name'>Lauren Hitchon</p>
      </div>
      <div className='contact-links' aria-label='Contact links'>
        <a href='mailto:lauren@hitchon.me'>lauren@hitchon.me</a>
        {showWebsite ? (
          <a href='https://lau.ren' target='_blank' rel='noreferrer'>
            lau.ren
          </a>
        ) : null}
      </div>
    </footer>
  )
}
