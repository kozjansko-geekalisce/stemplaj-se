import { NextFunction, Request, Response } from 'express'

declare module 'express-session' {
  interface SessionData {
    messages: string[]
  }
}

export const NAVIGATION_LINKS = [
  {
    url: '/admin/locations',
    label: 'Lokacije',
    dropdown: [{ url: '/admin/locations/create', label: 'Dodaj' }],
  },
  { url: '/admin/users', label: 'Uporabniki' },
  { url: '/admin/visits', label: 'Obiski' },
]

export const defaultTemplateContext = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const msgs = req.session.messages || []
  res.locals.messages = msgs
  res.locals.hasMessages = !!msgs.length
  req.session.messages = []

  res.locals.currentURL = req.url
  res.locals.navigationLinks = NAVIGATION_LINKS
  res.locals.partials = `${process.cwd()}/views/_partials`

  next()
}
