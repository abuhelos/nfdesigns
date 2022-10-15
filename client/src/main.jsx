import React from 'react'
import ReactDOM from 'react-dom/client'
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <MarketplaceProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </MarketplaceProvider>
)