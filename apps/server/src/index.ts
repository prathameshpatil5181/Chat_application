import http from "http";
import SocketService from "./socket";
import express from "express";
import cors from "cors";
const HTTPPORT = process.env.HTTPPORT ? process.env.HTTPPORT : 3002;
const PORT = process.env.PORT ? process.env.PORT : 8000;
const app = express();
import authRouter from "./routes/auth";
import { Server } from "socket.io";
import bodyParser = require("body-parser");
import { Socket } from "socket.io";
import { authMiddleware } from "./middleware/authMiddleware";

const cookieParser = require("cookie-parser");
const server = http.createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/testToken", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "success",
  });
});
app.use("/auth", authRouter);

const socketService = new SocketService(server);
// socketService.io.attach();
socketService.initListner();

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
