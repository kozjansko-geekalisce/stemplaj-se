import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class UserRepository {
  static async getOneByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  }

  static async getOneById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  }

  static async getMany() {
    const users = await prisma.user.findMany()
    return users
  }
}
