import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const router = useRouter()

  // useEffect를 사용하여 컴포넌트가 마운트되었을 때 로그인 여부를 확인
  useEffect(() => {
    // 로그인 여부를 확인하는 로직이나 상태 관리를 사용하시면 됩니다.
    const isLoggedIn = true // 예시로 항상 로그인된 상태로 가정

    // 만약 로그인되어 있지 않다면 로그인 페이지로 리다이렉트
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [])

  return (
    <div>
      <h1>대시보드</h1>
      <p>로그인되었습니다!</p>
      {/* 대시보드 컨텐츠를 추가할 수 있습니다. */}
    </div>
  )
}

export default Dashboard
