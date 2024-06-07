import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useFetchItemList = () => {

    const dispatch = useDispatch();
    const addItem = useSelector((state)=>state.item.addItem)
const getItem = async ( )=>{
    const result = await fetch("http://localhost:5000/item/view/");
    const data = await result.json();
    // console.log(data);
    dispatch(addItem(data));
    // return data;
}
        }

export default useFetchItemList