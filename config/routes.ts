import express, { Router, Request, Response } from 'express'
import { ensureLoggedIn } from 'connect-ensure-login'
import { type PassportStatic } from 'passport'

import {
  getLocationListContext,
  createLocation,
  visitLocation,
} from '../controllers/location.js'
import { getVisitListContext } from '../controllers/visit.js'
import { getUserListContext } from '../controllers/user.js'

export default function (passport: PassportStatic) {
  const router: Router = express.Router()
  const ensureLogin = ensureLoggedIn()

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

  // ADMIN
  router.get('/admin', (req: Request, res: Response) => {
    res.redirect('/admin/locations')
  })

  router.get(
    '/admin/locations',
    ensureLogin,
    async (req: Request, res: Response) => {
      const context = await getLocationListContext(req)
      res.render('location/list', context)
    }
  )

  router.get(
    '/admin/locations/create',
    ensureLogin,
    async (req: Request, res: Response) => {
      const context = await getLocationListContext(req)
      res.render('location/create', context)
    }
  )

  router.post(
    '/admin/locations/create',
    ensureLogin,
    async (req: Request, res: Response) => {
      await createLocation(req)
      res.redirect('/admin/locations')
    }
  )

  router.get(
    '/admin/users',
    ensureLogin,
    async (req: Request, res: Response) => {
      const context = await getUserListContext(req)
      res.render('user/list', context)
    }
  )

  router.get(
    '/admin/visits',
    ensureLogin,
    async (req: Request, res: Response) => {
      const context = await getVisitListContext(req)
      res.render('visit/list', context)
    }
  )

  // API
  // router.get('/locations', ensureLogin, async (req, res) => {
  //   const locations = await prisma.location.findMany()
  //   res.json(locations)
  // })

  router.post('/visits', ensureLogin, async (req, res) => {
    try {
      const success = await visitLocation(req)
      res.json({ success })
    } catch (error: any) {
      res.json({ success: false, error: error.message })
    }
  })

  return router
}
