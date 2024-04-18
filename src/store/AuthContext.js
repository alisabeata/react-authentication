import React, { useState, useEffect } from 'react'

const isProduction = false

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

export const AuthContextProvider = (props) => {
  // Function to get cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }

  // Initialize token state from cookie
  const [token, setToken] = useState(getCookie('token'))

  // Check if the user is logged in based on the token presence
  const userIsLoggedIn = Boolean(token)

  // Set cookie upon login
  const loginHandler = (token) => {
    setToken(token)
    // can add  for production
    document.cookie = `token=${encodeURIComponent(
      token,
    )}; path=/; max-age=3600;${isProduction ? ' Secure; HttpOnly; ' : ' '}SameSite=Strict`
  }

  // Clear cookie upon logout
  const logoutHandler = () => {
    setToken(null)
    // can add Secure; HttpOnly; for production
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;${
      isProduction ? ' Secure; HttpOnly; ' : ' '
    }SameSite=Strict`
  }

  // Update the context value with the new token
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  useEffect(() => {
    // Consider additional security measures or session management here if needed
  }, [token])

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
