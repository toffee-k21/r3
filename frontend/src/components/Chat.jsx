import React, { useEffect, useState } from "react";
import { useSocket } from "../utils/SocketContext";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../utils/UserContext";

const Chat = () => {
  const [chatList, setChatList] = useState([]);
  const Appuser = useUserContext();
  // const { socket } = useSocket();
  // const [message, setMessage] = useState("");
  console.log(`http://localhost:5000/chat/${Appuser.userId}`);

  const fetchChat = async () => {
    if (Appuser.userId) {
      const chat = await fetch(`http://localhost:5000/chat/${Appuser.userId}`);
      const data = await chat.json();
      console.log("data", data);
      setChatList(data);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div>
      <h1>chat list</h1>
      {chatList.map((r) => {
        return (
          <div>
            <div>
              from: {r.from} - to : {r.to}
            </div>
            <Link to={`/reuse/${r.from}`}>
              <button>trade</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
