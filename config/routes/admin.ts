import express, { Router, Request, Response } from 'express'
import { ensureLoggedIn } from 'connect-ensure-login'

import {
  getLocationListContext,
  postLocation,
} from '../../controllers/location.js'
import { getVisitListContext } from '../../controllers/visit.js'
import { getUserListContext } from '../../controllers/user.js'

export default function () {
  const router: Router = express.Router()
  const ensureLogin = ensureLoggedIn()

  router.get('/', (req: Request, res: Response) => {
    res.redirect('/admin/locations')
  })

  router.get(
    '/locations',
    ensureLogin,
    async (req: Request, res: Response) => {
      const context = await getLocationListContext(req)
      res.render('location/list', context)
    }
  )

  router.get(
    '/locations/create',
    ensureLogin,
    async (req: Request, res: Response) => {
      const context = await getLocationListContext(req)
      res.render('location/create', context)
    }
  )

  router.post(
    '/locations/create',
    ensureLogin,
    async (req: Request, res: Response) => {
      await postLocation(req)
      res.redirect('/admin/locations')
    }
  )

  router.get(
    '/users',
    ensureLogin,
    async (req: Request, res: Response) => {
      const context = await getUserListContext(req)
      res.render('user/list', context)
    }
  )

  router.get(
    '/visits',
    ensureLogin,
    async (req: Request, res: Response) => {
      const context = await getVisitListContext(req)
      res.render('visit/list', context)
    }
  )

  return router
}
