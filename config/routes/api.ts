import express, { Router } from 'express'
import { ensureLoggedIn } from 'connect-ensure-login'

import { getLocations } from '../../controllers/api/location.js'
import { deleteVisit, postVisit } from '../../controllers/api/visit.js'

export default function () {
  const router: Router = express.Router()
  const ensureLogin = ensureLoggedIn()

  // Locations
  router.get('/locations', ensureLogin, getLocations)

  // Visits
  router.post('/visits', ensureLogin, postVisit)
  router.delete('/visits/:id', ensureLogin, deleteVisit)

  return router
}
