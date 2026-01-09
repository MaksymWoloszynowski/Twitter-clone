// SocketContext.jsx
import { createContext, useEffect } from "react";
import { socket } from "../socket";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;