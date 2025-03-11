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
      <LoginBottom>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="이메일 주소"
              icon="login"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              type="password"
              placeholder="비밀번호"
              icon="password"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        {loginError && <ErrorComponent />}
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
    margin-bottom: 1rem;
  }

  & > *:nth-child(2) {
    margin-bottom: 1.4rem;
  }
`

const ErrorMessage = styled.p`
  color: #ff3333;
  font-size: 1.2rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`
