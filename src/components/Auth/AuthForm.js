import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]=useState(false)
  const history=useHistory()
const emailRef=useRef();
const passwordRef=useRef();
const authCtx=useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=event=>{
    event.preventDefault();
    const enteredEmail=emailRef.current.value;
    const enteredPassword=passwordRef.current.value;

    if(isLogin)
    {
      setIsLoading(true)
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAh2ZeTLgH-x7KEx4Rgisfsm8om41K21Q0',
      {
        method:'POST',
        body:JSON.stringify({
          
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          
        }),
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then(res=>{
        setIsLoading(false)
        if(res.ok)
        {
return res.json()        }
        else {
          alert('Authentication Failed!')
          throw new Error('Authentication Failed!')
        }
      })
      .then(data=>{
        authCtx.login(data.idToken)
        history.push('/')
        
      })
      .catch(err=>{
        console.log(err.message)
      })
    }
    else{
      setIsLoading(true)
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAh2ZeTLgH-x7KEx4Rgisfsm8om41K21Q0',
      {
        method:'POST',
        body:JSON.stringify({
          
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }
      )
      .then(res=>{
        setIsLoading(false)
        if(res.ok)
        {

        }
        else {
          alert('Authentication Failed!')
          return res.json().then(data=>console.log("Error:",data))

        }
      })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading &&<p>...Loading</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
