import {
  getFirestore,
  collection,
  doc,
  query,
  where,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { getApp } from 'firebase/app'
import { auth } from '../firebase'
// 데이터베이스를 안전하게 가져오는 함수
const setDb = () => {
  try {
    // Firebase 앱이 초기화되었는지 확인
    getApp()

    // Firestore 인스턴스 가져오기
    const db = getFirestore()

    if (!db) {
      throw new Error('Firestore 인스턴스를 가져올 수 없습니다.')
    }

    return db
  } catch (error) {
    // Firebase 초기화 오류인 경우
    if (error.code === 'app/no-app') {
      console.error('Firebase가 초기화되지 않았습니다. Firebase 초기화를 먼저 수행해주세요.')
      throw new Error(
        'Firebase 초기화 오류: 애플리케이션이 시작되기 전에 Firebase를 초기화해야 합니다.',
      )
    }

    // 다른 오류인 경우
    console.error('Firestore 데이터베이스 접근 오류:', error)
    throw new Error(`Firestore 데이터베이스에 접근할 수 없습니다: ${error.message}`)
  }
}

const getCurrentUserUid = () => {
  return new Promise((resolve, reject) => {
    // 현재 인증 상태 확인
    const currentUser = auth.currentUser

    if (currentUser) {
      // 사용자가 이미 로그인되어 있으면 즉시 UID 반환
      resolve(currentUser.uid)
    } else {
      // 사용자 로그인 상태 변경 감지 (한 번만 실행)
      const unsubscribe = auth.onAuthStateChanged(
        (user) => {
          unsubscribe() // 리스너 해제

          if (user) {
            resolve(user.uid)
          } else {
            reject(new Error('사용자가 로그인되어 있지 않습니다.'))
          }
        },
        (error) => {
          reject(error)
        },
      )

      // 타임아웃 설정 (5초)
      setTimeout(() => {
        unsubscribe()
        reject(new Error('인증 상태 확인 시간이 초과되었습니다.'))
      }, 5000)
    }
  })
}

// 일정 추가
export const addWorkSchedule = async (workSchedule) => {
  const db = await setDb()
  const userUid = await getCurrentUserUid()

  if (userUid) {
    const workScheduleRef = collection(db, 'workSchedule')
    const docRef = await addDoc(workScheduleRef, workSchedule)
    return docRef
  } else {
    console.error('User UID not found')
  }
}

// 일정 목록 조회
export const getWorkScheduleByUid = async () => {
  try {
    const db = setDb()
    const userUid = await getCurrentUserUid()

    if (!userUid) {
      console.error('User UID not found')
      return []
    }

    const workScheduleRef = collection(db, 'workSchedule')
    const q = query(workScheduleRef, where('uid', '==', userUid))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log('No work schedule found')
      return []
    } else {
      // 일정 목록 추출 후 반환
      const workScheduleData = querySnapshot.docs.map((doc) => {
        return {
          docId: doc.id,
          ...doc.data(),
        }
      })
      return workScheduleData
    }
  } catch (error) {
    console.error('작업 일정 조회 실패:', error)
    throw error
  }
}

// 일정 수정
export const updateWorkSchedule = async (workSchedule) => {
  const db = setDb()
  const userUid = await getCurrentUserUid()

  if (!userUid) {
    console.error('User UID not found')
    return []
  }

  // docId로 일정 참조
  const workScheduleRef = doc(db, 'workSchedule', workSchedule.editEventId)
  const docRefSnapshot = await getDoc(workScheduleRef)

  if (docRefSnapshot.exists()) {
    // updateDoc는 반환값 없음
    await updateDoc(workScheduleRef, workSchedule.editEventData)
    console.log('일정 수정 성공')
  } else {
    console.error('일정 수정 실패: 일정을 찾을 수 없습니다.')
  }
}

// 일정 삭제
export const deleteWorkSchedule = async (docId) => {
  const db = setDb()
  const userUid = await getCurrentUserUid()

  if (!userUid) {
    console.error('User UID not found')
    return []
  }

  // docId로 일정 참조
  const workScheduleRef = doc(db, 'workSchedule', docId)
  const docRefSnapshot = await getDoc(workScheduleRef)

  if (docRefSnapshot.exists()) {
    await deleteDoc(workScheduleRef)
    console.log('일정 삭제 성공')
  } else {
    console.error('일정 삭제 실패: 일정을 찾을 수 없습니다.')
  }
}
