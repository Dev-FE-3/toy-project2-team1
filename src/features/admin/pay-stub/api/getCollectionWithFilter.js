import { db } from '@/shared/api/firebase/firebase'
import { getDocs, collection, query, where } from 'firebase/firestore'

export const getCollectionWithFilter = async (collectionName, payDate) => {
  try {
    const q = query(collection(db, collectionName), where('payDate', '==', payDate))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    console.error('컬렉션 가져오기 중 오류 발생: ', e)
    throw e
  }
}
