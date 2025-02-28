import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from './firebase'

export const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // 로그인 성공
      const user = userCredential.user
      console.log('로그인 성공:', user)
      // 여기에 로그인 성공 후 수행할 작업을 추가
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error('로그인 실패:', errorCode, errorMessage)
      // 여기에 로그인 실패 시 수행할 작업을 추가
    })
}

export const signOut = () => {
  firebaseSignOut(auth)
    .then(() => {
      console.log('로그아웃 성공')
      // 여기에 로그아웃 성공 후 수행할 작업을 추가
    })
    .catch((error) => {
      console.error('로그아웃 실패:', error)
      // 여기에 로그아웃 실패 시 수행할 작업을 추가
    })
}