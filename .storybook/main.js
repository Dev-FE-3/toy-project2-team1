const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'], // 스토리 파일 경로
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-themes'], // 애드온 설정
  framework: {
    name: '@storybook/react-vite', // 프레임워크 설정
    options: {},
  },
  docs: {
    autodocs: 'tag', // 자동 문서화 설정
  },
  viteFinal: (config) => {
    // 경로 별칭 설정
    // 플젝에 절대 경로를 설정 시 추가하지 않으면 오류가 발생하기때문에 꼭 추가해야 함
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '/src',
    }

    // JSX 옵션
    // xxx.stories.jsx 파일을 사용할 경우 추가하는 옵션
    config.esbuild = {
      ...config.esbuild,
      jsxInject: `import React from 'react'`,
    }

    return config
  },
}
export default config
