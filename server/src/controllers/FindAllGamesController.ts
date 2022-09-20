import { Request, Response } from 'express'
import { findAllGames } from '../useCases/findAllGames'

export class FindAllGamesController {
  async find(request: Request, response: Response) {
    const games = await findAllGames()

    return response.json(games)
  }
}