import { PrismaClient, User } from '@prisma/client'
import { Request, Response } from 'express'
import {
  getLocation,
  userVisitedLocationRecently,
  positionIsNearLocation,
} from '../services/location.js'
import { deleteVisit } from '../services/visit.js'
import { flashMessage } from '../utils/messages.js'

const prisma = new PrismaClient()

export const getVisitListContext = async (req: Request) => {
  const visits = await prisma.visit.findMany({
    include: {
      visitor: true,
      location: true,
    },
  })
  return { visits }
}

export const postVisit = async (request: Request, response: Response) => {
  try {
    const visitor = request.user! as User
    const location = await getLocation(request.body.locationId)
    const userPosition = request.body.position

    if (!location) throw new Error('LOCATION_NOT_FOUND')

    if (await userVisitedLocationRecently(visitor, location))
      throw new Error('VISITED_RECENTLY')

    if (!(await positionIsNearLocation(userPosition, location)))
      throw new Error('TOO_FAR_AWAY')

    await prisma.visit.create({
      data: {
        location: { connect: { id: location.id } },
        visitor: { connect: { id: visitor.id } },
      },
    })
    response.json({ success: true })
  } catch (error: any) {
    response.json({ success: false, error: error.message })
  }
}

export const deleteVisitApi = async (request: Request, response: Response) => {
  const success = await deleteVisit(request.params.id)
  return response.sendStatus(success ? 204 : 422)
}

export const deleteVisitAdmin = async (
  request: Request,
  response: Response
) => {
  const success = await deleteVisit(request.params.id)

  if (success) flashMessage(request, 'Obisk uspešno izbrisan.', 'success')
  else flashMessage(request, 'Obiska ni bilo mogoče izbrisati.', 'danger')

  response.redirect('/admin/visits')
}
