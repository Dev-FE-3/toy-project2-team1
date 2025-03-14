import styled from 'styled-components'

export default function LoginLinks() {
  return (
    <LoginLinkUl>
      <LoginLinkLi>
        <a href="">비밀번호 찾기</a>
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
    text-decoration: none; /* 밑줄 제거 */
    color: inherit; /* 부모(li)와 동일한 색상 유지 */
  }
`
