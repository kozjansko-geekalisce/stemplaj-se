import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { getBaseContext } from './_base.js'
const prisma = new PrismaClient()

export const getUserListingContext = async (request: Request) => {
  const users = await prisma.user.findMany()
  return { users, ...getBaseContext(request) }
}
