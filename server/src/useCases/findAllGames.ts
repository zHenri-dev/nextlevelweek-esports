import { prisma } from '../database/prisma'

interface Response {
  games: {
    id: string
    title: string
    bannerUrl: string
    _count: {
      ads: number
    }
  }[]
}

export async function findAllGames(): Promise<Response> {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return {
    games
  }
}