const getWhatsOn = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whats-ons`)
    const data = await res.json()

    return data
  } catch (e) {
    console.error(e.name + ': ' + e.message)
  }
}

const getWhatsOnCount = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whats-ons/count`)
    const data = await res.text()

    return data
  } catch (e) {
    console.error(e.name + ': ' + e.message)
  }
}

export { getWhatsOn, getWhatsOnCount }