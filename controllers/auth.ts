import { NextFunction, Request, Response } from 'express'

export const loginForm = async (_: Request, response: Response) => {
  response.render('login')
}

export const logout = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.logout((error) => {
    if (error) {
      return next(error)
    }
    response.redirect('/login')
  })
}
