import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

createRoot(document.getElementById("root")).render(
  // 라우터 설정
  <RouterProvider router={router} />
);
