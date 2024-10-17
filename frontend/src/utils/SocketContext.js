const { io } = require("socket.io-client");
const { createContext, useContext, useEffect, useMemo } = require("react");
const urls = require("../utils/urls.json");
const server_url = urls.server_url;
const socketContext = createContext(null);

export const useSocket = () => {
  return useContext(socketContext);
};

const socket_id = localStorage.getItem("socketId");

export const SocketProvider = (props) => {
  const socket = useMemo(
    () => io(`${server_url}`, { query: { socket_id } }),
    []
  );
  //  console.log("scoket",socket)

  return (
    <socketContext.Provider value={{ socket }}>
      {props.children}
    </socketContext.Provider>
  );
};
