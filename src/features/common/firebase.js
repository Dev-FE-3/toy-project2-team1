import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_API_KEY,
  authDomain: import.meta.env.REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 인증
export const db = getFirestore(app); // 데이터베이스

// Firestore 문서 추가 예시
export const addDocument = async (collectionName, data) => {
  const { collection, addDoc } = await import("firebase/firestore");
  const docRef = await addDoc(collection(db, collectionName), data);
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
};
