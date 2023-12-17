import React from 'react'
import { Navigate, redirect } from 'react-router-dom';

function Auth(props) {
   const auth = localStorage.getItem("access-token");
   let url = ""
   if (window.location.pathname !== '/login')
    url = "?callback="+(new URLSearchParams(window.location.pathname)).toString()
    else{
     url =window.location.search
    }
   console.log(url)
  return auth?props.childern: <Navigate to={"/login"+url} />
}

export default Auth