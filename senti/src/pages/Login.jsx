import React, { useRef, useState } from 'react'
import axios from 'axios';
import { accessTokenCheck } from '../utils/access';
import bgimg from "../image/Gradient-Background.webp"
import authimg from "../image/309058_key_login_private_protect_protection_icon.svg"

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [message, setMessage] = useState("");

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
      accessTokenCheck(data.access)
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
      if(error.code === "ERR_BAD_REQUEST")
      setMessage("invalid username or password")

      else
      setMessage(error.message)
    }
  }
  return (
    <div className='w-screen h-screen flex'>
      <img className=' absolute top-0 left-0 w-screen h-screen -z-10' src={bgimg} />
      <div className='m-auto flex flex-col shadow-lg p-4 gap-4 bg-slate-100/40 rounded-lg'>
        <div className=' text-lg font-semibold flex items-center gap-3'><img src={authimg} className='w-6 h-6' /><span>LOGIN</span></div>
        <div className='flex flex-row justify-between gap-3 text-center items-center'><input className="outline-none p-2 border-1 rounded-lg w-[20vw] min-w-[250px] bg-white/70 active:shadow-inner" type='text' id='email' ref={emailRef} name='email' placeholder='Email' onKeyDown={(e)=>{
          if(e.key === "Enter"){
            passwordRef.current.focus()
          }
        }}></input></div>
        <div className='flex flex-row justify-between gap-3 text-center items-center'><input className="outline-none p-2 border-1 rounded-lg w-[20vw] min-w-[250px] bg-white/70 active:shadow-inner" type='password' ref={passwordRef} id='password' name='password' placeholder='Password' onKeyDown={(e)=>{
          if(e.key === "Enter"){
            handleClick();
          }}}></input></div>
        <div className=' text-xs font-semibold mx-3 text-red-600'>{message}</div>
        <div className=' self-end py-1 px-2  rounded-lg bg-pink-500/90 text-pink-50/90 shadow-sm shadow-pink-500 transition-all hover:scale-105 '><button onClick={handleClick}>Submit</button></div>
      </div>
    </div>

  )
}

export default Login