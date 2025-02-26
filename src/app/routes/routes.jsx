import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '@/app/layout/AuthLayout'
import MainLayout from '@/app/layout/MainLayout'
import Login from '@/features/common/login/Login'
import Home from '@/features/users/home/Home'
import WorkSchedule from '@/features/users/work-schedule/WorkSchedule'
import PayStub from '@/features/users/pay-stub/PayStub'
import MyDocument from '@/features/users/my-document/MyDocument'
import Approval from '@/features/admin/approval/Approval'
import PayStubManagement from '@/features/admin/pay-stub-management/PayStubManagement'
import Sample from '@/features/Sample'

const router = createBrowserRouter([
  // 인증 필요없는 라우트 (로그인,회원가입)
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },

  // 인증이 필요한 라우트 (로그인 후 접속가능)
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'work-schedule',
        element: <WorkSchedule />,
      },
      {
        path: 'pay-stub',
        element: <PayStub />,
      },
      {
        path: 'my-document',
        element: <MyDocument />,
      },
      {
        path: 'admin/',
        children: [
          {
            path: 'approval',
            element: <Approval />,
          },
          {
            path: 'pay-stub-management',
            element: <PayStubManagement />,
          },
        ],
      },
    ],
  },

  // 샘플 페이지
  {
    path: '/sample',
    element: <Sample />,
  },
])

export default router
