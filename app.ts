import 'dotenv/config'
import { Prisma, PrismaClient } from '@prisma/client'
import express, { Express, Request, Response } from 'express';

const prisma = new PrismaClient()
const app: Express = express();
const port = 3000;

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World BLABLA!');
});

app.get('/locations', async (req, res) => {
  const locations = await prisma.location.findMany()
  res.json(locations)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
