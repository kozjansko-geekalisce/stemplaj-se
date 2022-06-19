import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getUserListingContext = async () => {
  const users = await prisma.user.findMany()
  return { users }
}
