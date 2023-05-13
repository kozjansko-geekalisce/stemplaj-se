import { Strategy as LocalStrategy } from 'passport-local'
import { type PrismaClient, User } from '@prisma/client'
import argon2 from 'argon2'
import { type PassportStatic } from 'passport'

export default function (passport: PassportStatic, prisma: PrismaClient) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email: username },
        })
        if (user === null) {
          return done(null, false, { message: 'Napačen email ali geslo.' })
        } else if (!(await argon2.verify(user.password, password))) {
          return done(null, false, { message: 'Napačen email ali geslo.' })
        } else {
          return done(null, user)
        }
      } catch (error) {
        return done(error)
      }
    })
  )

  passport.serializeUser(function (user, done) {
    const prismaUser = user as User
    done(null, prismaUser.id)
  })

  passport.deserializeUser(async function (id: string, done) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      })

      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })
}
