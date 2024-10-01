import React, { useEffect, useState } from "react";
import { useUserContext } from "../utils/UserContext";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useSocket } from "../utils/SocketContext";
import useFetchItemList from "../utils/useFetchItemList";
import Logout from "./Logout";
// import {logo} from "../../public/images/logo.png"/

const NavBar = () => {
  const val = useUserContext();

  const [uId, setUId] = useState("");

  const ID = Cookies.get("userId");
  console.log("ID", ID);

  useEffect(() => {
    setUId(ID);
  }, []);

  // let userId;
  // userId
  const authToken = Cookies.get("access_token");

  const { socket } = useSocket();
  socket.on("connect", () => {
    socket.emit("registerUser", { userId: uId });
  });

  useFetchItemList();

  return authToken ? (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex">
          <div className="inline-flex items-center m-1">
            <img className="lg:w-[60px] w-[50px]" src={"/images/logo.png"} />
            {/* <span className="font-bold">R<sup>3</sup></span> */}
          </div>
          <div className="block lg:hidden">hambuger</div>
          <div className="hidden lg:block">
            <ul className="flex space-x-8 w-[300px] justify-center items-center my-6">
              <li>
                <Link
                  to={"/reuse"}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  Reuse
                </Link>
              </li>
              <li>
                <Link
                  to={"/additem"}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  Add
                </Link>
              </li>
              <li>
                <Link
                  to={"/manageItem"}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  Manage
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex">
          <div className="hidden md:block m-2">UserId: {ID}</div>
          <div className="hidden lg:block m-2">
            <Link to="/chat">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Chat
              </button>
            </Link>
          </div>
          <Logout />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default NavBar;
