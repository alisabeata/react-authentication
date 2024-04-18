import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import UserProfile from './components/Profile/UserProfile'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import AuthContext from './store/AuthContext'

// the authentication process consists of 2 steps:
// 1. Get access / permission
// 2. Send request to protected resource

function App() {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        {/* Protected Route */}
        <Route
          path="/profile"
          element={
            isLoggedIn ? <UserProfile /> : <Navigate to="/auth" replace />
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  )
}

export default App
