import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import react from "@vitejs/plugin-react-swc";

//vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/**/*", // public 폴더 하위의 모든 파일과 폴더
          dest: "public", // dist/public에 복사
        },
      ],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5174",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
