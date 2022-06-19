import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getLocationListingContext = async () => {
  const locations = await prisma.location.findMany()
  return { locations }
}
