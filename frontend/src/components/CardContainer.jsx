import React, { useEffect, useState } from 'react'
import { ItemCard } from './ItemCard';

const CardContainer = () => {

  const [ItemsList,setItemsList] = useState([]);
      const getItems = async () => {
        const result = await fetch("http://localhost:5000/item/view/");
        const data = await result.json();
        console.log(data);
        setItemsList(data)
      };

      useEffect(() => {
        getItems();
      }, []);
  return (
    <div className='flex justify-center items-center flex-wrap'>
      {ItemsList.map((r)=>{
        return <div className='m-5'><ItemCard details={r}/></div>
      })}
    </div>
  )
}

export default CardContainer;