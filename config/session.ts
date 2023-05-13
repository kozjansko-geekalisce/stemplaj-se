import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { type PrismaClient } from '@prisma/client'

export default function (prisma: PrismaClient) {
  return {
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: 'a santa at nasa',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }
}
