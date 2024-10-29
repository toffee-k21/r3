import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../utils/SocketContext";
import { useParams } from "react-router-dom";
import { useUserContext } from "../utils/UserContext";
import Cookies from "js-cookie";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import urls from "../utils/urls.json";
const server_url = urls.server_url;

const Message = () => {
    const messageContainerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  // const [err,setErr] = useState(false);

  const [uId, setUId] = useState("n/a");

  const ID = Cookies.get("userId");
  // console.log("ID", ID);

  // useEffect(() => {
  //   setUId(ID);
  // }, []);
  // console.log(Appuser.userId);
  const { socket } = useSocket();

  const params = useParams();
  // console.log("params", params.id);

  const sendMessage = () => {
    socket.emit("message", {
      from: uId,
      to: params.id,
      message: message,
    });
    setMessageData((prev) => {
      const val = `${uId} : ${message}`;
      try {
        return [...prev, val];
      } catch (err) {
        // console.log(err)
        // setErr(true);
        return [val];
      }
    });
  };

  // console.log(err);

  useEffect(() => {
    const handleMessage = (data) => {
      console.log(data);
      const { from, message } = data;
      // console.log(from, message)
      const val = `${from} : ${message}`;
      console.log("val : ", val);
      setMessageData((prev) => [...prev, val]);
    };
    socket.on("message", handleMessage);
    // // Clean up the event listener on component unmount
    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket, messageData]);

  useEffect(() => {
    setUId(ID);
    fetchMessage();
  }, []);
   useEffect(() => {
     // Scroll to the bottom of the div
     if (messageContainerRef.current) {
       messageContainerRef.current.scrollTop =
         messageContainerRef.current.scrollHeight;
     }
   }, [messageData]);

  // console.log(JSON.stringify({ from: Appuser.userId, to: params.id }));

  const fetchMessage = async () => {
    console.log("userId", ID); //  not used uId becaue *at last of the page
    const result = await fetch(`${server_url}/chat/`, {
      method: "post",
      body: JSON.stringify({ from: ID, to: params.id }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    const data = await result.json();
    // console.log("data hai bro", data);
    // console.log("data", data);
    try{
      const { messages } = data;
      setMessageData(messages);
    }catch(err){
      console.log(err)
    }
    // console.log("messages", messages);
    // console.log(messageData);
  };
  console.log(messageData);
  return (
    <>
      <div className="mt-28">
        <div
          style={{ scrollbarWidth: "none" }}
          className="h-[440px] overflow-auto mx-28"
          ref={messageContainerRef}
        >
          {messageData?.map((r) => {
            r = r.split(":");
            // console.log(`${r[0]}` == `${ID} `, r[0],ID);
            if (`${r[0]}` == `${ID} `) {
              return (
                <div className="p-4 my-2 bg-black text-white rounded-md w-[30%] translate-x-[230%]">
                  {r[1]}
                </div>
              );
            } else {
              return (
                <div className="p-4 my-2 bg-blue-500 text-white rounded-md w-[30%]">
                  {r[1]}
                </div>
              );
            }
          })}
        </div>
        <div className="w-[90%] bottom-0 mx-16 ">
          <input
            type="text"
            placeholder="Enter Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" w-[89%] my-3 p-4 bg-gray-500"
          />
          <button
            className="rounded-md bg-black py-5 px-10 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={sendMessage}
          >
            send
          </button>
        </div>
        <div className=" absolute top-0 z-[-10] h-[40rem] rounded-md bg-neutral-900 flex flex-col w-full ">
          <ShootingStars />
          <StarsBackground />
        </div>
      </div>
    </>
  );
};
// concept:
// The issue you're encountering where uId is not correctly showing a value in the fetchMessage function is due to how the state update works in React. React's setState (like setUId) is asynchronous, meaning the updated state (uId) may not be immediately available right after calling setUId.

// In your fetchMessage function, you're trying to use uId right after setting it, but React hasn't finished updating the state yet. This is why uId is empty, whereas ID from the cookie works because it's immediately available.
export default Message;
