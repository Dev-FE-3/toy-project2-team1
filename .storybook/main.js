/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config) => {
    // 경로 별칭 설정
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '/src',
    }

    // JSX 옵션
    config.esbuild = {
      ...config.esbuild,
      jsxInject: `import React from 'react'`,
    }

    return config
  },
}
export default config
