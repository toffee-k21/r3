import React, { useEffect, useState } from "react";
import { useSocket } from "../utils/SocketContext";
import { useParams } from "react-router-dom";
import { useUserContext } from "../utils/UserContext";

const Message = () => {
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);

  const Appuser = useUserContext();
  console.log(Appuser.userId);
  const { socket } = useSocket();

  const params = useParams();
  console.log("params", params.id);

  const sendMessage = () => {
    socket.emit("message", {
      from: Appuser.userId,
      to: params.id,
      message: message,
    });
    setMessageData((prev)=>{
       const val = `${Appuser.userId} : ${message}`;
      return [...prev, val]
    })
  };


    useEffect(() => {
      // const { message } = data;
    // socket.on("message", (data) => {
    //   console.log(data);
    //   const { message } = data;
    //   setMessageData((prev) => {
    //     return [[...prev], message];
    //   });
    // });

      const handleMessage = (data) => {
        const {from, message} = data
        console.log(from, message)
        const val = `${from} : ${message}`
        setMessageData((prev) => [...prev, val]);
      };

      socket.on("message", handleMessage);

      // Clean up the event listener on component unmount
      return () => {
        socket.off("message", handleMessage);
      };
    }, [socket]);
    // socket.off("message");



  useEffect(() => {
    fetchMessage();
  }, []);

  console.log(JSON.stringify({ from: Appuser.userId, to: params.id }));

  const fetchMessage = async () => {
    const result = await fetch("http://localhost:5000/chat/", {
      method: "post",
      body: JSON.stringify({ from: Appuser.userId, to: params.id }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    const data = await result.json();
    console.log("data hai bro", data);
    const { messages } = data;
    setMessageData(messages);
    // console.log(messageData);
  };

  return (
    <div>
      <div>
        message
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>send</button>
      </div>
      <div>
        {messageData?.map((r) => {
          return <div>{r}</div>;
        })}
      </div>
    </div>
  );
};

export default Message;
