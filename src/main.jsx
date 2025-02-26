import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@/app/routes/routes'
import GlobalStyle from '@/shared/styles/global'

createRoot(document.getElementById('root')).render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>,
)
