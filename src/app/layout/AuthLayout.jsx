import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const LayoutContainer = styled.div`
  height: 100vh;
  background-color: var(--box-container);
`

export default function AuthLayout() {
  return (
    <LayoutContainer>
      <Outlet></Outlet>
    </LayoutContainer>
  )
}
