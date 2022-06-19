import { Request } from 'express'

const NAVIGATION_LINKS = [
  { url: '/admin/locations', label: 'Lokacije' },
  { url: '/admin/users', label: 'Uporabniki' },
]

export const getBaseContext = (request: Request) => {
  return {
    currentURL: request.url,
    navigationLinks: NAVIGATION_LINKS,
  }
}
