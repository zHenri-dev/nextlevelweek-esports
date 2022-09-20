import Image from 'next/future/image'
import logoImg from '../../assets/logo.svg'

export function Header() {
  return (
    <header className="flex flex-col items-center">
      <Image src={logoImg} alt="" width={285} height={160} className="my-20 lg:my-9 xs:scale-[0.85]" />  

      <h1 className="text-6xl text-white font-black text-center mx-3 sm:text-[2.625rem]">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        está aqui.
      </h1>
    </header>
  )
}
