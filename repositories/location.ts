import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default class LocationRepository {
  static async getOneById(id: string) {
    const location = await prisma.location.findUnique({
      where: { id },
    })
    return location
  }

  static async getMany() {
    const locations = await prisma.location.findMany()
    return locations
  }

  static async create(data: Prisma.LocationCreateInput) {
    const location = prisma.location.create({ data })
    return location
  }
}
