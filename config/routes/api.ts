import express, { Router } from 'express'
import { ensureLoggedIn } from 'connect-ensure-login'

import { getLocations } from '../../controllers/location.js'
import { postVisit } from '../../controllers/visit.js'

export default function () {
  const router: Router = express.Router()
  const ensureLogin = ensureLoggedIn()

  router.get('/locations', ensureLogin, getLocations)
  router.post('/visits', ensureLogin, postVisit)

  return router
}
