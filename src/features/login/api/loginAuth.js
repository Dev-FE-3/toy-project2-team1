import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/shared/api/firebase/firebase'

export const SignIn = async (email, password) => {
  try {
    // 세션 영속성 설정은 이미 firebase.js에서 완료됨
    // 로그인 진행
    const result = await signInWithEmailAndPassword(auth, email, password)

    // 앱의 다른 부분에서 sessionStorage에 의존하는 로직이 있다면
    // 아래 코드를 유지하고, 그렇지 않다면 제거 가능
    // if (result) {
    //   sessionStorage.setItem('uid', result.user.uid)
    //   sessionStorage.setItem('accessToken', result.user.accessToken)
    // }

    return result
  } catch (error) {
    console.error('로그인 중 오류 발생:', error)
    throw error
  }
}
