import { useState } from "react"
import { signIn, signOut } from "./firebaseAuth"

const AuthTest = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = () => {
    signIn(email, password)
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>로그인</button>
      <button onClick={handleSignOut}>로그아웃</button>
    </div>
  )
}

export default AuthTest