import express, { Router, Request, Response } from 'express'
import { PassportStatic } from 'passport'

import { loginForm, logout } from '../../controllers/auth.js'

export default function (passport: PassportStatic) {
  const router: Router = express.Router()

  // Default redirects
  router.get('', (_: Request, response: Response) => {
    response.redirect('/admin')
  })

  // Auth
  router.get('/login', loginForm)
  router.get('/logout', logout)
  router.post(
    '/login/password',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureMessage: true,
    })
  )

  return router
}
