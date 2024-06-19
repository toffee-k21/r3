import React, { useEffect } from 'react';
import { useUserContext } from '../utils/UserContext';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import { useSocket } from '../utils/SocketContext';
import useFetchItemList from '../utils/useFetchItemList';
// import {logo} from "../../public/images/logo.png"/

const NavBar = () => {
    const val = useUserContext();
    // const { userId }= useUserContext()
    console.log(val)
    const userId = Cookies.get("userId");
    useEffect(()=>{
val.setUserId(userId)
},[])

const { socket } = useSocket();
socket.on("connect", () => {
  socket.emit("registerUser", { userId: userId });
});

useFetchItemList();

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center">
   <img className="lg:w-[60px] w-[50px]" src={"/images/logo.png"}/>
          {/* <span className="font-bold">R<sup>3</sup></span> */}
        </div>
        <div className='block lg:hidden'>hambuger</div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
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
        <div className='hidden md:block'>UserId: {userId}</div>
        <div className="hidden lg:block">
          <Link to="/chat">
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Chat
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default NavBar