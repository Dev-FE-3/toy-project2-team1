import Input from '@/shared/components/input/Input'
import { useState } from 'react'

function InputGuide() {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const handleId = (value) => {
    setId(value)
  }

  const handlePw = (value) => {
    setPw(value)
  }

  return (
    <>
      <Input
        type="text"
        placeholder="이메일 주소"
        icon="login"
        value={id}
        onValueChange={handleId}
      ></Input>
      <Input
        type="password"
        placeholder="비밀번호"
        icon=""
        value={pw}
        onValueChange={handlePw}
      ></Input>
    </>
  )
}

export default InputGuide
