import { initializeApp } from 'firebase/app'
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app) // 인증

// 세션 스토리지 영속성 설정
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // console.log('Firebase 인증: 세션 스토리지 영속성 설정 완료', auth, browserSessionPersistence)
  })
  .catch((error) => {
    console.error('Firebase 인증: 영속성 설정 실패', error)
  })

export const db = getFirestore(app) // 데이터베이스
