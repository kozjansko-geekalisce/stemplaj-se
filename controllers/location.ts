import { Request, Response } from 'express'

import LocationRepository from '../repositories/location.js'

export const getLocationListContext = async (request: Request) => ({
  locations: await LocationRepository.getMany(),
})

export const getLocations = async (request: Request, response: Response) =>
  response.json(await LocationRepository.getMany())

export const postLocation = async (request: Request) => {
  const formData = request.body
  const newLocation = LocationRepository.create({
    name: formData.name,
    latitude: Number(formData.latitude),
    longitude: Number(formData.longitude),
  })
  return newLocation
}
