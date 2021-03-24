const getCasinos = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casinos`)
    const data = await res.json()

    return data
  } catch (e) {
    console.error(e.name + ': ' + e.message)
  }
}

const getCasinosItem = async (id, preview = false) => {
  try {
    // check for preview mode, add required query parameter if we are in preview mode
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casinos/${id}${preview ? '?_publicationState=preview' : ''}`)

    if (res.status !== 200) {
      throw new Error('Error retrieving news item')
    }

    const data = await res.json()

    return data
  } catch (e) {
    console.error(e.name + ': ' + e.message)
  }
}
export { getCasinos, getCasinosItem }