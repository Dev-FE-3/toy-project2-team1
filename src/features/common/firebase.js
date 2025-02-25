import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app); // 데이터베이스

// 파일 업로드와 URL 얻기 함수 정의
export const uploadFile = async (fileData, path) => {
  const { ref, uploadString, getDownloadURL } = await import(
    "firebase/storage"
  );
  const fileRef = ref(storage, path);
  const response = await uploadString(fileRef, fileData, "data_url");
  const url = await getDownloadURL(fileRef);

  console.log("Upload metadata:", response.metadata);

  return {
    url,
    metadata: response.metadata,
  };
};
