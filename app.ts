import 'dotenv/config'
import express, { Express, Request, Response } from 'express'
import session from 'express-session'
import passport from 'passport'
import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

import { getLocationListContext, createLocation } from './controllers/location.js'
import { getUserListContext } from './controllers/user.js'
import { getBaseContext } from './controllers/_base.js'

const prisma = new PrismaClient()
const app: Express = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
)
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

app.post('/login', async (req: Request, res: Response) => {
  res.redirect('/')
})

// ADMIN
app.get('/admin', (req: Request, res: Response) => {
  res.redirect('/admin/locations')
})

app.get('/admin/locations', async (req: Request, res: Response) => {
  const context = await getLocationListContext(req)
  res.render('location/list', context)
})

app.get('/admin/locations/create', async (req: Request, res: Response) => {
  const context = await getLocationListContext(req)
  res.render('location/create', context)
})

app.post('/admin/locations/create', async (req: Request, res: Response) => {
  await createLocation(req)
  res.redirect('/admin/locations')
})

app.get('/admin/users', async (req: Request, res: Response) => {
  const context = await getUserListContext(req)
  res.render('user/list', context)
})


// API
app.get('/locations', async (req, res) => {
  const locations = await prisma.location.findMany()
  res.json(locations)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
