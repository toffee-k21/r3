import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSocket } from "../utils/SocketContext";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../utils/UserContext";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import urls from "../utils/urls.json";
import SearchUser from "./SearchUser";
const server_url = urls.server_url;

const Chat = () => {
  const [chatList, setChatList] = useState([]);
  // const Appuser = useUserContext();
  // const { socket } = useSocket();
  // const [message, setMessage] = useState("");
  // console.log(`http://localhost:5000/chat/${Appuser.userId}`);
  const userId = Cookies.get("userId");

  const fetchChat = async () => {
    if (userId) {
      const chat = await fetch(`${server_url}/chat/${userId}`);
      const data = await chat.json();
      // console.log("data", data);
      setChatList(data);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div className="overflow-auto">
      <div className="lg:m-36 m-2 mt-24 text-gray-400">
        <SearchUser />
        <h1 className="font-bold text-2xl my-8">All your chats</h1>
        {chatList.map((r) => {
          return (
            <div className="my-10">
              <div className="my-2">
                from: {r.from} - to : {r.to}
              </div>
              {r.from == userId ? (
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
      <div className="fixed top-0 z-[-1] h-screen lg:h-[40rem] rounded-md bg-neutral-900 flex flex-col w-full">
        <ShootingStars />
        <StarsBackground />
      </div>
    </div>
  );
};

export default Chat;
