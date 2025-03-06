import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'

export const fetchUserData = async () => {
  const db = getFirestore()

  const userUid = sessionStorage.getItem('uid')

  if (userUid) {
    const employeesRef = collection(db, 'employees')
    const q = query(employeesRef, where('uid', '==', userUid))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data()
      console.log('User Data:', userData)
      return userData
    } else {
      console.log('No such user data found!')
      return null
    }
  }
}
