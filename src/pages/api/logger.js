// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
  console.log('🚀 ~ file: logger.js ~ line 4 ~ handler ~ req.body', req.body)
  const body = JSON.parse(req.body)

  res.status(200).json(body)
}
