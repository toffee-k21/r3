import React, { useEffect } from 'react'
import { useSocket } from '../utils/SocketContext';
import { useUserContext } from '../utils/UserContext';

const ChatList = () => {
    const { socket } = useSocket();
    const user = useUserContext();
    // console.log(user)
 useEffect(()=>{
 socket.emit("check-req",user.userId);
},[])
socket.on("roomId",(room)=>console.log(room))
// const handleTrade = ( )=>{
//     socket.emit("accept-trade",{from:user}); 
// }
  return (
    <div>ChatList
        {/* <button onClick={handleTrade}>
            trade
        </button> */}
    </div>
  )
}

export default ChatList