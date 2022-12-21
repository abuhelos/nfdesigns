import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import App from './App'
import {MarketplaceProvider} from './context/MarketplaceContext'
import './index.css'

const router = createBrowserRouter([
  {
    path: "*",
    element: <App/>,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MarketplaceProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </MarketplaceProvider>
)