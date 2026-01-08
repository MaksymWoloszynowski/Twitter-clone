import app from "./app.js"
import { Server } from "socket.io"
import http from "http"
import { handleSocketConnection } from "./ws.js";
import { verifyJWT } from "../utils/verifyJWT.js";
import cookie from "cookie";

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

io.use((socket, next) => {
  try {
    const rawCookie = socket.handshake.headers.cookie;

    if (!rawCookie) {
      return next(new Error("unauthorized"));
    }

    const parsed = cookie.parse(rawCookie);
    const token = parsed.token;

    if (!token) {
      return next(new Error("unauthorized"));
    }

    const decoded = verifyJWT(token);

    socket.user = {
      id: decoded.id
    };
    
    next();
  } catch (err) {
    next(new Error("unauthorized"));
  }
});

server.listen(3000);

io.on("connection", socket => {
  handleSocketConnection(io, socket)
})
