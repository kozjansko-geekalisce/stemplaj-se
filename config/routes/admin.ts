import express, { Router, Request, Response } from 'express'
import { ensureLoggedIn } from 'connect-ensure-login'

import {
  createLocationGet,
  createLocationPost,
  deleteLocation,
  listLocations,
} from '#controllers/admin/location.js'
import { listUsers } from '#controllers/admin/user.js'
import { deleteVisit, listVisits } from '#controllers/admin/visit.js'

export default function () {
  const router: Router = express.Router()
  const ensureLogin = ensureLoggedIn()

  // Default redirect
  router.get('/', (_: Request, response: Response) => {
    response.redirect('/admin/locations')
  })

  // Locations
  router.get('/locations', ensureLogin, listLocations)
  router.get('/locations/create', ensureLogin, createLocationGet)
  router.post('/locations/create', ensureLogin, createLocationPost)
  router.post('/locations/delete/:id', ensureLogin, deleteLocation)

  // Users
  router.get('/users', ensureLogin, listUsers)

  // Visits
  router.get('/visits', ensureLogin, listVisits)
  router.post('/visits/delete/:id', ensureLogin, deleteVisit)

  return router
}
