import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../store/AuthContext'
import { Link } from 'react-router-dom'
import classes from './MainNavigation.module.css'

const MainNavigation = () => {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  const history = useNavigate()

  const logoutHandler = () => {
    authCtx.logout()
    history('/auth', { replace: true })
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn ? (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
