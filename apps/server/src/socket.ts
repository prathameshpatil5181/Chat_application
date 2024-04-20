import { Server, Socket } from "socket.io";
import { Redis } from "ioredis";
import * as http from "http";
import jwt from "jsonwebtoken";
import { error } from "console";
const cookie = require("cookie");

import {
  storeSocketConnections,
  getUserSocketId,
} from "./Models/storeUserMessage";
// const pub=new Redis({
//     host:'redis-120b094d-chatapp-redis.a.aivencloud.com',
//     port:12706,
//     username:'default',
//     password:'AVNS_yk3WRO6oYdzCzEsHDiB'
// });
// const sub = new Redis({
//     host:'redis-120b094d-chatapp-redis.a.aivencloud.com',
//     port:12706,
//     username:'default',
//     password:'AVNS_yk3WRO6oYdzCzEsHDiB'
// });

class SocketService {
  private _io: Server;

  constructor(httpServer: http.Server) {
    this._io = new Server(httpServer, {
      cors: {
        allowedHeaders: ["http://localhost:3000"],
        origin: "http://localhost:3000",
        credentials: true,
      },
    });
  }

  get io() {
    return this._io;
  }

  public initListner() {
    const io = this.io;
    console.log("Init Socket Listners...");

    io.use((socket: Socket, next) => {
      socket.onAny((event, ...args) => {
        console.log(event, args);
      });
      const cookies = cookie.parse(socket.request.headers.cookie || "");
      const token = cookies.token;

      if (!token) {
        next();
      }

      //@ts-ignore
      // const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
      // socket.handshake.auth.username = decodedToken.email;
      next();
    });
    io.on("connect", (socket) => {
      console.log(`New Socket Connected`, socket.id);
      //  storeSocketConnections(socket.id,socket.handshake.auth.username);
      this.onMessage(socket);
    });

    // sub.on('message',(channel,message)=>{
    //     if(channel==='MESSAGES'){
    //         io.emit('message',message);
    //     }
    // })
  }

  public async onMessage(socket: Socket) {
    const username = socket.handshake.auth.username;
    // const id = await getUserSocketId(username);
    socket.on("message", async ({ message  }) => {
      // const id = await getUserSocketId(userName);
      // this._io.to(id).emit("chat", message);
      // this._io.to(socket.id).emit("chat", message);
      console.log(message);
      this._io.emit("message", message);
      console.log('emmited the message');
      // await pub.publish('MESSAGES',JSON.stringify({message}))
    });
    // socket.on("chat", (message: string) => {

    //   this._io.emit("chat", message);
    //   // await pub.publish('MESSAGES',JSON.stringify({message}))
    // });
  }
}

export default SocketService;
