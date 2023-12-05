// pages/login.tsx

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/login.module.css'
import { API_URL } from '../config'
import axiosInstance, { setAuthorization } from '../axiosInstance'
import { setToken } from '../authorizationToken'

const Login: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password })
      const token = response?.data?.access_token || null

      if (token) {
        setAuthorization(token)
        setToken(token)
        router.push('/dashboard')
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
        <div className={styles['remember-checkbox']}>
          <label>
            <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            로그인 정보 기억하기
          </label>
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
