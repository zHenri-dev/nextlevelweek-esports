import Image from 'next/future/image'
import Link from 'next/link'
import logoImg from '../../assets/logo.svg'

export function Header() {
  return (
    <Link href="/">
      <a className="flex items-center gap-20">
        <Image src={logoImg} alt="" width={256} height={144} className="" />
      </a>
    </Link>
  )
}