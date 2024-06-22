import React, { useEffect, useState } from 'react'
import CardContainer from '../components/CardContainer'
import { useUserContext } from '../utils/UserContext';
import Cookies from "js-cookie";

const Reuse = () => {
 const val = useUserContext();

    const [uId,setUId] = useState('');
  

    useEffect(()=>{
      const ID = Cookies.get("userId");
      console.log("cookee id",typeof(ID));
      if(ID == " " || undefined){
        setUId(val.userId);
      }
      else{
        setUId(ID);
        val.setUserId(ID);
      }
    },[])

  return (
    <div>
      <h2 className='text-2xl font-semibold m-6'>All Products</h2>
      <CardContainer />
    </div>
  )
}

export default Reuse