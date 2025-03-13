import { collection, addDoc, getDoc, getDocs, doc, query, where } from "firebase/firestore";
import { db } from "./firebase";

// Create (문서 추가)
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (e) {
    console.error("문서 추가 중 오류 발생: ", e);
    throw e;
  }
};

// Read (단일 문서 읽기)
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("해당 문서가 존재하지 않습니다.");
      return null;
    }
  } catch (e) {
    console.error("문서 가져오기 중 오류 발생: ", e);
    throw e;
  }
};

// Read (특정 조건에 맞는 문서 읽어오기)
export const getDocumentsWithCondition = async (collectionName, fieldName, condition, value) => {
  try {
    const q = query(collection(db, collectionName), where(fieldName, condition, value));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents
  } catch (e) {
    console.error('조건에 맞는 문서 가져오기 중 오류 발생:', e);
    throw e;
  }
}

// Read (컬렉션 전체 읽기)
export const getCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("컬렉션 가져오기 중 오류 발생: ", e);
    throw e;
  }
};

// 사용 예시
/*
import { addDocument, getDocument, updateDocument, deleteDocument } from './firestoreService';

// 문서 추가
const addUser = async () => {
  try {
    const docId = await addDocument('users', { name: 'John', age: 30 });
    console.log('Added document with ID: ', docId);
  } catch (error) {
    console.error('Error: ', error);
  }
};

// 문서 읽기
const getUser = async (docId) => {
  try {
    const data = await getDocument('users', docId);
    console.log('Document data: ', data);
  } catch (error) {
    console.error('Error: ', error);
  }
};
*/
