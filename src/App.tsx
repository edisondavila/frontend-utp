import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext'

import LoginPage from './pages/loginPage'
import Home from './pages/home'

import 'tailwindcss/tailwind.css'

const App = (): JSX.Element => {
  const isAuthenticated = localStorage.getItem('token') !== null

  return (
    <BrowserRouter>
      <AuthProvider isAuthenticated={isAuthenticated}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token') !== null

  return isAuthenticated
    ? (
    <>{element}</>
      )
    : (
    <Navigate to="/login" replace={true} />
      )
}

export default App
