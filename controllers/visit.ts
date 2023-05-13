import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
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
