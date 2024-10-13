//server imports
import http from "http";
const PORT = process.env.PORT ? process.env.PORT : 8000;

//express imports
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
const app = express();
import bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
import authRouter from "./routes/auth";
import userRouter from "./routes/userRoutes";

//websocket imports
import websocketconnection from "./Websocket";
import searchRouter from "./routes/search";

//server setup
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false, limit: "20mb" }));

// parse application/json
app.use(
  bodyParser.json({
    limit: "20mb",
  })
);
app.use(
  cookieParser({
    extended: true,
  })
);

const allowedOrigins = [
  "https://chat-application-3ew6hxl93-prathameshpatil5181s-projects.vercel.app", // Your frontend on Vercel
  "https://chat.prathamesh-de.me", // Your backend
  "http://localhost:3000",
  "https://chat-application-web.vercel.app",

  // Add other trusted origins if needed
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowed origins array
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const gotrequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(`request from ${req.socket.remoteAddress}`);
  next();
};
app.get("/", (req: Request, res: Response) => {
  res.send("healthy");
});
app.use("/auth", gotrequest, authRouter);
app.use("/user", userRouter);
app.use("/searchUser", searchRouter);
app.get("/hello", (req, res) => {
  res
    .status(200)
    .send(`<h1>hello from server to ${req.socket.remoteAddress}</h1>`);
});
// websocket connection
const newConnection = new websocketconnection(server);
newConnection.init();

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
