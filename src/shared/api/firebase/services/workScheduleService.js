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
  let throwOnEmpty = true

  try {
    // sessionStorage 접근이 가능한지 확인
    if (typeof sessionStorage === 'undefined') {
      throw new Error('브라우저가 sessionStorage를 지원하지 않거나 접근할 수 없습니다.')
    }

    // uid 가져오기
    // const userUid = sessionStorage.getItem('uid')
    const userUid = auth.currentUser.uid

    // uid가 유효한 형식인지 간단히 검사 (예: 빈 문자열, 공백만 있는 경우 등)
    if (typeof userUid !== 'string' || userUid.trim() === '') {
      const errorMessage = '유효하지 않은 사용자 UID 형식입니다.'
      console.error(errorMessage)

      if (throwOnEmpty) {
        throw new Error(errorMessage)
      }
      return null
    }

    return userUid
  } catch (error) {
    console.error('사용자 UID 조회 중 오류가 발생했습니다:', error)

    if (throwOnEmpty) {
      throw error
    }
    return null
  }
}

// 일정 추가
export const addWorkSchedule = async (workSchedule) => {
  const db = setDb()
  const userUid = getCurrentUserUid()

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
    const userUid = getCurrentUserUid()

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
      console.log(' getWorkScheduleByUid ~ workScheduleData: ', querySnapshot)
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
  const userUid = getCurrentUserUid()

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
  const userUid = getCurrentUserUid()

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
