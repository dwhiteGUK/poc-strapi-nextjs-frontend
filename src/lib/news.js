const getNews = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news-items`)
  const data = await res.json()

  return data
}

const getNewsItem = async (id, preview = false) => {
  // check for preview mode, add required query parameter if we are in preview mode
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news-items/${id}${preview && '?_publicationState=preview'}`)
  const data = await res.json()

  return data
}

export { getNews, getNewsItem }