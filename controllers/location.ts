import { Request, Response } from 'express'

import { listAllLocations, createLocation } from '../services/location.js'

export const getLocationListContext = async (request: Request) => ({
  locations: await listAllLocations(),
})

export const getLocations = async (request: Request, response: Response) =>
  response.json(await listAllLocations())

export const postLocation = async (request: Request) => {
  const formData = request.body
  const newLocation = createLocation(
    formData.name,
    Number(formData.latitude),
    Number(formData.longitude)
  )
  return newLocation
}
