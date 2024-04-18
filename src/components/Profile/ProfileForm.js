import { useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../store/AuthContext'
import classes from './ProfileForm.module.css'

const ProfileForm = () => {
  const newPassportInputRef = useRef()
  const authCtx = useContext(AuthContext)
  const history = useNavigate()

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredNewPassword = newPassportInputRef.current.value

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then(res => {
      history('/', { replace: true })
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPassportInputRef}
          minLength={6}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
