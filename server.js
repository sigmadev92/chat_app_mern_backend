import app from "./app.js";
import http from "http";
import { PORT, SMTP_MAIL, SMTP_PASS } from "./src/config/env.js";
import connectToDbViaMongoose from "./src/config/mongooseDb.js";
import { Server } from "socket.io";
import initSocket from "./src/config/socket.js";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your React frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initSocket(io);
//store online users

// Make io accessible in routes/controllers
app.set("io", io);

server.listen(PORT, () => {
  connectToDbViaMongoose();
  console.log(`SERVER RUNNING ON HTTP://LOCALHOST:${PORT}`);
});
