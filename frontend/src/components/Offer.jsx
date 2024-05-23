import React, { useEffect, useState } from 'react'
import { useSocket } from '../utils/SocketContext'
import { useParams } from 'react-router-dom';
import { useUserContext } from '../utils/UserContext';

const Offer = () => {
    // const val = useSocketContext();
    // console.log(val)
    const [message,setMessage] = useState('')

    const Appuser = useUserContext();
    console.log(Appuser.userId) 
    const { socket } = useSocket();

    // console.log(socket)
    const params = useParams();
    console.log("params",params.id);
    const fun = ()=>{
      socket.emit("message", {
        from: Appuser.userId,
        to: params.id,
        message:message
      });
    }
      // socket.on("trade", (data) => {
      //   console.log(data);
      // });
const createInstance = (userId)=>{
  socket.emit("initialize-message", {
    from: Appuser.userId,
    to: params.id,
    message:[]
  });
}

          useEffect(() => {
            fetchMessage();
            createInstance(params.id);
          }, []);

          const fetchMessage = async () => {
            const result = await fetch("http://localhost:5000/item", {
              method: "post",
              body: JSON.stringify({ from: Appuser.userId, to: params.id }),
              headers: {
                "Content-Type": "Application/json",
              },
            });
            const data = await result.json();
            console.log("data hai bro",data);
          };

  return (
    <div>
        message
        <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)}/>
<button onClick={fun}>send</button>
    </div>
  )
}

export default Offer