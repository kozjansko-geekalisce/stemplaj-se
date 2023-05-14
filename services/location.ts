import { Location, User } from '@prisma/client'
import { subHours } from 'date-fns'
import {
  getDistanceBetweenPositionsInKm,
  type Position,
} from '../utils/distance.js'
import VisitRepository from '../repositories/visit.js'

const MINIMUM_HOURS_BETWEEN_VISITS = 12
const MAXIMUM_DISTANCE_FOR_VISIT_IN_METERS = 250

export async function userVisitedLocationRecently(
  user: User,
  location: Location
) {
  const twelveHoursAgo = subHours(new Date(), MINIMUM_HOURS_BETWEEN_VISITS)
  const recentVisit = await VisitRepository.getMostRecent(
    user.id,
    location.id,
    twelveHoursAgo
  )

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
