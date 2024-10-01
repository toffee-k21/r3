import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";

const PrivateRoute = () => {
    const authToken = Cookies.get("access_token");
    const navigate = useNavigate();
    // console.log("here",authToken);
  return authToken? <Outlet /> : <Navigate to={'/signin'}/>;
  //todo:how to verify that token is right or not in frontend 
}

export default PrivateRoute