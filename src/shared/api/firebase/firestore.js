import { collection, addDoc, getDoc, getDocs, doc, query, where } from 'firebase/firestore'
import { db } from './firebase'

// Create (문서 추가)
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data)
    return docRef.id
  } catch (e) {
    throw e
  }
}

// Read (단일 문서 읽기)
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return null
    }
  } catch (e) {
    throw e
  }
}

// Read (특정 조건에 맞는 문서 읽어오기)
export const getDocumentsWithCondition = async (collectionName, fieldName, condition, value) => {
  try {
    const q = query(collection(db, collectionName), where(fieldName, condition, value))
    const querySnapshot = await getDocs(q)
    const documents = []
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() })
    })
    return documents
  } catch (e) {
    throw e
  }
}

// Read (컬렉션 전체 읽기)
export const getCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName))
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    throw e
  }
}
