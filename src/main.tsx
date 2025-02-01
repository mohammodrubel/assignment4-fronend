import { ConfigProvider } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import { persistore, store } from './app/store.tsx'
import './index.css'
import themeConfig from './provider/themeConfig.tsx'
import router from './router/router.tsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <ConfigProvider theme={themeConfig}>
          <RouterProvider router={router}>
            </RouterProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
    <Toaster position='bottom-right' richColors />
  </StrictMode>,
)
