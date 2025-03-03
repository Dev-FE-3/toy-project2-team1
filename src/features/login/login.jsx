import { styled } from 'styled-components'
import Input from '@/shared/components/input/Input'
import { useState } from 'react'
import Button from '@/shared/components/button/Button'
import LoginLinks from './component/LoginLinks'

export default function Login() {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const loginSubmit = (e) => {
    e.preventDefault()
    alert('로그인 로직')
  }

  return (
    <LoginForm onSubmit={loginSubmit}>
      <LoginTop>
        <Logo src="/public/images/logo.svg"></Logo>
      </LoginTop>
      <LoginBottom>
        <Input
          type="text"
          placeholder="이메일 주소"
          icon="login"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          icon="password"
          value={pw}
          onChange={(event) => setPw(event.target.value)}
        />
        <Button type="submit" isFullWidth style={{ height: '5.6rem', fontWeight: '700' }}>
          로그인 하기
        </Button>
        <LoginLinks />
      </LoginBottom>
    </LoginForm>
  )
}

const LoginForm = styled.form`
  display: flex;
  width: 38rem;
  height: 100vh;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`
const LoginTop = styled.p``

const Logo = styled.img`
  width: 23.2rem;
  height: 5.9rem;
`
const LoginBottom = styled.div`
  display: flex;
  flex-direction: column;

  & > *:nth-child(1) {
    margin-bottom: 1.2rem;
  }

  & > *:nth-child(2) {
    margin-bottom: 2rem;
  }
`
