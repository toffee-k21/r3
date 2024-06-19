import React, { useEffect, useState } from 'react'
import { ItemCard } from './ItemCard';
import useFetchItemList from '../utils/useFetchItemList';
import { useSelector } from 'react-redux';

const CardContainer = () => {

  const [ItemsList,setItemsList] = useState([]);

  const data = useSelector((state)=>state.item)
  console.log("data",data.itemList);
  
// const data = useFetchItemList();
useEffect(()=>{
  setItemsList(data.itemList);
},[])
// console.log(data);
  return (
    <div className='flex justify-center items-center flex-wrap'>
      {ItemsList?.map((r)=>{
        return <div className='lg:m-5 mx-1 my-3'><ItemCard details={r}/></div>
      })}
    </div>
  )
}

export default CardContainer;