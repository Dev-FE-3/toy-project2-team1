import * as S from './SideMenuStyled'
import MenuItem from './MenuItem'
import { MENU_LIST } from '@/constant/menuList'
import { ADMIN_MENUS } from '@/constant/menuList'
import AdminMenuIcon from '@/assets/icon-user.svg'

export default function SideMenu() {
  const isAdmin = true

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
              <S.Icon src={AdminMenuIcon} alt="관리자 메뉴 아이콘" />
              관리자 메뉴
            </S.AdminMenuWrap>
            <ul>
              {ADMIN_MENUS.map((menu) => (
                <li key={menu.path}>
                  <MenuItem {...menu} indent={true} />
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
      <S.Logout>로그아웃</S.Logout>
    </S.NavContainer>
  )
}
