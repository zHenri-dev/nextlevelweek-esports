import { useEffect, useState } from 'react'

import { api } from '../../lib/axios'
import { AxiosError } from 'axios'

import { ConnectModal } from './ConnectModal'
import { GameController } from 'phosphor-react'
import { toast } from 'react-toastify'

import * as Dialog from '@radix-ui/react-dialog'

interface AdProps {
  id: string
  name: string
  yearsPlaying: number
  weekDays: number[]
  useVoiceChannel: boolean
  hourStart: string
  hourEnd: string
}

export function Ad({ id, name, yearsPlaying, weekDays, hourStart, hourEnd, useVoiceChannel }: AdProps) {
  const [discord, setDiscord] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (isModalOpen) {
      api.get(`/ads/${id}/discord`)
      .then(response => setDiscord(response.data.discord))
      .catch((err: AxiosError) => {
        const message = err.response.status === 404 ? 'O anúncio não está mais disponível.' : 'Não foi possível se comunicar ao servidor.'
        
        toast.error(message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
    }
  }, [id, isModalOpen])

  return (
    <li className="p-5 bg-[#2A2634] flex flex-col gap-4 rounded-md w-[13.923125rem] lg:w-[18rem]">
      <div className="flex flex-col">
        <span className="text-[#C4C4C6]">Nome</span>
        <strong className="text-white text-ellipsis overflow-hidden whitespace-nowrap">{name}</strong>
      </div>

      <div className="flex flex-col">
        <span className="text-[#C4C4C6]">Tempo de jogo</span>
        <strong className="text-white text-ellipsis overflow-hidden whitespace-nowrap">{yearsPlaying} {yearsPlaying !== 1 ? 'anos' : 'ano'}</strong>
      </div>

      <div className="flex flex-col">
        <span className="text-[#C4C4C6]">Disponibilidade</span>
        <strong className="text-white flex items-center gap-1 text-ellipsis overflow-hidden whitespace-nowrap">
          {weekDays.length} {weekDays.length !== 1 ? 'dias' : 'dia'}

          <div className="w-1 h-1 bg-zinc-500 rounded-full" />

          {hourStart}h - {hourEnd}h 
        </strong>
      </div>

      <div className="flex flex-col">
        <span className="text-[#C4C4C6]">Chamada de áudio?</span>
        <strong 
          className={`${useVoiceChannel ? 'text-emerald-400' : 'text-red-400'} text-ellipsis overflow-hidden whitespace-nowrap`}
        >
          {useVoiceChannel ? 'Sim' : 'Não'}
        </strong>
      </div>

      <Dialog.Root onOpenChange={setIsModalOpen} open={isModalOpen}>
        <Dialog.Trigger asChild>
          <button className="w-full px-5 py-2 bg-[#8B5CF6] text-white font-semibold text-sm gap-2 rounded-md flex items-center justify-center">
            <GameController size={20} />
            Conectar
          </button>
        </Dialog.Trigger>

        <ConnectModal discord={discord} />
      </Dialog.Root>
      
    </li>
  )
}