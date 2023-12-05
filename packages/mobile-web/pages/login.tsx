import React, { useState } from 'react'
import { useRouter } from 'next/router'

import styles from '@style/login.module.css'

import { useLoginContext } from '@context'
import { useAxios } from '@hook'
import { ROUTES } from '@util'

const Login: React.FC = () => {
  const router = useRouter()
  const { isLoggedIn, setLoginTokenCookie } = useLoginContext()
  const { axios } = useAxios()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isLoggedIn) router.back()

  const handleLogin = async () => {
    try {
      const response = await axios.post('/auth/login', { email, password })
      const { token, expires } = response?.data || {}

      if (token) {
        setLoginTokenCookie?.(token, new Date(expires))
        router.push(ROUTES.home)
      }
    } catch (e) {
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
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
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
