import { prisma } from '../database/prisma'
import { Ad } from '@prisma/client'
import { convertHourStringToMinutes } from '../utils/convertHourStringToMinutes'
import { ApiError } from '../middlewares/error'
interface Request {
  gameId: string
  name: string
  yearsPlaying: number
  discord: string
  weekDays: number[]
  hourStart: string
  hourEnd: string
  useVoiceChannel: boolean
}

type Response = Ad

export async function createAd({ 
  gameId,
  name, 
  yearsPlaying, 
  discord, 
  weekDays, 
  hourStart, 
  hourEnd, 
  useVoiceChannel 
}: Request): Promise<Response> {
  if (gameId.length !== 24) {
    throw new ApiError('the game id that was passed is invalid', 400)
  }

  const gameExists = await prisma.game.findUnique({
    where: {
      id: gameId
    }
  })

  if (!gameExists) {
    throw new ApiError('no game associated with this id was found', 404)
  }

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
      useVoiceChannel,
    }
  })

  return ad
}