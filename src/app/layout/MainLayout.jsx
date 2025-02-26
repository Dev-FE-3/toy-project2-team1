import styled from 'styled-components'
import Header from '@/shared/components/header/Header.jsx'
import SideMenu from '@/shared/components/sideMenu/SideMenu.jsx'
import { Outlet } from 'react-router-dom'

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  height: 100vh;
`
const MainContent = styled.main`
  width: calc(100% - 350px);
  max-height: calc(1080px - 100px);
  padding: 4rem 8rem;
`
const FlexContainer = styled.div`
  display: flex;
`

export default function MainLayout() {
  return (
    <LayoutContainer>
      <Header />
      <FlexContainer>
        <SideMenu />
        <MainContent>
          <Outlet></Outlet>
        </MainContent>
      </FlexContainer>
    </LayoutContainer>
  )
}
