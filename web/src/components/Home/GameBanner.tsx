import Image from 'next/future/image'

import 'keen-slider/keen-slider.min.css'

interface GameProps {
  id: string
  title: string
  bannerUrl: string
  adsCount: number
}

export function GameBanner({ id, title, bannerUrl, adsCount }: GameProps) {
  return (
    <a
      href={`/games/${id}`}
      className="relative rounded-lg overflow-hidden keen-slider__slide"
    >
      <Image src={bannerUrl} alt="" width={180} height={240} className="w-full" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block mt-1">
          {adsCount} anúncio{adsCount !== 1 && 's'}
        </span>
      </div>
    </a>
  )
}
