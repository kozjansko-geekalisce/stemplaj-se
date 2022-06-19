import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import express, { Express, Request, Response } from 'express'

import { getLocationListingContext } from './controllers/location.js'

const prisma = new PrismaClient()
const app: Express = express()
const port = 3000

app.use(express.json())
app.set('view engine', 'ejs')

app.get('/', (req: Request, res: Response) => {
  res.redirect('/admin')
})

app.get('/admin', (req: Request, res: Response) => {
  res.redirect('/admin/locations')
})

app.get('/admin/locations', async (req: Request, res: Response) => {
  const context = await getLocationListingContext()
  res.render('locations', context)
})

app.get('/locations', async (req, res) => {
  const locations = await prisma.location.findMany()
  res.json(locations)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
