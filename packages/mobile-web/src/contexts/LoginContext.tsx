import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

import { useAxios, useCookies } from '@hook'

import { CookieKeys } from './types'

type LoginContextType = Partial<{
  userId: string
  loginToken: string
  isLoggedIn: boolean
  setLoginTokenCookie: (token: string, expires: Date) => void
}>

const LoginContext = createContext<LoginContextType>({})

export const LoginContextProvider = ({ children }: PropsWithChildren) => {
  const [cookies, setCookie] = useCookies([CookieKeys.LoginToken])
  const cookieLoginToken = cookies[CookieKeys.LoginToken]
  const { setAuthorization } = useAxios()

  const browser = typeof window !== 'undefined'
  const [loginToken, setLoginToken] = useState<string>(browser && cookieLoginToken)

  useEffect(() => {
    setAuthorization(loginToken)
  }, [loginToken, setAuthorization])

  const isLoggedIn = Boolean(loginToken)
  const setLoginTokenCookie = (token: string, expires: Date) => {
    setCookie(CookieKeys.LoginToken, token, { expires })
    setLoginToken(token)
  }

  return <LoginContext.Provider value={{ loginToken, isLoggedIn, setLoginTokenCookie }}>{children}</LoginContext.Provider>
}

export const useLoginContext = () => useContext(LoginContext)
