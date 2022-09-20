import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'

import { CheckCircle, CircleNotch, X } from 'phosphor-react'

interface ConnectModalProps {
  discord: string | null
}

export function ConnectModal({ discord }: ConnectModalProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  function handleCopyDiscord() {
    navigator.clipboard.writeText(discord)

    setIsTooltipOpen(true)
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 px-10 flex items-center justify-center flex-col gap-6 bg-[#2A2634] rounded-lg w-[18.125rem]">
        <Dialog.Close className="absolute top-4 right-4 text-zinc-500">
          <X size={20} />
        </Dialog.Close>
        
        <CheckCircle size={64} className="text-emerald-400" weight="bold" />
        
        <div className="flex flex-col items-center justify-center">
          <Dialog.Title className="font-black text-white text-2xl">Let's Play</Dialog.Title>
          <span className="text-zinc-400">Agora é só começar a jogar</span>
        </div>

        <div className="flex items-center flex-col gap-2">
          <span className="text-white font-semibold">Adicione no Discord</span>
          
          <Tooltip.Provider>
            <Tooltip.Root onOpenChange={setIsTooltipOpen} open={isTooltipOpen}>
              <button 
                className={`bg-zinc-900 text-zinc-200 py-3 px-[3.75rem] rounded-[4px] flex items-center justify-center relative ${discord && 'w-full'}`}
                onClick={handleCopyDiscord}  
              >
                {!discord ? `${discord}` : (
                  <CircleNotch size={20} className="animate-spin" />
                )}

                <Tooltip.Trigger asChild>
                  <span className={`${!isTooltipOpen && ''} absolute top-[0.625rem]`}></span>
                </Tooltip.Trigger>
              </button>

              <Tooltip.Portal>
                <Tooltip.Content className="rounded-[4px] text-white bg-emerald-400 select-none shadow-tooltip px-2 py-1">
                  Copiado!
                  <Tooltip.Arrow className="fill-emerald-400" /> 
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}