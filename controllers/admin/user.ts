import { Request, Response } from 'express'

import UserRepository from '#repositories/user.js'

export const listUsers = async (_: Request, response: Response) => {
  const context = {
    users: await UserRepository.getMany(),
  }
  response.render('user/list', context)
}
