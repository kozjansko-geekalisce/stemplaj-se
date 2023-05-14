import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'

import configurePassport from './config/passport.js'
import getSessionConfig from './config/session.js'
import authRoutes from './config/routes/auth.js'
import adminRoutes from './config/routes/admin.js'
import apiRoutes from './config/routes/api.js'
import { defaultTemplateContext } from './controllers/_base.js'

const app = express()
const port = 3000

// Enable automatic parsing of JSON, forms and cookies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Enable session authentication with Passport
app.use(session(getSessionConfig()))
configurePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

// Set view engine and initialize default template context
app.set('view engine', 'ejs')
app.use(defaultTemplateContext)

// Register all routes
app.use('/', authRoutes(passport))
app.use('/admin', adminRoutes())
app.use('/api', apiRoutes())

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
