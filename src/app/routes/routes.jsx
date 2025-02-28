import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '@/app/layout/AuthLayout'
import MainLayout from '@/app/layout/MainLayout'
import Login from '@/features/login/Login'
import Home from '@/features/home/Home'
import WorkSchedule from '@/features/work-schedule/WorkSchedule'
import PayStub from '@/features/pay-stub/PayStub'
import MyDocument from '@/features/my-document/MyDocument'
import Approval from '@/features/admin/approval/Approval'
import PayStubManagement from '@/features/admin/pay-stub-management/PayStubManagement'
import DesignGuide from '@/features/design-guide/DesignGuide'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import ErrorPage from '@/features/error/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      // 인증 필요없는 라우트 (로그인,회원가입)
      {
        element: (
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        ),
        children: [
          {
            path: 'login',
            element: <Login />,
          },
        ],
      },

      // 인증이 필요한 라우트 (로그인 후 접속가능)
      {
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
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
            path: 'admin',
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
        element: <MainLayout />,
        children: [
          {
            path: 'design-guide',
            element: <DesignGuide />,
          },
        ],
      },
    ],
  },
])

export default router
