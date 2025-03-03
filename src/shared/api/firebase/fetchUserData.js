import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export const fetchUserData = async () => {
  const db = getFirestore()
  const auth = getAuth()

  const user = auth.currentUser
  if (user) {
    const userRef = doc(db, 'employees', user.uid)
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
