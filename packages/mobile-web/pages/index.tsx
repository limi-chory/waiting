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
        <div className={styles.logo}>Waiting</div>
        <div className={styles.settings}>⚙️</div>
      </header>
      <div className={styles.listContainer}>
        <div className={styles.list}>
          {/* 리스트 아이템들을 여기에 추가 */}
          {Array.from({ length: 20 }, (_, index) => (
            <div key={index} className={styles.listItem}>
              Item {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
