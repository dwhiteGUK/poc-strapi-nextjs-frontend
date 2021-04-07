function buildQueryParams({ casino, category, region, sort, page, limit }) {
  let queryStr = `_start=${page ? page * limit : 0}&_limit=${limit}&`

  if (casino) queryStr += `casinos.id=${casino}&`
  if (category) queryStr += `category.id=${category}&`
  if (region) queryStr += `regions.id=${region}&`

  if (sort) queryStr += `_sort=${sort}`

  return queryStr;
}

const getWhatsOn = async (casino, category, region, sort) => {
  const queryParams = buildQueryParams(casino, category, region, sort)

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whats-ons${queryParams ? `?${queryParams}` : ''}`)
    const data = await res.json()

    return data
  } catch (e) {
    console.error(e.name + ': ' + e.message)
  }
}

const getWhatsOnCategories = async () => {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
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

export { getWhatsOn, getWhatsOnCount, getWhatsOnCategories }