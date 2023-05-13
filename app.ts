import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client'

import configurePassport from './config/auth.js'
import getSessionConfig from './config/session.js'
import routes from './config/routes.js'
import { defaultTemplateContext } from './controllers/_base.js'

const prisma = new PrismaClient()
const app = express()
const port = 3000

// Enable automatic parsing of JSON, forms and cookies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Enable session authentication with Passport
app.use(session(getSessionConfig(prisma)))
configurePassport(passport, prisma)
app.use(passport.initialize())
app.use(passport.session())

// Set view engine and initialize default template context
app.set('view engine', 'ejs')
app.use(defaultTemplateContext)

// Register all routes
app.use('/', routes(passport))

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
