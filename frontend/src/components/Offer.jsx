import React, { useEffect } from 'react'
import { useSocket } from '../utils/SocketContext'
import { useParams } from 'react-router-dom';
import { useUserContext } from '../utils/UserContext';

const Offer = () => {
    // const val = useSocketContext();
    // console.log(val)
    const Appuser = useUserContext();
    console.log(Appuser.userId) 
    const { socket } = useSocket();
    // console.log(socket)
    const params = useParams();
    console.log("params",params.id);
    const fun = ()=>{
      socket.emit("trade-call", { from:Appuser.userId, to:params.id });
    }
      // socket.on("trade", (data) => {
      //   console.log(data);
      // });
  return (
    <div>
        Offer
<button onClick={fun}>clickme</button>
    </div>
  )
}

export default Offer