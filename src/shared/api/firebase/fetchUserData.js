import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { auth } from './firebase'

export const fetchUserData = async () => {
  const db = getFirestore()

  // const userUid = sessionStorage.getItem('uid')
  const userUid = auth.currentUser.uid

  if (userUid) {
    const employeesRef = collection(db, 'employees')
    const q = query(employeesRef, where('uid', '==', userUid))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data()
      return userData
    } else {
      console.log('유저 정보가 없습니다!')
      return null
    }
  }
}
