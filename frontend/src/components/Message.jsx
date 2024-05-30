import React, { useEffect, useState } from "react";
import { useSocket } from "../utils/SocketContext";
import { useParams } from "react-router-dom";
import { useUserContext } from "../utils/UserContext";

const Message = () => {
  const [message, setMessage] = useState("");

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
  };

  useEffect(() => {
    fetchMessage();
  }, []);

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
  };

  return (
    <div>
      message
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>send</button>
    </div>
  );
};

export default Message;
