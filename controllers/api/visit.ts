import type { User } from '@prisma/client'
import type { Request, Response } from 'express'

import {
  userVisitedLocationRecently,
  positionIsNearLocation,
} from '../../services/location.js'
import LocationRepository from '../../repositories/location.js'
import VisitRepository from '../../repositories/visit.js'

export const postVisit = async (request: Request, response: Response) => {
  try {
    const visitor = request.user! as User
    const location = await LocationRepository.getOneById(
      request.body.locationId
    )
    const userPosition = request.body.position

    if (!location) throw new Error('LOCATION_NOT_FOUND')

    if (await userVisitedLocationRecently(visitor, location))
      throw new Error('VISITED_RECENTLY')

    if (!(await positionIsNearLocation(userPosition, location)))
      throw new Error('TOO_FAR_AWAY')

    VisitRepository.create(visitor.id, location.id)
    response.json({ success: true })
  } catch (error: any) {
    response.json({ success: false, error: error.message })
  }
}

export const deleteVisit = async (request: Request, response: Response) => {
  const success = await VisitRepository.delete(request.params.id)
  return response.sendStatus(success ? 204 : 422)
}
