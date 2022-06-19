import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const boc = await prisma.location.upsert({
    where: { name: 'Boč' },
    update: {},
    create: {
      name: 'Boč',
      latitude: 46.28762455566254,
      longitude: 15.601802218743996,
    },
  })

  const knjiznica = await prisma.location.upsert({
    where: { name: 'Knjižnica Rogaška Slatina' },
    update: {},
    create: {
      name: 'Knjižnica Rogaška Slatina',
      latitude: 46.239780391778126,
      longitude: 15.631396656280893,
    },
  })

  const anica = await prisma.user.upsert({
    where: { email: 'anica@example.com' },
    update: {},
    create: {
      email: 'anica@example.com',
      name: 'Anica',
    },
  })

  const robi = await prisma.user.upsert({
    where: { email: 'robi@example.com' },
    update: {},
    create: {
      email: 'robi@example.com',
      name: 'Robi',
    },
  })

  console.log({ anica, robi })
  console.log({ boc, knjiznica })

  await prisma.visit.deleteMany()

  const visit = await prisma.visit.create({
    data: {
      visitorId: robi.id,
      locationId: boc.id,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
