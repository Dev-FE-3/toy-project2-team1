import * as S from './SideMenuStyled'
import MenuItem from './MenuItem'
import { MENU_LIST } from '@/shared/constants/menu/menuList'
import { ADMIN_MENUS } from '@/shared/constants/menu/menuList'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
<<<<<<< Updated upstream
import { resetState } from '../../redux/store'
=======
import { initialize } from '@/shared/redux/reducer/userSlice'
>>>>>>> Stashed changes

export default function SideMenu() {
  const navigate = useNavigate()
  const isAdmin = useSelector((state) => state.user.role)
  const dispatch = useDispatch()

  const logout = () => {
    const auth = getAuth()

    const logout = async () => {
      await signOut(auth)
    }

    logout()
    dispatch(resetState())
    sessionStorage.clear()
<<<<<<< Updated upstream
=======
    dispatch(initialize())
>>>>>>> Stashed changes
    navigate('/login')
  }

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
