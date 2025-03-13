import { db } from '@/shared/api/firebase/firebase'
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

export const getCollectionWithFilter = async (collectionName, payDate) => {
  try {
    const q = query(collection(db, collectionName), where('payDate', '==', payDate))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    throw e
  }
}

export const upsertDocumentsForUsers = async (users) => {
  if (!Array.isArray(users) || users.length === 0) {
    return null
  }

  try {
    const updatePromises = users.map(async (user) => {
      const { id: documentId, ...userInfo } = user

      if (!documentId || !userInfo) {
        return
      }

      const docRef = doc(db, 'payrollManagement', documentId) // 특정 문서 ID 참조
      const docSnap = await getDoc(docRef) // 문서 존재 여부 확인

      if (docSnap.exists()) {
        // 🔹 문서가 이미 존재하면 업데이트
        await updateDoc(docRef, { ...userInfo, merge: true })
      } else {
        // 🔹 문서가 없으면 새로 생성
        await setDoc(docRef, userInfo)
      }
    })

    return await Promise.all(updatePromises) // 병렬 실행 최적화
  } catch (error) {
    return error
  }
}
