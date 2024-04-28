import WebSocket from "ws";
import * as http from "http";
import { connections } from "./Websocket";
import websocketconnection from "./Websocket";
import { userNameparse } from "./middleware/SocketauthMiddleware";
import { isJson } from "./utils/responesValidators";
import Redis, { publisher } from "./classes/RedisClass";
import { InsertMessage } from "./Models/MessageModels/MessageModel";
import { insertGroupChatMessage } from "./Models/GroupModels/GroupModel";
const saveMessage = new Redis({
  host: "redis-120b094d-chatapp-redis.a.aivencloud.com",
  port: 12706,
  username: "default",
  password: "AVNS_yk3WRO6oYdzCzEsHDiB",
});

export class Connection {
  private conn: WebSocket;
  public id: string;
  public email: string;
  public connNo: number;
  constructor(con: WebSocket, req: http.IncomingMessage) {
    this.conn = con;
    const result = userNameparse(req);
    //@ts-ignore
    this.id = result.id; // set the id by using the token and the aut
    //@ts-ignore
    this.email = result.email;
    this.connNo = websocketconnection.totalConnnections + 1;
  }

  get Id() {
    return this.id;
  }

  get con() {
    return this.conn;
  }

  closeHandler = (code: number, reason: Buffer) => {
    connections.delete(this.Id);
    websocketconnection.totalConnnections--;
    console.log(`disconnected ${this.id}`);
  };

  errorHandler = (err: Error) => {
    console.log(`Error occured in ${this.id}`);
  };

  messageHandler = async (data: WebSocket.RawData, isBinary: boolean) => {
    if (!isJson(data.toString())) return;

    const message = JSON.parse(data.toString());

    /*
    
    current message structure
    { to: 'test@test.com', message: 'hii' }
    {
      group:{
        members:['id',[id] ]
        from:from member id // this feild we will crate
      },
        to: 'test@test.com', // this should be group id
        message: 'message'
        from:user 
        members:['id',[id] ]
        type:"m"
    }
    }
    */

    if (message.Members) {
      const groupData = JSON.stringify(message);

      this.handleGroupMessage(groupData);
    } else {
      this.handleChatMessage(data);
    }
  };

  handleChatMessage = async (data: WebSocket.RawData) => {
    const message = JSON.parse(data.toString());

    //inserting the message in database
    InsertMessage(message.message, "message", this.Id, message.to);
    console.log(message);
    let receive = {
      from: message.to,
      message: message.message,
      to: this.Id,
      self: true,
      type: message.type,
      sentTime: new Date(),
    };

    this.con.send(JSON.stringify(receive));

    // insert message in db

    let send = {
      to: message.to,
      message: message.message,
      from: this.id,
      type: message.type,
      sentTime: new Date(),
    };
    await publisher.publish("MESSAGES", JSON.stringify(send));
  };

  handleGroupMessage = async (data: string) => {
    const messages = JSON.parse(data.toString());
    // InsertMessage(messages.message, "message", this.Id, messages.to);
    const groupMessage = {
      name:messages.name,
      from: this.Id,
      message: messages.message,
      type: messages.type,
      to: messages.to,
      members:messages.Members,
      sentTime: new Date(),
    };


    insertGroupChatMessage(groupMessage);;

    await publisher.publish("GROUP", JSON.stringify(groupMessage));
  };
}
