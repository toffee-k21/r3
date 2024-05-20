const { createContext, useContext, useEffect, useMemo } = require("react");
const { io } = require("socket.io-client");

const socketContext = createContext(null);

export const useSocket = () => {
  return useContext(socketContext);
};

export const SocketProvider = ( props )=>{
   const socket = useMemo(() => io("http://localhost:5001/"), []);
   console.log("scoket",socket)
   
return (
  <socketContext.Provider value={{socket}}>
    {props.children}
  </socketContext.Provider>
);
}