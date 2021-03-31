const getRegions = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/regions`)
    const data = await res.json()

    return data
  } catch (e) {
    console.error(e.name + ': ' + e.message)
  }
}

export { getRegions }