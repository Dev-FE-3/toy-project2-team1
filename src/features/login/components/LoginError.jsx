import { styled } from 'styled-components'

const Error = styled.div`
  position: absolute;
  bottom: -2rem;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: var(--point-red);
`

export default function LoginError() {
  return <Error>사용자 정보가 맞지 않습니다. 다시 한번 확인해 주세요.</Error>
}
