import axios, { Axios } from 'axios'

import { API_URL } from '../../config'

const axiosInstance = axios.create({ baseURL: API_URL })

type UseAxios = {
  axios: Axios
  setAuthorization: (token: string) => void
}

export const useAxios = (): UseAxios => {
  const setAuthorization = (token: string) => {
    axiosInstance.interceptors.request.use(
      (config) => {
        const configWithAuth = {
          ...config,
        }
        configWithAuth.headers['Authorization'] = `Bearer ${token}`
        return configWithAuth
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  return {
    axios: axiosInstance,
    setAuthorization,
  }
}
