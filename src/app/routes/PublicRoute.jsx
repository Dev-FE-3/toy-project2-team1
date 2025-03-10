import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PublicRoute({ children }) {
  const userUID = useSelector((state) => state.user.uid)

  // 이미 로그인된 사용자가 /login 요청한 경우 대시보드 페이지 이동
  if (userUID) {
    return <Navigate to="/" replace />
  }

  return children
}
