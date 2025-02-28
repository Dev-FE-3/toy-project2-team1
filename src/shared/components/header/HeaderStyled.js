import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Header = styled.header`
  width: 100vw;
  height: 80px;
  background-color: var(--box-container);
  border-bottom: 1px solid #c3c3c3;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  height: 100%;
  padding: 1.6rem 4rem;
`

export const Logo = styled(NavLink)`
  width: 140px;
  height: 36px;
  background: url('/public/images/logo.svg') center center no-repeat;
  border: none;
`

export const Greeting = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1.8rem;
`

export const UserName = styled.p`
  font-weight: 700;
`

export const GreetingIcon = styled.img`
  width: 20px;
  height: 20px;
`
