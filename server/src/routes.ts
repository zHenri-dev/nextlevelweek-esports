import { Router } from 'express'

import { FindAllGamesController } from './controllers/FindAllGamesController'
import { FindAllAdsByGameIdController } from './controllers/FindAllAdsByGameIdController'
import { CreateAdsController } from './controllers/CreateAdsController'
import { GetDiscordsByAdIdController } from './controllers/GetDiscordsByAdIdController'

const routes = Router()

const findAllGamesController = new FindAllGamesController()
const findAllAdsByGameIdController = new FindAllAdsByGameIdController()
const createAdsController = new CreateAdsController()
const getDiscordsByAdIdController = new GetDiscordsByAdIdController()

routes.get('/games', findAllGamesController.find)
routes.get('/games/:id/ads', findAllAdsByGameIdController.find)
routes.get('/ads/:id/discord', getDiscordsByAdIdController.get)

routes.post('/games/:id/ads', createAdsController.create)


export default routes