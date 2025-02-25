import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Contacts from "../pages/Contacts";

const router = createBrowserRouter([
  {
    // 루트 경로에 대한 설정
    path: "/",
    element: <App />,
    // 에러 페이지 설정
    errorElement: <ErrorPage />,
    // 자식 라우트 설정
    children: [
      {
        path: "contacts/:contactId",
        element: <Contacts />,
      },
    ],
  },
]);

export default router;
