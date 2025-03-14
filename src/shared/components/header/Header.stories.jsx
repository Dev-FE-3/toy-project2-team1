import Header from './Header'
import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import styled from 'styled-components'

// Redux 스토어 모킹을 위한 설정
const createMockStore = (userName = '홍길동') => {
  const userSlice = createSlice({
    name: 'user',
    initialState: {
      name: userName,
    },
    reducers: {},
  })

  return configureStore({
    reducer: {
      user: userSlice.reducer,
    },
  })
}

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    // 모든 스토리에 라우터와 리덕스 프로바이더 적용
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

// 헤더를 표시할 배경 컨테이너
const PageContainer = styled.div`
  width: 100%;
  min-height: 200px;
  background-color: #f5f5f5;
`

// 기본 템플릿
const Template = ({ userName }) => {
  const mockStore = createMockStore(userName)

  return (
    <Provider store={mockStore}>
      <PageContainer>
        <Header />
        <ContentPlaceholder>여기에 페이지 콘텐츠가 표시됩니다</ContentPlaceholder>
      </PageContainer>
    </Provider>
  )
}

const ContentPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  font-size: 1.6rem;
  color: #888;
`

export const 기본헤더 = {
  render: () => <Template userName="홍길동" />,
}

export const 긴이름사용자 = {
  render: () => <Template userName="김길동스미스존슨" />,
}

export const 짧은이름사용자 = {
  render: () => <Template userName="김" />,
}

export const 영문이름사용자 = {
  render: () => <Template userName="John Doe" />,
}

// 다양한 화면 너비에 따른 반응형 테스트를 위한 스토리
export const 다양한화면크기 = {
  parameters: {
    chromatic: { viewports: [320, 768, 1200, 1920] }, // 여러 화면 크기로 테스트
  },
  render: () => <Template userName="홍길동" />,
}
