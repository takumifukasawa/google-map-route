
import calcDistance from "./calcDistance";

export default function getNearestStation (lat, lng) {
  return stationData.map((station) => {
    station.distance = calcDistance(lat, lng, station.lat, station.lng)
    return station
  }).sort((station1, station2) => 
    station1.distance - station2.distance
  ).slice(0, 1)
}
