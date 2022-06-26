import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
const prisma = new PrismaClient()

export const getLocationListContext = async (request: Request) => {
  const locations = await prisma.location.findMany()
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
