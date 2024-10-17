import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import  ItemCard  from '../components/ItemCard';
import { useUserContext } from '../utils/UserContext';
import useFetchItemList from '../utils/useFetchItemList';
import urls from "../utils/urls.json";
import { ShootingStars } from '../components/ui/shooting-stars';
import { StarsBackground } from '../components/ui/stars-background';
const server_url = urls.server_url;

const Manage = () => {
  const [ list, setList ] =  useState([]);
   const [ msg, setMsg ] =  useState([]);

  const data = useSelector((store)=>store.item.itemList);
  // console.log(data);
  useEffect(()=>{
    setList(data);
  },[])
  const uId = useUserContext();
  // console.log(uId.userId)
  
  const handleDelete = async (r) =>{
    const val = await fetch(`${server_url}/item/`,{
      method:"delete",
      body:JSON.stringify(r),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const resp = await val.json();
    setMsg(resp.result);
  }
  
  useFetchItemList();

  return (
    <>
      <div className='z-10'>
        <h2 className="text-2xl font-semibold mt-10 mb-8 mx-10 ">
          Edit Product Details
        </h2>
        <div className="flex justify-center items-center flex-wrap">
          {list
            .filter((r) => {
              return r.userId == uId.userId;
            })
            .map((r) => {
              return (
                <div className="lg:m-5 mx-1 my-3">
                  <ItemCard details={r} />
                  <button
                    className="bg-red-200 p-2 my-2 rounded-md"
                    onClick={() => handleDelete(r)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
        <div>{msg}</div>
      </div>
      <div className="fixed h-[40rem] rounded-md bg-neutral-900 flex flex-col w-full z-0 ">
        <ShootingStars />
        <StarsBackground />
      </div>
    </>
  );
}

export default Manage