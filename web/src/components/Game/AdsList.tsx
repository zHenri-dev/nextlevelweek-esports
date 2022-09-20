import Image from 'next/future/image'

import { Ad } from './Ad'

interface AdsListProps {
  game: {
    id: string
    title: string
    bannerUrl: string
    ads: {
      id: string
      name: string
      weekDays: number[]
      useVoiceChannel: boolean
      yearsPlaying: number
      hourStart: string
      hourEnd: string
    }[]
  }
}

export function AdsList({ game }: AdsListProps) {
  return (
    <div className="flex flex-col justify-center items-start w-full 3xl:w-[calc(100%-4rem)] 3xl:items-center mx-auto my-5">
      <div className="flex flex-col justify-center 3xl:items-center 3xl:mt-5">
        <strong className="text-3xl text-white">{game.title}</strong>
        <span className="text-zinc-400">Conecte-se e comece a jogar!</span>
      </div>

      <ul className="flex flex-wrap mt-12 gap-7 flex-1 flex- items-start 3xl:justify-center lg:gap-4">
        {game.ads.map(ad => {
          return (
            <Ad key={ad.id}
              id={ad.id}
              name={ad.name}
              weekDays={ad.weekDays}
              yearsPlaying={ad.yearsPlaying}
              useVoiceChannel={ad.useVoiceChannel}
              hourStart={ad.hourStart}
              hourEnd={ad.hourEnd}
            />
          )
        } )}
      </ul>
    </div>
  )
}