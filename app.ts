import 'dotenv/config'
import express, { Express, Request, Response } from 'express'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client'
import { ensureLoggedIn } from 'connect-ensure-login'

import configurePassport from './config/auth.js'
import getSessionConfig from './config/session.js'
import {
  getLocationListContext,
  createLocation,
  visitLocation,
} from './controllers/location.js'
import { getVisitListContext } from './controllers/visit.js'
import { getUserListContext } from './controllers/user.js'
import { defaultTemplateContext } from './controllers/_base.js'

const ensureLogin = ensureLoggedIn()
const prisma = new PrismaClient()
const app: Express = express()
const port = 3000

// Middlewares for parsing JSON, forms and cookies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Session support + Passport
app.use(session(getSessionConfig(prisma)))
configurePassport(passport, prisma)
app.use(passport.initialize())
app.use(passport.session())

// Templates
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

app.get(
  '/admin/visits',
  ensureLogin,
  async (req: Request, res: Response) => {
    const context = await getVisitListContext(req)
    res.render('visit/list', context)
  }
)


// API
app.get('/locations', ensureLogin, async (req, res) => {
  const locations = await prisma.location.findMany()
  res.json(locations)
})

app.post('/visits', ensureLogin, async (req, res) => {
  try {
    const success = await visitLocation(req)
    res.json({success})
  } catch (error: any) {
    res.json({success: false, error: error.message})
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
