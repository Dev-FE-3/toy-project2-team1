import GlobalStyle from '../src/shared/styles/global.js'

const preview = {
  // 스토리북 파라미터 설정
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' }, // 액션 파라미터 설정
    controls: {
      // 컨트롤 파라미터 설정
      matchers: {
        color: /(background|color)$/i, // 색상 파라미터 설정
        date: /Date$/, // 날짜 파라미터 설정
      },
    },
  },
  // 스토리북 데코레이터 설정
  decorators: [
    (Story) => (
      <>
        {/* 전역 스타일 적용 */}
        <GlobalStyle />
        {/* 스토리 렌더링 */}
        <Story />
      </>
    ),
  ],
}

export default preview
