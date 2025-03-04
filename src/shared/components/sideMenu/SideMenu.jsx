import * as S from './SideMenuStyled'
import MenuItem from './MenuItem'
import { MENU_LIST } from '@/shared/constants/menu/menuList'
import { ADMIN_MENUS } from '@/shared/constants/menu/menuList'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchUserData } from '../../api/firebase/fetchUserData'

export default function SideMenu() {
  const navigate = useNavigate()
  const [isAdmin, setAdmin] = useState(false)

  const logout = () => {
    const auth = getAuth()

    const logout = async () => {
      await signOut(auth)
      console.log('사용자가 로그아웃했습니다.')
    }

    logout()
    sessionStorage.clear()
    navigate('/login')
  }

  useEffect(() => {
    async function fetchAndSetUser() {
      const user = await fetchUserData()
      if (user.role) setAdmin(true)
    }
    fetchAndSetUser()
  }, [])

  return (
    <S.NavContainer>
      <ul>
        {/* 사용자 메뉴 */}
        {MENU_LIST.map((item) => (
          <li key={item.path}>
            <MenuItem {...item} />
          </li>
        ))}
        {/* 관리자 메뉴 */}
        {isAdmin && (
          <li>
            <S.AdminMenuWrap>
              <S.Icon src="/public/images/icon-user.svg" alt="관리자 메뉴 아이콘" />
              관리자 메뉴
            </S.AdminMenuWrap>
            <ul>
              {ADMIN_MENUS.map((item) => (
                <li key={item.path}>
                  <MenuItem {...item} indent={true} />
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
      <S.Logout onClick={logout}>로그아웃</S.Logout>
    </S.NavContainer>
  )
}
