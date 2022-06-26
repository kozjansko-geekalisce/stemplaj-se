import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
const prisma = new PrismaClient()

export const getUserListContext = async (request: Request) => {
  const users = await prisma.user.findMany()
  return { users }
}
