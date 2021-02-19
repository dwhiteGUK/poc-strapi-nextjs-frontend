const getNews = async () => {
  const res = await fetch(`${process.env.API_URL}/news-items`)
  const data = await res.json()

  return data
}

export { getNews }