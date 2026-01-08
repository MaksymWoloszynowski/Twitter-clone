import { useContext } from "react";
import SocketContext from "../context/SocketContext.jsx";

const useSocket = () => {
  const socket = useContext(SocketContext);

  return socket;
};

export default useSocket;