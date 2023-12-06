import axios, { Axios } from 'axios'

import { API_URL } from '../../config'
import { Api, ApiConfig, RequestParams } from '../../__generated__/Api'

const axiosInstance = axios.create({ baseURL: API_URL })

type UseAxios = {
  axios: Axios
  api: Api<string>
  setAuthorization: (token: string) => void
}

const ApiConfig: ApiConfig<string> = {
  baseUrl: API_URL,
  baseApiParams: { secure: true, format: 'json' },
  securityWorker: (token: string | null): RequestParams =>
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {},
}

const api = new Api(ApiConfig)

export const useAxios = (): UseAxios => {
  const setAuthorization = (token: string) => {
    api.setSecurityData(token)
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
    api,
    setAuthorization,
  }
}
