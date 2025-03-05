import { getFirestore, doc, getDoc } from 'firebase/firestore'

export const fetchUserData = async () => {
  const db = getFirestore()

  const userUid = sessionStorage.getItem('uid')

  if (userUid) {
    const userRef = doc(db, 'employees', userUid)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
      console.log('User Data:', userSnap.data())
      return userSnap.data()
    } else {
      console.log('No such user data found!')
      return alert('사용자 정보가 없습니다!')
    }
  }
}
