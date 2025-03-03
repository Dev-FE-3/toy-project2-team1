import { signInWithEmailAndPassword } from 'firebase/auth'
// import { signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '@/shared/api/firebase/firebase'

export const SignIn = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password)

  return result
}

// export const signOut = () => {
//   firebaseSignOut(auth)
//     .then(() => {
//       console.log('로그아웃 성공')
//       // 여기에 로그아웃 성공 후 수행할 작업을 추가
//     })
//     .catch((error) => {
//       console.error('로그아웃 실패:', error)
//       // 여기에 로그아웃 실패 시 수행할 작업을 추가
//     })
// }
