import React from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
const Logout = () => {
  const navigate = useNavigate();
    const logout = ( ) =>{
      navigate('/signin')
        Cookies.remove('userId');
        Cookies.remove('access_token')
    }
  return (
    <div>
        <button onClick={logout} className='p-[6px] m-2 bg-black rounded-md text-gray-500'>Logout</button>
    </div>
  )
}

export default Logout