const getPageContent = async (page) => {
  const res = await fetch(`${process.env.API_URL}/${page}`)
  const data = await res.json()

  return data
}

export { getPageContent }