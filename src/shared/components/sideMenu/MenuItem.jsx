import * as S from './SideMenuStyled'

export default function MenuItem({ icon, label, path, indent = false }) {
  return (
    <S.NavItem to={path} className={indent ? 'sub-menu' : ''}>
      <S.Icon src={icon} alt={`${label} 아이콘`} />
      {label}
    </S.NavItem>
  )
}
