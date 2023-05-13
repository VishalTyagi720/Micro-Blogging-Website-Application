import { useState } from 'react';
import styles from '../styles/login.module.css';
// import {useToasts} from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { Redirect } from 'react-router-dom';
// import { useToaster } from 'react-hot-toast';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  // const {addToast} = useToasts();
  // const {addToast} = useToaster();
  const auth = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      window.alert('please enter both username and password')
      // return addToast('Please enter both email and password', {
      //   appearence: 'error',
      // });
    }

    const response = await auth.login(email, password);

    if(response.success) {
      window.alert('Successfully logged in')
    //   addToast('Successfully loged in', {
    //     appearence: 'success',
    //   });
    }
    else {
      window.alert('Incorrect username or password')
      // addToast(response.message, {
      //   appearence: 'error',
    //   });
    }

    setLoggingIn(false);
  };

  if (auth.user) {
    return <Redirect to='/'></Redirect>
  }


  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}> Log In</span>

      <div className={styles.field}>
        <input 
          type='email' 
          placeholder='Email' 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}>
        </input>
      </div>

      <div className={styles.field}>
        <input 
          type='password' 
          placeholder='Password' 
          required
          value={password} 
          onChange={(e) => setPassword(e.target.value)}>
        </input>
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}> {loggingIn ? 'Logging in...' : 'Log In'} </button>
      </div>
    </form>
  )
};

export default Login;