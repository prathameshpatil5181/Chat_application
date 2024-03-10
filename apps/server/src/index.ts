import http from "http";
// import SocketService from "./socket";
import express from "express";
import cors from "cors";
const HTTPPORT = process.env.HTTPPORT ? process.env.HTTPPORT : 3002;
const PORT = process.env.PORT ? process.env.PORT : 8000;
const app = express();
import { Server } from "socket.io";

app.use(
  cors({
    origin: "*",
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (client) => {
  client.on("message", (message) => {
    console.log(message);
    io.emit(message);
  });
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// async function init() {
//   const httpServer = http.createServer();
//   const socketService = new SocketService();

//   socketService.io.attach(httpServer);

//   httpServer.listen(PORT, () => {
//     console.log(`HTTP server running at port ${PORT}`);
//   });

//   socketService.initListner();
// }

// init();
