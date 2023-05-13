import { PrismaClient, User } from '@prisma/client'
import { Request } from 'express'
import {
  getLocation,
  userVisitedLocationRecently,
  positionIsNearLocation,
} from '../services/location.js'
const prisma = new PrismaClient()

export const getLocationListContext = async (request: Request) => {
  const locations = await prisma.location.findMany({})
  return { locations }
}

export const createLocation = async (request: Request) => {
  const formData = request.body
  const newLocation = await prisma.location.create({
    data: {
      name: formData.name,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
    },
  })
  return newLocation
}

export const visitLocation = async (req: Request) => {
  const visitor = req.user! as User
  const location = await getLocation(req.body.locationId)
  const userPosition = req.body.position

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

  return true
}
