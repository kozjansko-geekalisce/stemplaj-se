import { PrismaClient } from '@prisma/client'
import argon2id from 'argon2'

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

  const bellevue = await prisma.location.upsert({
    where: { name: 'Bellevue' },
    update: {},
    create: {
      name: 'Bellevue',
      latitude: 46.24580555307261,
      longitude: 15.636917489388885,
    }, 
  })

  const central_cafe = await prisma.location.upsert({
    where: { name: 'Central Cafe Rogaška Slatina' },
    update: {},
    create: {
      name: 'Central Cafe Rogaška Slatina',
      latitude: 46.23653780094142,
      longitude: 15.638145248545941,
    },
  })

  const anica = await prisma.user.upsert({
    where: { email: 'anica@example.com' },
    update: {},
    create: {
      email: 'anica@example.com',
      name: 'Anica',
      password: await argon2id.hash('Anica123!'),
    },
  })

  const robi = await prisma.user.upsert({
    where: { email: 'robi@example.com' },
    update: {},
    create: {
      email: 'robi@example.com',
      name: 'Robi',
      password: await argon2id.hash('Robi123!'),
    },
  })

  const nastja = await prisma.user.upsert({
    where: { email: 'nastja@example.com' },
    update: {},
    create: {
      email: 'nastja@example.com',
      name: 'Nastja',
      password: await argon2id.hash('Nastja123!'),
    },
  })  

  const niggo = await prisma.user.upsert({
    where: { email: 'niggo@example.com' },
    update: {},
    create: {
      email: 'niggo@example.com',
      name: 'Niggo',
      password: await argon2id.hash('Niggo123!'),
    },
  })  

  console.log({ anica, robi, nastja, niggo })
  console.log({ boc, knjiznica, central_cafe, bellevue })

  await prisma.visit.deleteMany()

  const visit = await prisma.visit.create({
    data: {
      visitorId: robi.id,
      locationId: boc.id,
    },
  })

  const visits = [
    { visitorId: robi.id, locationId: central_cafe.id },
    { visitorId: niggo.id, locationId: knjiznica.id },
    { visitorId: nastja.id, locationId: knjiznica.id },
    { visitorId: anica.id, locationId: central_cafe.id },
    { visitorId: niggo.id, locationId: boc.id },
    { visitorId: robi.id, locationId: bellevue.id },
    { visitorId: anica.id, locationId: central_cafe.id },
    { visitorId: nastja.id, locationId: knjiznica.id },
    { visitorId: niggo.id, locationId: boc.id },
    { visitorId: niggo.id, locationId: bellevue.id },
    { visitorId: niggo.id, locationId: central_cafe.id },
    { visitorId: niggo.id, locationId: central_cafe.id },
    { visitorId: niggo.id, locationId: bellevue.id },
    { visitorId: niggo.id, locationId: central_cafe.id },
    { visitorId: robi.id, locationId: knjiznica.id },
    { visitorId: robi.id, locationId: boc.id },
    { visitorId: robi.id, locationId: central_cafe.id },
    { visitorId: robi.id, locationId: boc.id },
    { visitorId: robi.id, locationId: central_cafe.id },
    { visitorId: robi.id, locationId: knjiznica.id },
    { visitorId: robi.id, locationId: boc.id },
    { visitorId: anica.id, locationId: central_cafe.id },
    { visitorId: anica.id, locationId: bellevue.id },
    { visitorId: anica.id, locationId: boc.id },
    { visitorId: anica.id, locationId: central_cafe.id },
    { visitorId: anica.id, locationId: central_cafe.id },
    { visitorId: anica.id, locationId: bellevue.id },
    { visitorId: anica.id, locationId: knjiznica.id },
    { visitorId: anica.id, locationId: central_cafe.id },
    { visitorId: anica.id, locationId: central_cafe.id },
    { visitorId: anica.id, locationId: boc.id },
    { visitorId: anica.id, locationId: central_cafe.id },
    { visitorId: nastja.id, locationId: central_cafe.id },
    { visitorId: nastja.id, locationId: central_cafe.id },
    { visitorId: niggo.id, locationId: boc.id },
    { visitorId: niggo.id, locationId: central_cafe.id },
    { visitorId: niggo.id, locationId: central_cafe.id },
    { visitorId: niggo.id, locationId: central_cafe.id },
  ];
  
  for (const visitData of visits) {
    await prisma.visit.create({
      data: visitData,
    });
  }  
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
