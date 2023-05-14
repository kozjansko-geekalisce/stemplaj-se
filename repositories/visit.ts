import { PrismaClient, User, Location } from '@prisma/client'

const prisma = new PrismaClient()

export default class VisitRepository {
  static async getMostRecent(
    visitorId: string,
    locationId: string,
    since: Date
  ) {
    const mostRecentVisit = await prisma.visit.findFirst({
      where: { createdAt: { gte: since }, visitorId, locationId },
      orderBy: { createdAt: 'desc' },
    })
    return mostRecentVisit
  }

  static async getMany() {
    const locations = await prisma.visit.findMany({
      include: {
        visitor: true,
        location: true,
      },
    })
    return locations
  }

  static async create(visitorId: string, locationId: string) {
    const visit = prisma.visit.create({
      data: {
        location: { connect: { id: locationId } },
        visitor: { connect: { id: visitorId } },
      },
    })
    return visit
  }

  static async delete(id: string) {
    return await prisma.visit.delete({ where: { id } })
  }
}
