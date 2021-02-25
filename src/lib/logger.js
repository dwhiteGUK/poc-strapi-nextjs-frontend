const logger = async (args) => {
  console.log('🚀 ~ file: logger.js ~ line 2 ~ logger ~ args', args)
  const res = await fetch(`${process.env.HOSTNAME}/api/logger`, {
    method: 'POST',
    body: JSON.stringify(args)
  })

  if (res.status === 200) {
    const data = await res.json()

    return JSON.stringify(data)
  } else {
    return ''
  }
}

export { logger }