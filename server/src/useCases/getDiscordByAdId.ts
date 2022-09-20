import { prisma } from '../database/prisma'
import { ApiError } from '../middlewares/error'

interface Request {
  adId: string
}

interface Response {
  discord: string
}

export async function getDiscordByAdId({ adId }: Request): Promise<Response> {
  if (adId.length !== 24) {
    throw new ApiError('the ad id that was passed is invalid', 400)
  }

  const ad = await prisma.ad.findUnique({
    where: {
      id: adId
    }
  })

  if (!ad) {
    throw new ApiError('no ad associated with this id was found', 404)
  }

  return {
    discord: ad.discord
  }
}