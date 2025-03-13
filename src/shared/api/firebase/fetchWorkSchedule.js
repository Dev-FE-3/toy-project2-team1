import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { auth } from './firebase'

export const fetchWorkSchedule = async () => {
  const db = getFirestore()
  // const userUid = sessionStorage.getItem('uid')
  const userUid = auth.currentUser.uid

  if (!userUid) {
    console.error('사용자 UID를 찾을 수 없습니다.')
    return []
  }

  const workScheduleRef = collection(db, 'workSchedule')
  const q = query(workScheduleRef, where('uid', '==', userUid))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const workScheduleData = querySnapshot.docs.map((doc) => doc.data())
    return workScheduleData
  } else {
    console.log('일정을 찾을 수 없습니다.')
    return []
  }
}
