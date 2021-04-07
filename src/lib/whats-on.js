function buildQueryParams(casino, category, region, sort) {
  let queryStr = ''

  console.log('🚀 ~ file: whats-on.js ~ line 2 ~ buildQueryParams ~ category', category)
  if (casino) queryStr += `casinos.id=${casino}&`
  if (category) queryStr += `whats_on_category.id=${category}&`
  if (region) queryStr += `regions.id=${region}&`

  if (sort) queryStr += `_sort=${sort}`

  return queryStr;
}

const getWhatsOn = async (casino, category, region, sort) => {
  const queryParams = buildQueryParams(casino, category, region, sort)

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whats-on${queryParams ? `?${queryParams}` : ''}`)
    const data = await res.json()

    return data
  } catch (e) {
    console.error(e.name + ': ' + e.message)
  }
}

const getWhatsOnCategories = async () => {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whats-on-categories`)
    const data = await res.json()

    return data
  } catch (e) {
    console.error(e.name + ': ' + e.message)
  }
}

const getWhatsOnCount = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whats-on/count`)
    const data = await res.text()

    return data
  } catch (e) {
    console.error(e.name + ': ' + e.message)
  }
}

export { getWhatsOn, getWhatsOnCount, getWhatsOnCategories }