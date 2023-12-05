const LOCAL_STORAGE_TOKEN = 'auth_token'

export const setToken = (token: string) => {
  const current = new Date()
  const fourWeeksLater = new Date(current.getTime() + 28 * 24 * 60 * 60 * 1000)
  const data = {
    token,
    ttl: fourWeeksLater,
  }
  localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(data))
}

export const getToken = (): string | null => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_TOKEN)
  if (!storedData) return null

  const parsedData = JSON.parse(storedData)
  const { token, ttl } = parsedData

  const current = new Date()
  if (current > ttl) return null

  return token
}
