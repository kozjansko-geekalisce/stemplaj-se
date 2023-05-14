import { Request } from 'express'
import UserRepository from '../repositories/user.js'

export const getUserListContext = async (request: Request) => {
  const users = await UserRepository.getMany()
  return { users }
}
