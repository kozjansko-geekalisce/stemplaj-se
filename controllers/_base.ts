import { Request } from 'express'

const NAVIGATION_LINKS = [
  {
    url: '/admin/locations',
    label: 'Lokacije',
    dropdown: [{ url: '/admin/locations/create', label: 'Dodaj' }],
  },
  { url: '/admin/users', label: 'Uporabniki' },
]

export const getBaseContext = (request: Request) => {
  return {
    currentURL: request.url,
    navigationLinks: NAVIGATION_LINKS,
    partials: `${process.cwd()}/views/_partials`,
  }
}
