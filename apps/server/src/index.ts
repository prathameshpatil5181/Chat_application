//server imports
import http from "http";
const PORT = process.env.PORT ? process.env.PORT : 8000;

//express imports
import express from "express";
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
app.use(bodyParser.json({
  limit:'20mb'
}));
app.use(
  cookieParser({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000","http://192.168.0.105"],
    credentials: true,
  })
);
 

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/searchUser", searchRouter);
// websocket connection
const newConnection = new websocketconnection(server);
newConnection.init();

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
