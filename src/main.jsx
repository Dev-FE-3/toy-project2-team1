import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@/app/routes/routes'
import GlobalStyle from '@/shared/styles/global'
import { store } from './shared/redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <>
    <GlobalStyle />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>,
)
