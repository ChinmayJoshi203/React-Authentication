import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordRef=useRef()
  const authCtx=useContext(AuthContext)
  const changePasswordHandler=(event)=>{
    event.preventDefault()
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAh2ZeTLgH-x7KEx4Rgisfsm8om41K21Q0',
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: newPasswordRef.current.value,
        returnSecureToken: false
      }),
      headers:
      {
        'Content-Type':'application/json'
      }
    })
    .then((res)=>{
      if(res.ok){
        alert('Changed SuccesFully')
      }
      else{
        throw new Error('Password cannot be changed')
      }
    })
    .catch(err=>alert(err))
  }
  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
