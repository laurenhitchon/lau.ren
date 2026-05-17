import Image from 'next/image'
import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className='masthead' aria-label='Site header'>
      <Link className='mark' href='/' aria-label='Lauren Hitchon home'>
        <Image src='/logo.svg' alt='' width={400} height={340} priority />
      </Link>
      <nav className='nav' aria-label='Primary navigation'>
        <Link href='/'>Home</Link>
        <Link href='/resume'>Resume</Link>
        <Link href='/writing'>Writing</Link>
        <Link href='/contact'>Contact</Link>
      </nav>
    </header>
  )
}
