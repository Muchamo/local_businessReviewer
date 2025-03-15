import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Layout from './components/common/Layout.jsx'
import HomePage from './components/pages/HomePage.jsx'
import AddBusiness from './components/pages/AddBusiness.jsx'
import Login from './components/common/Login.jsx'
import SignUp from './components/common/SignUp.jsx' 
import ProfilePage from './components/pages/ProfilePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signUp" />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: 'addBusiness',
        element: <AddBusiness />
      },
      {
        path: 'profile/:id',
        element: <ProfilePage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} >
    <StrictMode>
      <App />
    </StrictMode>,
  </RouterProvider>
  
)
