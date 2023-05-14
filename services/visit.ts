import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function deleteVisit(id: string) {
  return await prisma.visit.delete({ where: { id } })
}
