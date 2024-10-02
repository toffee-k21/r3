import React, { useEffect, useState } from "react";
import { useSocket } from "../utils/SocketContext";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../utils/UserContext";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";

const Chat = () => {
  const [chatList, setChatList] = useState([]);
  const Appuser = useUserContext();
  // const { socket } = useSocket();
  // const [message, setMessage] = useState("");
  // console.log(`http://localhost:5000/chat/${Appuser.userId}`);

  const fetchChat = async () => {
    if (Appuser.userId) {
      const chat = await fetch(`http://localhost:5000/chat/${Appuser.userId}`);
      const data = await chat.json();
      // console.log("data", data);
      setChatList(data);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div>
      <div className="m-36 text-gray-400">
        <h1 className="font-bold text-2xl my-8">All your chats</h1>
        {chatList.map((r) => {
          return (
            <div className="my-10">
              <div className="my-2">
                from: {r.from} - to : {r.to}
              </div>
              {r.from == Appuser.userId ? (
                <Link to={`/reuse/${r.to}`}>
                  <button>trade</button>
                </Link>
              ) : (
                <Link to={`/reuse/${r.from}`}>
                  <button>trade</button>
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <div className=" absolute top-0 z-[-1] h-[40rem] rounded-md bg-neutral-900 flex flex-col w-full ">
        <ShootingStars />
        <StarsBackground />
      </div>
    </div>
  );
};

export default Chat;
