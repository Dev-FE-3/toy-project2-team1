import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NavItemStyle = `
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 1.6rem 6rem;
  background-color: var(--box-container);
  text-decoration: none;
  color: var(--font-main);
`

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  height: calc(100vh - 100px);
  padding-top: 2.2rem;
  background-color: var(--box-container);
  border-right: 1px solid #c3c3c3;

  /* 메뉴 드래그 방지 */
  user-select: none; /* Chrome, Firefox, Opera */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`

export const NavItem = styled(NavLink)`
  ${NavItemStyle}
  ${({ $indent }) => $indent && 'padding-left: 9rem;'}

  &.active, &:hover {
    background-color: var(--background-sub);
  }
`

export const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 1rem;
`

export const AdminMenuWrap = styled.div`
  ${NavItemStyle}
`

export const Logout = styled(NavLink)`
  ${NavItemStyle}
  border-top: 1px solid #c3c3c3;
`
