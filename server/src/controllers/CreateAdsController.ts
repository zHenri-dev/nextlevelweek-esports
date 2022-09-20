import { Request, Response } from 'express'
import { createAd } from '../useCases/createAd'
import { z } from 'zod'
import { prisma } from '../database/prisma'

const createAdSchema = z.object({
  gameId: z.string().min(1),
  name: z.string().min(1),
  yearsPlaying: z.number().min(0),
  discord: z.string().min(1),
  weekDays: z.number().array().min(1),
  hourStart: z.string().length(5).refine(value => value[2] === ':', { message: 'Invalid time syntax (00:00)' }),
  hourEnd: z.string().length(5).refine(value => value[2] === ':', { message: 'Invalid time syntax (00:00)' }),
  useVoiceChannel: z.boolean(),
})

export class CreateAdsController {
  async create(request: Request, response: Response) {
    const gameId = request.params.id
    
    const { 
      name, 
      yearsPlaying, 
      discord, 
      weekDays, 
      hourStart, 
      hourEnd, 
      useVoiceChannel 
    } = request.body
    
    const adOptions = {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart,
      hourEnd,
      useVoiceChannel,
    }

    const adOptionsValidation = createAdSchema.safeParse(adOptions)

    if (!adOptionsValidation.success) {
      const errors = adOptionsValidation.error.flatten()

      return response.status(400).json({ errors: errors.fieldErrors })
    }

    const ad = await createAd(adOptions)

    return response.status(201).json(ad)
  }
}