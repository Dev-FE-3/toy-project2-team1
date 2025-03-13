import { styled } from 'styled-components'
import Input from '@/shared/components/input/Input'
import Button from '@/shared/components/button/Button'
import LoginLinks from './components/LoginLinks'
import { SignIn } from './api/loginAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ErrorComponent from './components/LoginError'
import { setUser } from '@/shared/redux/reducer/userSlice'
import { fetchUserData } from '@/shared/api/firebase/fetchUserData'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Zod 스키마 정의
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요' })
    .email({ message: '유효한 이메일 주소를 입력해주세요' }),
  password: z
    .string()
    .min(1, { message: '비밀번호를 입력해주세요' })
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' }),
})

// 스키마로부터 타입 추론 (TypeScript를 사용하는 경우)
// type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const [loginError, setLoginError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema), // Zod resolver 사용
    mode: 'onSubmit',
  })

  const onSubmit = async (data) => {
    try {
      const result = await SignIn(data.email, data.password)

      if (result) {
        //sessionStorege의 값으로 fetchData하여 Redux 관리
        dispatch(setUser({ data: await fetchUserData() }))
        navigate('/')
      }
    } catch (e) {
      console.log(e.code, e.message)
      setLoginError(true)
    }
  }

  return (
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
      <LoginTop>
        <Logo src="/public/images/logo.svg"></Logo>
      </LoginTop>
      <LoginFrom>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputContainer>
              <Input
                type="text"
                placeholder="이메일 주소"
                icon="login"
                value={field.value}
                onChange={field.onChange}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </InputContainer>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputContainer>
              <Input
                type="password"
                placeholder="비밀번호"
                icon="password"
                value={field.value}
                onChange={field.onChange}
              />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              {loginError && <ErrorComponent />}
            </InputContainer>
          )}
        />

        <Button type="submit" isFullWidth style={{ height: '5.6rem', fontWeight: '700' }}>
          로그인 하기
        </Button>
        <LoginLinks />
      </LoginFrom>
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
const LoginFrom = styled.div`
  display: flex;
  flex-direction: column;

  .input-container:nth-child(2) {
    margin-bottom: 3rem;
  }
`

const InputContainer = styled.div.withConfig({
  componentId: 'input-container',
})`
  position: relative;
  margin-bottom: 1.2rem;
`

const ErrorMessage = styled.p`
  position: absolute;
  display: flex;
  align-items: center;
  top: -31px;
  right: 0;
  color: var(--point-red);
  font-weight: 300;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  background: #feefef;
  border-radius: 0.6rem;

  /* 경고 아이콘을 위한 스타일 */
  &::before {
    content: '';
    display: inline-block; /* 인라인 블록으로 설정하여 크기 조정 가능 */
    width: 1.3rem; /* 아이콘의 너비 */
    height: 1.3rem; /* 아이콘의 높이 */
    background-image: url('/images/icon-caution.svg'); /* 경고 아이콘 이미지 경로 */
    background-size: contain; /* 이미지 크기를 요소에 맞게 조정 */
    background-repeat: no-repeat; /* 이미지 반복 방지 */
    margin-right: 0.5rem; /* 텍스트와 아이콘 사이의 간격 */
  }

  /* 말풍선 모양을 위한 스타일 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 85%;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: #feefef;
    border-bottom: 0;
    margin-left: -5px;
    margin-bottom: -5px;
  }
`
