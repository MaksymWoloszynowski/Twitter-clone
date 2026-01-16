import app from "./app.js"
import { Server } from "socket.io"
import https from "https"
import { handleSocketConnection } from "./ws.js";
import { verifyJWT } from "../utils/verifyJWT.js";
import cookie from "cookie";
import fs from "fs"

const options = {
  key: fs.readFileSync(process.env.TLS_KEY_PATH),
  cert: fs.readFileSync(process.env.TLS_CERT_PATH)
}

const server = https.createServer(options, app);

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

app.set("io", io)

server.listen(3000);

io.on("connection", socket => {
  handleSocketConnection(io, socket)
})
