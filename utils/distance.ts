export type Position = {
  latitude: number
  longitude: number
}

export function getDistanceBetweenPositionsInKm(
  posA: Position,
  posB: Position
) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(posB.latitude - posA.latitude) // deg2rad below
  const dLon = deg2rad(posB.longitude - posA.longitude)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(posA.latitude)) *
      Math.cos(deg2rad(posB.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}
