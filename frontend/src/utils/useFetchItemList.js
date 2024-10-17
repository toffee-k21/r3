import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './itemSlice';
import urls from "../utils/urls.json";
const server_url = urls.server_url;

//here arg is in array
const useFetchItemList = () => {

    useEffect(()=>{
        getItem();
    },[])
    const dispatch = useDispatch();
    const xyz = useSelector((state)=>state.items);
    // console.log("xyz",xyz);

    const getItem = async ( )=>{
    const result = await fetch(`${server_url}/item/view/`);
    const data = await result.json();
    // console.log(data);
    dispatch(addItem(data));
    // return data;
}
        }

export default useFetchItemList