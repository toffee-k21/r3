import React from 'react'
import Cookies from "js-cookie";
const Logout = () => {
    const logout = ( ) =>{
        Cookies.remove('userId');
        Cookies.remove('access_token')
    }
  return (
    <div>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout