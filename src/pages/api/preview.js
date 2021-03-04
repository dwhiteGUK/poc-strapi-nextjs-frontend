import { getNewsItem } from '~/lib/news'

export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.STRAPI_PREVIEW_SECRET ||
    !req.query.id
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // // check that article exists
  // const item = await getNewsItem(req.query.id, true)

  // // If the article doesn't exist prevent preview mode from being enabled
  // if (!item) {
  //   return res.status(404).json({ message: 'Page not found' })
  // }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(307, `/news/${req.query.id}`)
}
