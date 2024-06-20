import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ItemCard } from '../components/ItemCard';
import { useUserContext } from '../utils/UserContext';

const Manage = () => {
  const [ list, setList ] =  useState([]);

  const data = useSelector((store)=>store.item.itemList);

  console.log(data);
  useEffect(()=>{
    setList(data);
  },[])

  const uId = useUserContext();
  console.log(uId.userId)

  return (
    <>
     <h2 className='text-2xl font-semibold mt-10 mb-8 mx-10 '>Edit Product Details</h2>
    <div className='flex justify-center items-center'>
    {list.filter((r)=>{
     return r.userId == uId.userId
    }).map((r)=>{
return <div className='lg:m-5 mx-1 my-3'><ItemCard details={r}/></div>
    })}
    </div>
    </>
  )
}

export default Manage