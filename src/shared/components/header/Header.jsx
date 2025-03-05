import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
  const userName = useSelector((state) => state.user.name)

  return (
    <StyledHeader>
      <Wrapper>
        <Logo to="/" />
        <Greeting>
          안녕하세요, <UserName>{userName}</UserName>님
          <GreetingIcon src="/public/images/icon-smile.svg" />
        </Greeting>
      </Wrapper>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  width: 100vw;
  height: 80px;
  background-color: var(--box-container);
  border-bottom: 1px solid #c3c3c3;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  height: 100%;
  padding: 1.6rem 4rem;
`

const Logo = styled(NavLink)`
  width: 140px;
  height: 36px;
  background: url('/public/images/logo.svg') center center no-repeat;
  border: none;
`

const Greeting = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1.8rem;
`

const UserName = styled.p`
  font-weight: 700;
`

const GreetingIcon = styled.img`
  width: 20px;
  height: 20px;
`
