import { Navigate } from 'react-router-dom'

export default function PublicRoute({ children }) {
  // 이미 로그인된 사용자가 /login 요청한 경우 대시보드 페이지 이동
  if (sessionStorage.getItem('accessToken')) {
    return <Navigate to="/" replace />
  }

  return children
}
