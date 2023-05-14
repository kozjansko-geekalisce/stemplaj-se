import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '@prisma/client'
import argon2 from 'argon2'
import { type PassportStatic } from 'passport'
import UserRepository from '../repositories/user.js'

export default function (passport: PassportStatic) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await UserRepository.getOneByEmail(username)
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
      const user = await UserRepository.getOneById(id)
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })
}
