import express, { Router, Request, Response } from 'express'
import { type PassportStatic } from 'passport'

export default function (passport: PassportStatic) {
  const router: Router = express.Router()

  router.get('', (req: Request, res: Response) => {
    res.redirect('/admin')
  })

  router.get('/login', async (req: Request, res: Response) => {
    res.render('login')
  })

  router.post(
    '/login/password',
    passport.authenticate('local', {
      successReturnToOrRedirect: '/',
      failureRedirect: '/login',
      failureMessage: true,
    })
  )

  router.get('/logout', (req, res, next) => {
    req.logout((error) => {
      if (error) {
        return next(error)
      }
      res.redirect('/login')
    })
  })

  return router
}
