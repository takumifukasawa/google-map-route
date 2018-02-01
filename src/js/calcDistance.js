export default function calcDistance (lat1, lng1, lat2, lng2) {
  const Re = 6378.137 // 地球の半径

  function radians (deg) {
    return deg * Math.PI / 180
  }

  function rectangularCoordinateSystem (lat, lng) {
    const h = radians(lat)
    const t = radians(lng)
    const x = Math.cos(h) * Math.cos(t)
    const y = Math.cos(h) * Math.sin(t)
    const z = Math.sin(h)
    return [x, y, z]
  }

  function innerProduct(vector1, vector2) {
    return vector1.reduce((carry, value, index) => {
      return carry + value * vector2[index]
    }, 0)
  }

  const v1 = rectangularCoordinateSystem(lat1, lng1)
  const v2 = rectangularCoordinateSystem(lat2, lng2)
  return Re * Math.acos(innerProduct(v1, v2))
}
