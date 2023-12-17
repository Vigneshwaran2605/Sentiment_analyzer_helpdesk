import React from 'react'
import "./Login.css"

function Login() {
  return (
    <div className='login_page'>
        <div className='login'>
            <div>Login</div>
            <div className='login-grid'>
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' name='email' />
            </div>
            <div className='login-grid'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' />
            </div>
            <div id='error'></div>
            <button>Submit</button>
        </div>
    </div>
  )
}

export default Login