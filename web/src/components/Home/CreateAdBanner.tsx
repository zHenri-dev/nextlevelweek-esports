import { Game } from '../../pages'
import { CreateAdModal } from './CreateAdModal'

interface CreateAdBannerProps {
  games: Game[]
}

export function CreateAdBanner({ games }: CreateAdBannerProps) {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8 lg:mx-8 xl:mx-auto xl:w-[calc(100%-10rem)]">
      <div className="bg-[#2A2634] py-6 px-8 flex items-center justify-between tiny:flex-col tiny:items-start tiny:gap-4">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <CreateAdModal games={games} />
      </div>
    </div>
  )
}
