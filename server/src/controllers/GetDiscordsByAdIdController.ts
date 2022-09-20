import { Request, Response } from 'express'
import { getDiscordByAdId } from '../useCases/getDiscordByAdId'

export class GetDiscordsByAdIdController {
  async get(request: Request, response: Response) {
    const adId = request.params.id

    const adDiscord = await getDiscordByAdId({ adId })

    return response.json(adDiscord)
  }
}