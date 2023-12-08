import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import styles from '@style/Home.module.css'

import { useLoginContext } from '@context'
import { ROUTES } from '@util'
import { ModalPopup, MySettings } from '@component'
import { useAxios } from '@hook'

import { UserResponseDto } from '../__generated__/Api'

const Home: React.FC = () => {
  const { isLoggedIn } = useLoginContext()
  const router = useRouter()
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false)
  const { api } = useAxios()
  const [me, setMe] = useState<UserResponseDto | null>()
  const [callMeCompleted, setCallMeCompleted] = useState<boolean>(false)

  useEffect(() => {
    if (!isLoggedIn) router.push(ROUTES.login)
  }, [isLoggedIn, router])

  const fetchMe = async () => {
    try {
      const response = await api.me.getMe()

      if (!response.ok) {
        setCallMeCompleted(false)
        return
      }

      const data = response.data as any
      if (data?.me) {
        setMe(data.me)
        setCallMeCompleted(true)
        console.log(me)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchMe()
  }, [callMeCompleted])

  return (
    <div className={styles.container}>
      <ModalPopup isOpen={isSettingOpen} onClose={() => setIsSettingOpen(false)}>
        <MySettings me={me} />
      </ModalPopup>
      <header className={styles.header}>
        <div className={styles.logo}>Waiting</div>
        <div className={styles.settings} onClick={() => setIsSettingOpen(true)}>
          ⚙️
        </div>
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
