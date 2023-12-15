import React, { useState } from 'react'
import { useRouter } from 'next/router'

import styles from '@style/login.module.css'

import { useLoginContext } from '@context'
import { useAxios } from '@hook'
import { ROUTES } from '@util'

const Login: React.FC = () => {
  const router = useRouter()
  const { isLoggedIn, setLoginTokenCookie } = useLoginContext()
  const { api } = useAxios()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginFail, setLoginFail] = useState<boolean>(false)

  if (isLoggedIn) router.push(ROUTES.home)

  const handleLogin = async () => {
    try {
      const response = await api.auth.login({ email, password })
      const { token, expires } = (response?.data as any) || {}

      if (token) {
        setLoginTokenCookie?.(token, new Date(expires))
        router.push(ROUTES.home)
      }
    } catch (e: any) {
      if (e.error.statusCode === 401) {
        setPassword('')
        setLoginFail(true)
      }
      console.error(e)
    }
  }

  return (
    <div className={styles['login-container']}>
      <h1>Login</h1>
      <form>
        <div className={styles['form-group']}>
          <label htmlFor="email">이메일</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') handleLogin()
            }}
          />
        </div>
        {loginFail && <p className={styles['error-message']}>아이디 또는 비밀번호를 잘못 입력했습니다.</p>}
        <div className={styles['form-group']}>
          <button type="button" className={styles['login-button']} onClick={handleLogin}>
            Login
          </button>
          <button type="button" className={styles['signup-button']} onClick={() => router.push('/signup')}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
