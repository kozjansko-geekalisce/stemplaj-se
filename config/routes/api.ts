import express, { Router } from 'express'
import { ensureLoggedIn } from 'connect-ensure-login'

import { getLocations } from '../../controllers/location.js'
import { postVisit, deleteVisitApi } from '../../controllers/visit.js'

export default function () {
  const router: Router = express.Router()
  const ensureLogin = ensureLoggedIn()

  router.get('/locations', ensureLogin, getLocations)
  router.post('/visits', ensureLogin, postVisit)
  router.delete('/visits/:id', ensureLogin, deleteVisitApi)

  return router
}
