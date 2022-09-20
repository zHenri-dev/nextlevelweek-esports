import { Request, Response } from 'express'
import { findAllAdsByGameId } from '../useCases/findAllAdsByGameId'

export class FindAllAdsByGameIdController {
  async find(request: Request, response: Response) {
    const gameId = request.params.id

    const ads = await findAllAdsByGameId({ gameId })

    return response.json(ads)
  }
}