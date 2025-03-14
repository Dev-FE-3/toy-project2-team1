import SideMenu from './SideMenu'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import styled from 'styled-components'

// Redux store 모킹
const createMockStore = (isAdmin = false) => {
  // Redux Toolkit을 사용한 스토어 생성
  const userSlice = createSlice({
    name: 'user',
    initialState: {
      name: '홍길동',
      role: isAdmin,
    },
    reducers: {},
  })

  // 필요한 resetState 액션 추가
  const resetStateAction = createSlice({
    name: 'global',
    initialState: {},
    reducers: {
      resetState: () => {},
    },
  })

  return configureStore({
    reducer: {
      user: userSlice.reducer,
      global: resetStateAction.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

// 실제 모듈 대신 스토리북에서만 사용할 모듈을 생성
// 실제 코드는 변경하지 않고 스토리북 환경에서만 적용됨
// Firebase와 Router 모킹
const MockProviders = ({ children, isAdmin = false }) => {
  const mockStore = createMockStore(isAdmin)

  // resetState 액션을 스토어에 주입
  mockStore.dispatch = mockStore.dispatch || (() => {})

  return (
    <Provider store={mockStore}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  )
}

export default {
  title: 'Components/SideMenu',
  component: SideMenu,
  parameters: {
    layout: 'centered',
    // Firebase와 외부 의존성 관련 경고 억제
    docs: {
      description: {
        component: '사이드 메뉴 컴포넌트 - 스토리북에서는 Firebase 연동이 비활성화됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <MockProviders isAdmin={context.args.isAdmin}>
        <Story />
      </MockProviders>
    ),
  ],
}

// 사이드메뉴 컨테이너 스타일
const SideMenuContainer = styled.div`
  height: 600px;
  width: 240px;
  background-color: var(--main);
  border-radius: 12px;
  overflow: auto;
`

// 앱 레이아웃 시뮬레이션을 위한 컴포넌트
const AppLayout = styled.div`
  display: flex;
  width: 800px;
  height: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
`

// 기본 스토리
export const 일반사용자메뉴 = {
  args: {
    isAdmin: false,
  },
  render: (args) => (
    <SideMenuContainer>
      <SideMenu />
    </SideMenuContainer>
  ),
}

export const 관리자메뉴 = {
  args: {
    isAdmin: true,
  },
  render: (args) => (
    <SideMenuContainer>
      <SideMenu />
    </SideMenuContainer>
  ),
}

export const 앱레이아웃에서의사이드메뉴 = {
  args: {
    isAdmin: true,
  },
  render: (args) => (
    <AppLayout>
      <SideMenuContainer>
        <SideMenu />
      </SideMenuContainer>
      <MainContent>메인 콘텐츠 영역 - 관리자 메뉴 표시 중</MainContent>
    </AppLayout>
  ),
}

export const 모바일화면 = {
  args: {
    isAdmin: false,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: (args) => (
    <SideMenuContainer>
      <SideMenu />
    </SideMenuContainer>
  ),
}

export const 태블릿화면 = {
  args: {
    isAdmin: true,
  },
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
  render: (args) => (
    <SideMenuContainer>
      <SideMenu />
    </SideMenuContainer>
  ),
}
