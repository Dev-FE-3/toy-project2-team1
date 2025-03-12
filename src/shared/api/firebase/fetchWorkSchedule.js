import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { auth } from './firebase'

export const fetchWorkSchedule = async () => {
  const db = getFirestore()
  // const userUid = sessionStorage.getItem('uid')
  const userUid = auth.currentUser.uid

  if (!userUid) {
    console.error('User UID not found')
    return []
  }

  const workScheduleRef = collection(db, 'workSchedule')
  const q = query(workScheduleRef, where('uid', '==', userUid))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const workScheduleData = querySnapshot.docs.map((doc) => doc.data())
    console.log(' fetchWorkSchedule ~ workScheduleData: ', workScheduleData)
    return workScheduleData
  } else {
    console.log('No work schedule found')
    return []
  }
}
