import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/shared/api/firebase/firebase'

export const SignIn = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)

    return result
  } catch (error) {
    throw error
  }
}
