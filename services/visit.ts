import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function deleteVisit(id: string) {
  try {
    await prisma.visit.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}
