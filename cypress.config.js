import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      // 이벤트 처리 로직
    },
    baseUrl: 'http://localhost:5173', // 애플리케이션 URL
    env: {
      TEST_EMAIL: 'admin@naver.com',
      TEST_PASSWORD: 'admin@naver.com',
    },
    // 추가 설정
  },
})
