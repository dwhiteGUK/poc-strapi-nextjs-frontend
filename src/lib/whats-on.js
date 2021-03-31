function buildQueryParams(region, casino) {
  let queryStr = ''

  console.log('🚀 ~ file: whats-on.js ~ line 2 ~ buildQueryParams ~ region', region)
  if (region) queryStr += `regions.id=${region}&`
  if (casino) queryStr += `casinos.id=${casino}&`

  return queryStr;
}

const getWhatsOn = async (region, casino) => {
  const queryParams = buildQueryParams(region, casino)

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whats-ons${queryParams ? `?${queryParams}` : ''}`)
    const data = await res.json()

    return data
  } catch (e) {
    console.error(e.name + ': ' + e.message)
  }
}

const getWhatsOnCount = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whats-ons/count`)
    const data = await res.text()

    return data
  } catch (e) {
    console.error(e.name + ': ' + e.message)
  }
}

export { getWhatsOn, getWhatsOnCount }