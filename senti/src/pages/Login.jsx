import React, { useRef } from 'react'
import axios from 'axios';

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
  
    async function handleClick() {
      const user = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
  
      try {
        const { data } = await axios.post(
          '/api/token/',
          user,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        window.location.href = '/';
      } catch (error) {
        console.error('Login failed:', error);
      }
      app
    }
  return (
    <div className='w-full h-full flex'>
        <div className='m-auto flex flex-col'>
        <div>LOGIN</div>
        <div className='flex flex-row justify-between'><label htmlFor='email'>Email:</label><input type='text' id='email' ref={emailRef} name='email'></input></div>
        <div className='flex flex-row justify-between'><label htmlFor='password'>Password:</label><input type='password' ref={passwordRef} id='password' name='password'></input></div>
        <div><button onClick={handleClick}>Submit</button></div>
        </div>
    </div>    

  )
}

export default Login