import { PrismaClient, User } from '@prisma/client'
import { subHours } from 'date-fns'
import { Request } from 'express'
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
  const location = await prisma.location.findUnique({
    where: { id: req.params.locationId },
  })

  if (!location) {
    throw new Error('OBJECT_NOT_FOUND')
  }

  const twelveHoursAgo = subHours(new Date(), 12)
  const recentVisit = await prisma.visit.findFirst({
    where: {
      createdAt: { gte: twelveHoursAgo },
      visitor,
      location,
    },
  })

  if (recentVisit) {
    throw new Error('VISITED_RECENTLY')
  }

  await prisma.visit.create({
    data: {
      location: {connect: { id: location.id}},
      visitor: {connect: {id: visitor.id}},

    }
  })

  return true
}
