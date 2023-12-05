import axios from 'axios'
import { API_URL } from './config'
import { getToken } from './authorizationToken'

const axiosInstance = axios.create({
  baseURL: API_URL,
})

export const setAuthorization = (token: string) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}

if (typeof window !== 'undefined') {
  const token = getToken()

  if (token) setAuthorization(token)
}

export default axiosInstance
