import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import styles from '@style/Home.module.css'

import { useLoginContext } from '@context'
import { ROUTES } from '@util'
import { ModalPopup, MySettings } from '@component'
import { useAxios } from '@hook'
import { UserResponseDto } from '@api-type'

const Home: React.FC = () => {
  const { me, isLoggedIn } = useLoginContext()
  const router = useRouter()
  const { api } = useAxios()

  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false)
  const [teamMates, setTeamMates] = useState<any>({})

  const fetchTeammates = async () => {
    try {
      const response = (await api.teams.getTeammates()) as any
      setTeamMates(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchTeammates()
  }, [me])

  useEffect(() => {
    if (!isLoggedIn) router.push(ROUTES.login)
  }, [isLoggedIn, router])

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>Waiting</div>
        <div className={styles.settings} onClick={() => setIsSettingOpen(true)}>
          ⚙️
        </div>
      </header>
      <div className={styles.container}>
        <ModalPopup isOpen={isSettingOpen} onClose={() => setIsSettingOpen(false)}>
          <MySettings onClose={() => setIsSettingOpen(false)} />
        </ModalPopup>
        {Object.entries(teamMates)?.map(([teamName, teammates]) => {
          return (
            <div key={teamName} className={styles.listContainer}>
              {teamName}
              <div className={styles.list}>
                {(teammates as UserResponseDto[])?.map((user) => (
                  <div key={user.id} className={styles.listItem}>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
        {!Object.keys(teamMates).length && (
          <>
            <div className={styles.listContainer}>소속된 팀이 없습니다.</div>
            <div className={styles.listContainer}>내 설정에서 팀 설정을 해주세요.</div>
          </>
        )}
      </div>
    </>
  )
}

export default Home
