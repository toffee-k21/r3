import React, { useEffect, useState } from 'react'
import { useSocket } from '../utils/SocketContext';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../utils/UserContext';

const Chat = () => {
const [chatList, setChatList] = useState([])
  const from = useUserContext();
  console.log("from",from)
  console.log(`http://localhost:5000/chat/${from.userId}`);

  const fetchChat = async()=>{
    if(from.userId){
      const chat = await fetch(`http://localhost:5000/chat/${from.userId}`);
      const data = await chat.json();
      console.log("data",data)
    }
  }

  useEffect(()=>{
fetchChat();
  },[])

  return (
    <div>Chat</div>
    
  )
}

export default Chat