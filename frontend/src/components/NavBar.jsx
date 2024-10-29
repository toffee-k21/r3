import React, { useEffect, useState } from "react";
import { useUserContext } from "../utils/UserContext";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useSocket } from "../utils/SocketContext";
import useFetchItemList from "../utils/useFetchItemList";
import Logout from "./Logout";
import Hamburger from "./Hamburger";
// import {logo} from "../../public/images/logo.png"/

const NavBar = () => {
  const val = useUserContext();
  const uId = Cookies.get("userId");

  const authToken = Cookies.get("access_token");

  const { socket } = useSocket();
  socket.on("connect", () => {
    socket.emit("registerUser", { userId: uId });
  });

  socket.on("registered-user", (data)=>{
     localStorage.setItem("socket-id",data);
  });

  useFetchItemList();

  return authToken ? (
    <div className="z-20 w-full fixed top-0 bg-gray-800/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex">
          <div className="inline-flex items-center m-1 z-50">
            <Link to={"/"}>
              <img className="lg:w-[60px] w-[50px]" src={"/images/logo.png"} />
              {/* <span className="font-bold">R<sup>3</sup></span> */}
            </Link>
          </div>
          <div className="hidden lg:block">
            <ul className="flex space-x-8 w-[300px] justify-center items-center my-6">
              <li>
                <Link
                  to={"/reuse"}
                  className="text-sm font-semibold text-gray-500 hover:text-gray-900"
                >
                  Reuse
                </Link>
              </li>
              <li>
                <Link
                  to={"/additem"}
                  className="text-sm font-semibold text-gray-500 hover:text-gray-900"
                >
                  Add
                </Link>
              </li>
              <li>
                <Link
                  to={"/manageItem"}
                  className="text-sm font-semibold text-gray-500 hover:text-gray-900"
                >
                  Manage
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex z-50">
          <div className="hidden md:block m-2 text-gray-500">UserId: {uId}</div>
          <div className=" m-2">
            <Link to="/chat">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Chat
              </button>
            </Link>
          </div>
          <Logout />
        </div>
      </div>
      <div className="w-[100%]">
      <div className="block lg:hidden absolute left-0"><Hamburger /></div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default NavBar;
