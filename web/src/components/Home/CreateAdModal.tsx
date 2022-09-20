import { useEffect, useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { api } from '../../lib/axios'

import {
  CaretDown,
  CaretUp,
  Check,
  CircleNotch,
  GameController,
  MagnifyingGlassPlus,
} from 'phosphor-react'
import { toast } from 'react-toastify'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

interface Game {
  id: string
  title: string
}

interface CreateAdModalProps {
  games: Game[]
}

const createAdFormSchema = zod.object({
  gameId: zod.string().min(1),
  name: zod.string().min(1),
  yearsPlaying: zod.number().min(0),
  discord: zod.string().min(1),
  weekDays: zod.number().array().min(1),
  hourStart: zod.string().min(1),
  hourEnd: zod.string().min(1),
  useVoiceChannel: zod.boolean(),
})

type createAdFormInputs = zod.infer<typeof createAdFormSchema>

export function CreateAdModal({ games }: CreateAdModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({
        top: 0,
      })
    }
  }, [isModalOpen])

  const inputErrorStyle = `border border-red-500 outline-none focus:border-red-700`

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<createAdFormInputs>({
    resolver: zodResolver(createAdFormSchema),
    defaultValues: {
      gameId: undefined,
    },
  })

  async function handleCreateAd(data: createAdFormInputs) {
    try {
      await api.post(`/games/${data.gameId}/ads`, {
        name: data.name,
        yearsPlaying: data.yearsPlaying,
        discord: data.discord,
        weekDays: data.weekDays,
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: data.useVoiceChannel,
      })

      reset()
      setIsModalOpen(false)

      toast.success('Anúncio criado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (err) {
      toast.error('Não foi possível criar o anúncio.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <Dialog.Root onOpenChange={setIsModalOpen} open={isModalOpen}>
      <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded transition-colors hover:bg-violet-600 flex items-center gap-3">
        <MagnifyingGlassPlus size={24} />
        Publicar anúncio
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

        <Dialog.Content className="absolute w-full max-h-[100vh] top-0 overflow-auto">
          <div className="bg-[#2a2634] py-8 px-10 text-white rounded-lg w-[480px] m-auto sm:w-[calc(100%-4rem)] my-20">
            <Dialog.Title className="font-black text-3xl">
              Publique um anúncio
            </Dialog.Title>

            <form
              className="mt-8 flex flex-col gap-4"
              onSubmit={handleSubmit(handleCreateAd)}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>

                <Controller
                  control={control}
                  name="gameId"
                  render={({ field }) => (
                    <Select.Root
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <Select.Trigger
                        className={`bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between items-center ${
                          errors.gameId && inputErrorStyle
                        }`}
                      >
                        <Select.Value
                          placeholder={
                            <span className="text-zinc-500">
                              Selecione o game
                            </span>
                          }
                        />
                        <Select.Icon>
                          <CaretDown size={24} className="text-zinc-400" />
                        </Select.Icon>
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content className="rounded overflow-hidden bg-[#2e2a36] text-white border border-zinc-900 mt-2 ml-2">
                          <Select.ScrollUpButton className="m-auto mt-2 cursor-pointer">
                            <CaretUp size={24} className="text-zinc-400" />
                          </Select.ScrollUpButton>

                          <Select.Viewport className="py-3 px-4">
                            <Select.SelectGroup>
                              {games.map((game) => {
                                return (
                                  <Select.SelectItem
                                    value={game.id}
                                    key={`modalSelectGame-${game.id}`}
                                    className="flex items-center gap-2 rounded cursor-pointer hover:bg-[#403b4a] p-2"
                                  >
                                    <Select.SelectItemText className="text-red-900">
                                      {game.title}
                                    </Select.SelectItemText>
                                    <Select.SelectItemIndicator>
                                      <Check
                                        size={20}
                                        className="text-emerald-400"
                                      />
                                    </Select.SelectItemIndicator>
                                  </Select.SelectItem>
                                )
                              })}
                            </Select.SelectGroup>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold">
                  Seu nome (ou nickname)
                </label>
                <input
                  id="name"
                  placeholder="Como te chama dentro do game?"
                  className={`w-full bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 ${
                    errors.name && inputErrorStyle
                  }`}
                  {...register('name')}
                />
              </div>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-1 sm:gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying" className="font-semibold">
                    Joga há quantos anos?
                  </label>
                  <input
                    id="yearsPlaying"
                    type="number"
                    placeholder="Tudo bem ser ZERO"
                    min={0}
                    className={`w-full bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 ${
                      errors.yearsPlaying && inputErrorStyle
                    }`}
                    {...register('yearsPlaying', { valueAsNumber: true })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord" className="font-semibold">
                    Qual seu Discord?
                  </label>
                  <input
                    id="discord"
                    placeholder="Usuário#0000"
                    className={`w-full bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 ${
                      errors.discord && inputErrorStyle
                    }`}
                    {...register('discord')}
                  />
                </div>
              </div>

              <div className="flex gap-6 sm:flex-col sm:gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays" className="font-semibold">
                    Quando costuma jogar?
                  </label>

                  <Controller
                    control={control}
                    name="weekDays"
                    render={({ field }) => {
                      const value = field.value?.map(String) || []

                      return (
                        <ToggleGroup.Root
                          type="multiple"
                          className="grid grid-cols-4 gap-2 sm:grid-cols-7"
                          onValueChange={(value) =>
                            field.onChange(value.map(Number))
                          }
                          value={value}
                        >
                          <ToggleGroup.Item
                            value="0"
                            title="Domingo"
                            className="w-8 h-8 rounded bg-zinc-900 transition-colors radix-state-on:bg-violet-500"
                          >
                            D
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                            value="1"
                            title="Segunda"
                            className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                          >
                            S
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                            value="2"
                            title="Terça"
                            className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                          >
                            T
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                            value="3"
                            title="Quarta"
                            className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                          >
                            Q
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                            value="4"
                            title="Quinta"
                            className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                          >
                            Q
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                            value="5"
                            title="Sexta"
                            className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                          >
                            S
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                            value="6"
                            title="Sábado"
                            className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                          >
                            S
                          </ToggleGroup.Item>
                        </ToggleGroup.Root>
                      )
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart" className="font-semibold">
                    Qual horário do dia?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <span className="text-zinc-500 absolute top-[50%] -translate-y-[50%] left-2">
                        De
                      </span>
                      <input
                        id="hourStart"
                        type="time"
                        placeholder="De"
                        className={`w-full bg-zinc-900 py-3 px-3 rounded text-sm ${
                          errors.hourStart && inputErrorStyle
                        }`}
                        {...register('hourStart')}
                      />
                    </div>
                    <div className="relative">
                      <span className="text-zinc-500 absolute top-[50%] -translate-y-[50%] left-2">
                        Até
                      </span>
                      <input
                        id="hourEnd"
                        type="time"
                        placeholder="Até"
                        className={`w-full bg-zinc-900 py-3 px-3 rounded text-sm ${
                          errors.hourEnd && inputErrorStyle
                        }`}
                        {...register('hourEnd')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <label className="mt-2 flex gap-2 text-sm items-center">
                <Controller
                  control={control}
                  name="useVoiceChannel"
                  render={({ field }) => (
                    <Checkbox.Root
                      className="w-6 h-6 p-1 rounded bg-zinc-900"
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    >
                      <Checkbox.Indicator>
                        <Check size={16} className="text-emerald-400" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  )}
                />
                Costumo me conectar ao chat de voz
              </label>

              <footer className="mt-4 flex justify-end gap-4 game-xs:flex-col-reverse game-xs:gap-2">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold transition-colors hover:bg-zinc-600"
                >
                  Cancelar
                </Dialog.Close>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-violet-500 min-w-[11.5625rem] px-5 h-12 rounded-md font-semibold flex justify-center items-center gap-3 transition-colors hover:bg-violet-600 disabled:hover:bg-violet-500 disabled:brightness-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <CircleNotch size={24} className="animate-spin" />
                  ) : (
                    <>
                      <GameController size={24} />
                      Encontrar duo
                    </>
                  )}
                </button>
              </footer>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}