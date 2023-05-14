import type { Request, Response } from 'express'

import { flashMessage } from '../../utils/messages.js'
import VisitRepository from '../../repositories/visit.js'

export const listVisits = async (request: Request, response: Response) => {
  const context = {visits: await VisitRepository.getMany()}
  response.render('visit/list', context)
}

export const deleteVisit = async (request: Request, response: Response) => {
  const success = await VisitRepository.delete(request.params.id)

  if (success) flashMessage(request, 'Obisk uspešno izbrisan.', 'success')
  else flashMessage(request, 'Obiska ni bilo mogoče izbrisati.', 'danger')

  response.redirect('/admin/visits')
}
