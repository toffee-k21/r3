import React, { useEffect, useState } from "react";
import { useSocket } from "../utils/SocketContext";
import { useParams } from "react-router-dom";
import { useUserContext } from "../utils/UserContext";
import Cookies from "js-cookie";

const Message = () => {
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
  }, [socket]);

  useEffect(() => {
    setUId(ID);
    fetchMessage();
  }, []);

  // console.log(JSON.stringify({ from: Appuser.userId, to: params.id }));

  const fetchMessage = async () => {
    console.log("userId", ID); //  not used uId becaue *at last of the page
    const result = await fetch("http://localhost:5000/chat/", {
      method: "post",
      body: JSON.stringify({ from: ID, to: params.id }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    const data = await result.json();
    // console.log("data hai bro", data);
    // console.log("data", data);
    const { messages } = data;
    // console.log("messages", messages);
    setMessageData(messages);
    // console.log(messageData);
  };

  return (
    <div>
      <h1>Your chats:</h1>
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
      <div className="w-full m-auto bottom-0 ">
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
// concept:
// The issue you're encountering where uId is not correctly showing a value in the fetchMessage function is due to how the state update works in React. React's setState (like setUId) is asynchronous, meaning the updated state (uId) may not be immediately available right after calling setUId.

// In your fetchMessage function, you're trying to use uId right after setting it, but React hasn't finished updating the state yet. This is why uId is empty, whereas ID from the cookie works because it's immediately available.
export default Message;
