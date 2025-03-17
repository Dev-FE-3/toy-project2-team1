import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/shared/api/firebase/firebase'

export const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
}
