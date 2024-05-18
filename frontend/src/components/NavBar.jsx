import React, { useEffect } from 'react';
import { useUserContext } from '../utils/UserContext';
import Cookies from "js-cookie";

const NavBar = () => {
    const val = useUserContext();
    console.log(val)
    const userId = Cookies.get("userId");
    useEffect(()=>{
val.setUserId(userId)
    },[])
  return (
    <div>NavBar</div>
  )
}

export default NavBar