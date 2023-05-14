import { Request, Response } from 'express'

import LocationRepository from '#repositories/location.js'
import { flashMessage } from '#utils/messages.js'

export const listLocations = async (_: Request, response: Response) => {
  const context = {
    locations: await LocationRepository.getMany(),
  }
  response.render('location/list', context)
}

export const createLocationGet = async (_: Request, response: Response) => {
  response.render('location/create')
}

export const createLocationPost = async (
  request: Request,
  response: Response
) => {
  const formData = request.body

  await LocationRepository.create({
    name: formData.name,
    latitude: Number(formData.latitude),
    longitude: Number(formData.longitude),
  })
  flashMessage(request, 'Lokacija uspešno ustvarjena.', 'success')

  response.redirect('/admin/locations')
}

export const deleteLocation = async (request: Request, response: Response) => {
  const success = await LocationRepository.delete(request.params.id)

  if (success) flashMessage(request, 'Lokacija uspešno izbrisana.', 'success')
  else flashMessage(request, 'Lokacije ni bilo mogoče izbrisati.', 'danger')

  response.redirect('/admin/locations')
}
