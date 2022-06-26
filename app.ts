import 'dotenv/config'
import express, { Express, Request, Response } from 'express'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { PrismaClient, User } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { Strategy as LocalStrategy } from 'passport-local'
import { ensureLoggedIn } from 'connect-ensure-login'

declare module 'express-session' {
  interface SessionData {
    messages: string[]
  }
}

import {
  getLocationListContext,
  createLocation,
} from './controllers/location.js'
import { getUserListContext } from './controllers/user.js'
import { defaultTemplateContext } from './controllers/_base.js'
import argon2 from 'argon2'

const ensureLogin = ensureLoggedIn()
const prisma = new PrismaClient()
const app: Express = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: 'a santa at nasa',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
)
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { email: username } })
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

app.use(passport.initialize())
app.use(passport.session())
app.use(defaultTemplateContext)

app.set('view engine', 'ejs')

app.get('/', (req: Request, res: Response) => {
  res.redirect('/admin')
})

app.get('/login', async (req: Request, res: Response) => {
  res.render('login')
})

app.post(
  '/login/password',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  })
)

app.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    res.redirect('/login')
  })
})

// ADMIN
app.get('/admin', (req: Request, res: Response) => {
  res.redirect('/admin/locations')
})

app.get(
  '/admin/locations',
  ensureLogin,
  async (req: Request, res: Response) => {
    const context = await getLocationListContext(req)
    res.render('location/list', context)
  }
)

app.get(
  '/admin/locations/create',
  ensureLogin,
  async (req: Request, res: Response) => {
    const context = await getLocationListContext(req)
    res.render('location/create', context)
  }
)

app.post(
  '/admin/locations/create',
  ensureLogin,
  async (req: Request, res: Response) => {
    await createLocation(req)
    res.redirect('/admin/locations')
  }
)

app.get('/admin/users', ensureLogin, async (req: Request, res: Response) => {
  const context = await getUserListContext(req)
  res.render('user/list', context)
})


// API
app.get('/locations', ensureLogin, async (req, res) => {
  const locations = await prisma.location.findMany()
  res.json(locations)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
