import { prisma } from '../database/prisma'
import { ApiError } from '../middlewares/error'
import { convertMinutesToHourString } from '../utils/convertMinutesToHourString'

interface Request {
  gameId: string
}

interface Response {
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

export async function findAllAdsByGameId({ gameId }: Request): Promise<Response> {
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

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return { 
    game: {
      id: gameId,
      title: gameExists.title,
      bannerUrl: gameExists.bannerUrl,
      ads: ads.map(ad => {
        return {
          ...ad,
          hourStart: convertMinutesToHourString(ad.hourStart),
          hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
      })
    }
  }
}