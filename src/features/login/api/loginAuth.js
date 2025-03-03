import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/shared/api/firebase/firebase'

export const SignIn = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password)

  return result
}
