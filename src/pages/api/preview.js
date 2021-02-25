export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.STRAPI_PREVIEW_SECRET ||
    !req.query.id
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  console.log('🚀 ~ file: preview.js ~ line 6 ~ req.query.secret !== process.env.STRAPI_PREVIEW_SECRET', req.query.secret, process.env.STRAPI_PREVIEW_SECRET)

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(307, `/news/${req.query.id}`)
}
