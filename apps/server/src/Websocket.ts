import * as http from "http";
import { WebSocketServer } from "ws";
import { Connection } from "./connection";
import internal from "stream";
export const connections = new Map<string, Connection>();
import { Redis } from "ioredis";
export const subscriber = new Redis({
  host: "redis-120b094d-chatapp-redis.a.aivencloud.com",
  port: 12706,
  username: "default",
  password: "AVNS_yk3WRO6oYdzCzEsHDiB",
});

class websocketconnection {
  private _ws: WebSocketServer;
  static totalConnnections = 0;

  constructor(server: http.Server) {
    this._ws = new WebSocketServer({ server });
    server.on("upgrade", (request, socket, head) => {
      this.ValidateRequest(request, socket, head);
    });
    subscriber.subscribe("MESSAGES");
    subscriber.subscribe("GROUP");
  }

  get connection() {
    return this._ws;
  }

  public init() {
    const ws = this._ws;
    ws.on("connection", (websocket, req) => {
      const newCon = new Connection(websocket, req);
      //storing with the help of email
      connections.set(newCon.email, newCon);

      websocketconnection.totalConnnections++;
      console.log(`New Connection id: ${newCon.Id} email: ${newCon.email}`);
      console.log(`total Connections ${websocketconnection.totalConnnections}`);

      //send all the messgas from db here

      //error handler
      newCon.con.on("error", newCon.errorHandler);

      //close handler
      newCon.con.on("close", newCon.closeHandler);

      //message handler
      newCon.con.on("message", newCon.messageHandler);
    });

    subscriber.on("message", (channel, messages) => {
      switch (channel) {
        case "MESSAGES":
          this.ChatMessageHandler(messages);
          break;
        case "GROUP":
          this.GroupMessageHandler(messages);
          break;
      }
    });
  }

  ChatMessageHandler = (messages: string) => {
    const message = JSON.parse(messages);
    const client: Connection | undefined = connections.get(message.to);
    
    if (!client) { 
      return;
    }
    let send = {
      from: message.from,
      to:message.to,
      message: message.message,
      self: false,
      type: message.type,
      sentTime: message.sentTime,
    };
   
    client?.con.send(JSON.stringify(send));
  };

  GroupMessageHandler = (messages: string) => {
    const message = JSON.parse(messages);

    let send = {
      group:true,
      message: message.message,
      type: message.type,
      sentTime: message.sentTime,
      from: message.from,
      to:message.to,
    };

    //@ts-ignore
    message.members.forEach(element => {
      const client: Connection | undefined = connections.get(element);
      if (client){
         client?.con.send(JSON.stringify(send));
      }
    });
    console.log('group message handler');
  };

  ValidateRequest = (
    req: http.IncomingMessage,
    socket: internal.Duplex,
    head: Buffer
  ) => {
    if (!req.headers.cookie) {
      console.log("no cookie");

      const error = new Error("Unauthorized");

      socket._destroy(error, () => {
        console.log("Unauthorized 404 ");
      });
    }
  };
}

export default websocketconnection;
