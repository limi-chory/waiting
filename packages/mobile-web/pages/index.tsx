import { useRouter } from 'next/router'
import { useEffect } from 'react'

import styles from '@style/Home.module.css'

import { useLoginContext } from '@context'
import { ROUTES } from '@util'

const Home: React.FC = () => {
  const { isLoggedIn } = useLoginContext()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) router.push(ROUTES.login)
  }, [isLoggedIn, router])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>로그인</h1>
      </header>

      <div>hi</div>

      <footer className={styles.footer}>안녕하세요</footer>
    </div>
  )
}

export default Home
