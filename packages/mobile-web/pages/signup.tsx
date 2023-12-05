// pages/signup.tsx

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/signup.module.css'
import axios from 'axios'
import { API_URL } from '../config'

const Signup: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [verificationLabel, setVerificationLabel] = useState<string>('확인')
  const [isVerificationCodeActivated, setIsVerificationCodeActivated] = useState<boolean>(false)
  const [isVerificationButtonDisabled, setIsVerificationButtonDisabled] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [isEmailDuplicated, setIsEmailDuplicated] = useState<boolean>(false)
  const [isVerificationCodeMatch, setIsVerificationCodeMatch] = useState<boolean>(true)
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true)
  const [isSignUpActivated, setIsSignUpActivated] = useState<boolean>(false)

  const handleSendVerificationCode = async () => {
    if (email && !isVerificationButtonDisabled) {
      try {
        setIsVerificationButtonDisabled(true)

        const response = await axios.post(`${API_URL}/auth/email-verification/${email}`)
        if (response.data) {
          setIsVerificationCodeActivated(true)
          setTimeout(() => {
            setIsVerificationButtonDisabled(false)
          }, 5000)
        }
      } catch (e) {
        console.error(e)
        setIsVerificationButtonDisabled(false)
      }
    }
  }

  const handleCheckVerificationCode = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/email-verification/${email}/${verificationCode}`)
      if (response.data) {
        setIsVerified(true)
        setIsVerificationCodeMatch(true)
        setVerificationLabel('완료')
      } else {
        setVerificationLabel('재시도')
        setIsVerificationCodeMatch(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${API_URL}/users`, { email, password, name })

      if (response?.data?.email) {
        router.push('/login')
      }
    } catch (e: any) {
      console.error(e)
      if (e?.response?.status === 409) setIsEmailDuplicated(true)
    }
  }

  useEffect(() => {
    if (isVerified && name && password && confirmPassword) {
      if (password !== confirmPassword) {
        setIsPasswordMatch(false)
        return
      } else {
        setIsPasswordMatch(true)
      }
      setIsSignUpActivated(true)
    } else setIsSignUpActivated(false)
  }, [isVerified, name, password, confirmPassword])

  return (
    <div className={styles['signup-container']}>
      <h1>회원가입</h1>
      <form>
        <div className={styles['form-group']}>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isVerified} />
          {isEmailDuplicated && <p className={styles['error-message']}>해당 이메일로 가입된 계정이 존재합니다.</p>}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="verificationCode">이메일 인증코드</label>
          <div className={styles['verification-code-input']}>
            <input type="text" id="verificationCode" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} disabled={isVerified} />
            <button
              type="button"
              className={styles['verification-code-check']}
              onClick={handleCheckVerificationCode}
              disabled={!isVerificationCodeActivated || isVerified}
            >
              {verificationLabel}
            </button>
            <button
              type="button"
              className={styles['verification-code-send']}
              onClick={handleSendVerificationCode}
              disabled={isVerified || isVerificationButtonDisabled}
            >
              인증코드 전송
            </button>
          </div>
          {!isVerificationCodeMatch && <p className={styles['error-message']}>인증코드가 일치하지 않습니다.</p>}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {!isPasswordMatch && <p className={styles['error-message']}>비밀번호가 일치하지 않습니다.</p>}
        </div>

        <button type="button" className={styles['signup-button']} onClick={handleSignup} disabled={!isSignUpActivated}>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup
