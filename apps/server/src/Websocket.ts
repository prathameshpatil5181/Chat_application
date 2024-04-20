import * as http from "http";
import { WebSocketServer } from "ws";
import { Connection } from "./connection";
import internal from "stream";

export const connections = new Map<string, Connection>();

class websocketconnection {
  private _ws: WebSocketServer;
  static totalConnnections = 0;

  constructor(server: http.Server) {
    this._ws = new WebSocketServer({ server });
    server.on("upgrade", (request, socket, head) => {
      this.ValidateRequest(request, socket, head);
    });
  }

  get connection() {
    return this._ws;
  }

  public init() {
    const ws = this._ws;
    ws.on("connection", (websocket, req) => {
      const newCon = new Connection(websocket, req);
      connections.set(newCon.id, newCon);
      console.log(`New Connection id: ${newCon.Id} email: ${newCon.email}`);
      websocketconnection.totalConnnections++;
      console.log(`total Connections ${websocketconnection.totalConnnections}`);
      //send all the messgas from db here

      //error handler
      newCon.con.on("error", newCon.errorHandler);

      //close handler
      newCon.con.on("close", newCon.closeHandler);

      //message handler
      newCon.con.on("message", newCon.messageHandler);
    });
  }

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
