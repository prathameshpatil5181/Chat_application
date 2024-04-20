import WebSocket from "ws";
import * as http from "http";
import { connections } from "./Websocket";
import websocketconnection from "./Websocket";
import { userNameparse } from "./middleware/SocketauthMiddleware";
import { isJson } from "./utils/responesValidators";
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

  messageHandler = (data: WebSocket.RawData, isBinary: boolean) => {
    if (!isJson(data.toString())) return;

    const message = JSON.parse(data.toString());
    console.log(message.message);
    let receive = {
      from: message.to,
      message: message.message,
      self: true,
    };

    this.con.send(JSON.stringify(receive));

    const client: Connection | undefined = connections.get(message.to);
    if (!client) {
      console.log("stored in db");
      return;
    }
    let send = {
      from: this.Id,
      message: message.message,
      self: false,
    };
    client?.con.send(JSON.stringify(send));
  };
}
