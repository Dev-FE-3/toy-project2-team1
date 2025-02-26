import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const signIn = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // 로그인 성공
      const user = userCredential.user;
      console.log("로그인 성공:", user);
      // 여기에 로그인 성공 후 수행할 작업을 추가
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("로그인 실패:", errorCode, errorMessage);
      // 여기에 로그인 실패 시 수행할 작업을 추가
    });
};

// 사용 예시
/*
const handleLogin = () => {
  const email = "user@example.com"; // 실제 사용 시 사용자 입력값으로 대체
  const password = "password123"; // 실제 사용 시 사용자 입력값으로 대체
  signIn(email, password);
};
*/
