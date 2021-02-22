const getNews = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news-items`)
  const data = await res.json()

  return data
}

const getNewsItem = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news-items/${id}`)
  const data = await res.json()

  return data
}

export { getNews, getNewsItem }