import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { getBaseContext } from './_base.js'
const prisma = new PrismaClient()

export const getLocationListingContext = async (request: Request) => {
  const locations = await prisma.location.findMany()
  return { locations, ...getBaseContext(request) }
}
