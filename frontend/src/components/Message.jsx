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
    <div className="">
      <div
        style={{ scrollbarWidth: "none" }}
        className="w-1/2 h-screen overflow-auto"
      >
        {messageData?.map((r) => {
          return (
            <div className="p-2 m-2 bg-black text-white rounded-md">{r}</div>
          );
        })}
      </div>
      <div className="w-full m-auto fixed bottom-0 bg-gray-600">
        <input
          type="text"
          placeholder="Enter Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 w-2/4 my-2"
        />
        <button
          className="m-2 rounded-md bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={sendMessage}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Message;
