import { PrismaClient, Location, User } from '@prisma/client'
import { subHours } from 'date-fns'
import {
  getDistanceBetweenPositionsInKm,
  type Position,
} from '../utils/distance.js'
const prisma = new PrismaClient()

const MINIMUM_HOURS_BETWEEN_VISITS = 12
const MAXIMUM_DISTANCE_FOR_VISIT_IN_METERS = 250

export async function getLocation(id: string) {
  return await prisma.location.findUnique({ where: { id } })
}

export async function listAllLocations() {
  return await prisma.location.findMany()
}

export async function createLocation(
  name: string,
  latitude: number,
  longitude: number
) {
  return await prisma.location.create({ data: { name, latitude, longitude } })
}

export async function userVisitedLocationRecently(
  user: User,
  location: Location
) {
  const twelveHoursAgo = subHours(new Date(), MINIMUM_HOURS_BETWEEN_VISITS)
  const recentVisit = await prisma.visit.findFirst({
    where: {
      createdAt: { gte: twelveHoursAgo },
      visitor: user,
      location,
    },
  })

  return Boolean(recentVisit)
}

export async function positionIsNearLocation(
  userPosition: Position,
  location: Location
) {
  const distance = getDistanceBetweenPositionsInKm(userPosition, {
    latitude: location.latitude,
    longitude: location.longitude,
  })

  return distance < MAXIMUM_DISTANCE_FOR_VISIT_IN_METERS / 1000
}
