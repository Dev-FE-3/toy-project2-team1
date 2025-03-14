import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const location = useLocation() // 요청받은 경로 (로그인 성공 후 해당 페이지로 이동 할 수 있음)
  const userUID = useSelector((state) => state.user.uid)

  if (!userUID) {
    // replace : 현재 페이지를 히스토리 스택에서 새로운 페이지로 대체
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
