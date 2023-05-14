import { Request, Response } from 'express'

import LocationRepository from '../../repositories/location.js'

export const getLocations = async (request: Request, response: Response) =>
  response.json(await LocationRepository.getMany())
