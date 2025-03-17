import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function LoginLinks() {
  return (
    <LoginLinkUl>
      <LoginLinkLi>
        <Link to="#">비밀번호 찾기</Link>
      </LoginLinkLi>
    </LoginLinkUl>
  )
}

const LoginLinkUl = styled.ul`
  margin-top: 2rem;
  text-align: center;
`

const LoginLinkLi = styled.li`
  color: #c3c3c3;
  font-weight: 700;

  a {
    text-decoration: none;
    color: inherit;
  }
`
