import { Worker } from "worker_threads";
import { GetUserModel } from "../Models/userModels/GetUserDetails";
import { connections } from "../Websocket";
import { publisher } from "../classes/RedisClass";
import {
  storeRequest,
  updateConnectionsWithRollback,
  deleteRequest,
  hasRequest,
  RequestChecker,
  getRequestsByCreated,
  getAllRequestFromUser,
  RequestUserData,
} from "../Models/RequestModel/RequestModel";
import { json } from "body-parser";

interface Iresult {
  rid: string;
  from: string;
  to: string;
  status: string;
  createdAt: Date;
}

interface IConnectionRequest {
  channel: "REQUEST";
  type:
    | "CONNECT"
    | "ACCEPT"
    | "DECLINE"
    | "CONNECTREQUEST"
    | "CONNECTACCEPT"
    | "CONNECTDECLINE"
    | "DELETEREQUEST"
    | "REQUESTDELETE"
    | "UPDATE"
    | "REQUESTUPDATE";
  to: string;
  from: string;
  status?: string;
  reason?: string;
  name?: string;
  emailId?: string;
  profilePicture?: string;
  data?: {};
  lastupdated?: Date | 0;
}

export class ConnectionRequestClass {
  public static ConnectionRequestHandler(message: IConnectionRequest) {
    //get the senderinformation and send the request over the and others
    console.log("Connection Request");
    console.log(message);

    // const message = JSON.parse(JSON.stringify(msg));
    /*
      Connect
      accept 
      decline
     */

    if (message.type) {
      switch (message.type) {
        case "CONNECT":
          this.sendConnectionRequestHandler(message);
          break;
        case "ACCEPT":
          this.acceptHandler(message.to, message.from);
          break;
        case "DECLINE":
          this.declineHandler(message.to, message.from);
          break;
        case "CONNECTACCEPT":
          this.connectAcceptHandler(message);
          break;
        case "CONNECTDECLINE":
          this.connectDeclineHandler(message);
          break;
        case "CONNECTREQUEST":
          this.connectRequestHandler(message);
          break;
        case "DELETEREQUEST":
          this.deleteRequestHandler(message.to, message.from);
          break;
        case "REQUESTDELETE":
          this.requestDeleteHandler(message);
        case "UPDATE":
          this.requestUpdateHandler(message);
        case "REQUESTUPDATE":
          this.requestUpdateHandler(message);
        default:
          this.defaultHandler(message);
          break;
      }
    }

    // store in the request table now
  }

  public static async sendConnectionRequestHandler(
    message: IConnectionRequest
  ) {
    //get connection
    const con = connections.get(message.from);

    // check if request exits

    const history = await hasRequest(message.to, message.from);

    if (history.exists) {
      con?.con.send(
        JSON.stringify({
          channel: "REQUEST",
          type: "CONNECTREPLY",
          to: message.to,
          from: message.from,
          status: "fail",
          reason: history.substatus,
        })
      );

      return;
    }

    //store in db
    const storeresponse = await this.databaseStoreHandler(
      message.from,
      message.to,
      "REQUEST"
    );

    const failMessage = {
      channel: "REQUEST",
      type: "CONNECT",
      to: message.to,
      from: message.from,
      status: "fail",
      reason: "internal error",
    };
    if (!storeresponse) {
      return failMessage;
    }

    //get the user
    const user = await GetUserModel(message.from);

    console.log("user");
    console.log(user);
    // get the userData

    if (user === null) {
      console.log("user not found");
      con?.con.send(JSON.stringify(failMessage));
      return;
    } else {
      console.log("send the request to the user");
      const sendMsg = {
        channel: "REQUEST",
        type: "CONNECTREQUEST",
        to: message.to,
        from: message.from,
        name: user.name,
        emailId: user.emailId,
        profilePicture: user.profilePicture,
        data: storeresponse,
      };
      const pubresponse = await publisher.publish(
        "REQUEST",
        JSON.stringify(sendMsg)
      );

      const user2 = await GetUserModel(message.to);

      const successMsg = {
        channel: "REQUEST",
        type: "CONNECTREPLY",
        to: message.to,
        from: message.from,
        name: user2?.name,
        emailId: user2?.emailId,
        profilePicture: user2?.profilePicture,
        status: "success",
        data: storeresponse,
      };

      console.log(pubresponse);

      con?.con.send(JSON.stringify(successMsg), (err) => {
        console.log(err);
      });

      // send the request to redis now by modifying
      // send acknowledgement
    }
  }

  // this handles the accepts from requested person
  public static async acceptHandler(to: string, from: string) {
    //first update both users dbs

    // check if request exits
    const con = connections.get(from);

    const history = await hasRequest(from, to);

    console.log(history);
    if (!history.exists) {
      con?.con.send(
        JSON.stringify({
          channel: "REQUEST",
          type: "ACCEPTREPLY",
          to: to,
          from: from,
          status: "fail",
          reason: history.substatus,
        })
      );
      return;
    }
    const updateCon = await updateConnectionsWithRollback(to, from);

    //send the update to the requester as well
    if (updateCon) {
      // delete the request from the db
      console.log("delete request from db");

      const deleteReply = await deleteRequest(from, to, "ACCEPTED");

      const successMsg = {
        channel: "REQUEST",
        type: "ACCEPTREPLY",
        to: to,
        from: from,
        email: updateCon[0].emailId,
        name: updateCon[0].name,
        profilePicture: updateCon[0].profilePicture,
        id: updateCon[0].id,
        status: "success",
        data: deleteReply,
      };
      con?.con.send(JSON.stringify(successMsg));

      const connectAcceptMsg = {
        channel: "REQUEST",
        type: "CONNECTACCEPT",
        to: to,
        from: from,
        email: updateCon[1].emailId,
        name: updateCon[1].name,
        profilePicture: updateCon[1].profilePicture,
        id: updateCon[1].id,
        status: "success",
        data: deleteReply,
      };

      publisher.publish("REQUEST", JSON.stringify(connectAcceptMsg));
    } else {
      const failMessage = {
        channel: "REQUEST",
        type: "CONNECTREPLY",
        to: to,
        from: from,
        status: "fail",
      };
      con?.con.send(JSON.stringify(failMessage));
    }

    // update the requester

    //get tos details

    return;
  }

  public static connectAcceptHandler(message: any) {
    const con = connections.get(message.to);

    if (con == undefined) {
      return;
    }
    con?.con.send(JSON.stringify(message), (err) => {
      console.log(err);
      //retry
      con.con.send(JSON.stringify(message));
    });
  }

  public static async declineHandler(to: string, from: string) {
    const con = connections.get(from);

    // Check if the request exists
    const history = await hasRequest(to, from);

    if (!history.exists) {
      const failMessage = {
        channel: "REQUEST",
        type: "DECLINEREPLY",
        to: to,
        from: from,
        status: "fail",
        reason: "no request found",
      };
      con?.con.send(JSON.stringify(failMessage));
      return;
    }

    // Delete the request from the database
    const deletereply = await deleteRequest(from, to, "DECLINED");

    const successMsg = {
      channel: "REQUEST",
      type: "DECLINEREPLY",
      to: to,
      from: from,
      status: "success",
      data: deletereply,
    };
    con?.con.send(JSON.stringify(successMsg));

    // Notify the requester about the decline
    const requester = connections.get(to);
    if (requester) {
      const declineMsg = {
        channel: "REQUEST",
        type: "CONNECTDECLINE",
        to: to,
        from: from,
        status: "declined",
        data: deletereply,
      };
      publisher.publish("REQUEST", JSON.stringify(declineMsg));
    }
  }

  public static connectDeclineHandler(message: any) {
    const con = connections.get(message.to);
    if (con == undefined) {
      console.log("connection not found");
      return;
    }
    con.con.send(JSON.stringify(message));
  }

  public static async deleteRequestHandler(to: string, from: string) {
    const con = connections.get(from);

    // Check if the request exists
    const history = await RequestChecker(to, from);
    console.log(history);

    if (!history.exists) {
      const failMessage = {
        channel: "REQUEST",
        type: "DELETEREPLY",
        to: to,
        from: from,
        status: "fail",
        reason: "no request found",
      };
      con?.con.send(JSON.stringify(failMessage));
      return;
    }

    // Delete the request from the database
    const dataval = await deleteRequest(to, from, "DELETED");

    const successMsg = {
      channel: "REQUEST",
      type: "DELETEREPLY",
      to: to,
      from: from,
      status: "success",
      data: dataval,
    };
    con?.con.send(JSON.stringify(successMsg));

    // Notify the requester about the deletion
    const requester = connections.get(to);
    if (requester) {
      const deleteMsg = {
        channel: "REQUEST",
        type: "REQUESTDELETE",
        to: from,
        from: to,
        status: "deleted",
        data: dataval,
      };
      publisher.publish("REQUEST", JSON.stringify(deleteMsg));
    }
  }

  public static requestDeleteHandler(message: any) {
    const con = connections.get(message.to);
    if (con == undefined) {
      return;
    }
    con.con.send(JSON.stringify(message));
  }

  public static async databaseStoreHandler(
    from: string,
    to: string,
    status: string
  ): Promise<
    | boolean
    | {
        rid: string;
        from: string;
        to: string;
        status: string;
        createdAt: Date;
      }
  > {
    console.log("store in db");
    try {
      const storeResponse = await storeRequest({
        from: from,
        to: to,
        status: status,
      });
      if (storeResponse == null) {
        return false;
      }
      return storeResponse;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public static connectRequestHandler(message: any) {
    console.log("connect request");
    const msg = JSON.parse(message);
    console.log(msg);
    const con = connections.get(msg.to);
    if (con == undefined) {
      console.log("connection not found");
      return;
    } else {
      con.con.send(JSON.stringify(msg));
    }
  }

  public static async defaultHandler(message: any) {
    console.log("Not configured");

    const failMessage = {
      channel: "REQUEST",
      type: "REQUESTREPLY",
      message: message,
      status: "fail",
      reason: "no request found",
    };
    const con = connections.get(message.to);
    con?.con.send(JSON.stringify(failMessage));
  }

  public static async requestUpdateHandler(msg: IConnectionRequest) {
    console.log("inside request update handler");
    console.log(msg);
    const sendTo = connections.get(msg.from);
    // if (msg.lastupdated !== 0 && msg.lastupdated !== undefined) {
    //   const result = await getRequestsByCreated(msg.lastupdated, msg.from);

    //   if (result !== null) {
    //     const successMessage = {
    //       channel: "REQUEST",
    //       type: "REQUESTUPDATEREPLY",
    //       to: msg.from,
    //       status: "success",
    //       data: result,
    //     };
    //     sendTo?.con.send(JSON.stringify(successMessage));

    //     // process
    //   } else {
    //     const successMessage = {
    //       channel: "REQUEST",
    //       type: "REQUESTUPDATEREPLY",
    //       to: msg.from,
    //       status: "fail",
    //       reason: "no Requests",
    //     };
    //     sendTo?.con.send(JSON.stringify(successMessage));
    //   }
    // } else {
    //   //get all requests;
    //   if (msg.from !== undefined) {
    //     const result = await getAllRequestFromUser(msg.from);
    //     console.log("last update 0");
    //     console.log(result);
    //     if (result !== null) {
    //       const successMessage = {
    //         channel: "REQUEST",
    //         type: "REQUESTUPDATEREPLY",
    //         to: msg.from,
    //         status: "success",
    //         data: result,
    //       };
    //       sendTo?.con.send(JSON.stringify(successMessage));

    //       // process
    //     } else {
    //       const successMessage = {
    //         channel: "REQUEST",
    //         type: "REQUESTUPDATEREPLY",
    //         to: msg.from,
    //         status: "fail",
    //         reason: "no Requests",
    //       };
    //       sendTo?.con.send(JSON.stringify(successMessage));
    //     }
    //   } else {
    //     const failMessage = {
    //       channel: "REQUEST",
    //       type: "REQUESTUPDATEREPLY",
    //       to: msg.from,
    //       status: "fail",
    //       reason: "internal server error",
    //     };
    //     sendTo?.con.send(JSON.stringify(failMessage));
    //   }
    // }

    getAllRequestFromUser(msg.from).then(async (result) => { 
      console.log("last update 0"); 
      const results = await requesthandlerhelper(msg.from, result);
      if (results !== null) {
        const successMessage = {
          channel: "REQUEST",
          type: "REQUESTUPDATEREPLY",
          to: msg.from,
          status: "success",
          data: results,
        };
        sendTo?.con.send(JSON.stringify(successMessage));
      } else {
        const successMessage = {
          channel: "REQUEST",
          type: "REQUESTUPDATEREPLY",
          to: msg.from,
          status: "fail",
          reason: "no Requests",
        };
        sendTo?.con.send(JSON.stringify(successMessage));
      }
    });
  }
}

async function requesthandlerhelper(
  user: string,
  request: Iresult[] | null
): Promise<
  | {
      rid: string;
      from: string;
      to: string;
      status: string;
      createdAt: Date;
      name: string | undefined;
      emailId: string | undefined;
      profilePicture: string | undefined;
    }[]
  | null
> {
  if (request !== null) {
    const users = request.map((item) => {
      if (item.from !== user) {
        return item.from;
      } else {
        return item.to;
      }
    });

    const resultmap = new Map<
      string,
      {
        id: string;
        emailId: string;
        name: string;
        profilePicture: string;
      }
    >();
    const udata = await RequestUserData(users);
    if (udata !== null) {
      udata.map((x) => {
        resultmap.set(x.emailId, x);
      });

      const finalresult = request.map((item) => {
        return {
          rid: item.rid,
          from: item.from,
          to: item.to,
          status: item.status,
          createdAt: item.createdAt,
          name: resultmap.get(item.from !== user ? item.from : item.to)?.name,
          emailId: resultmap.get(item.from !== user ? item.from : item.to)
            ?.emailId,
          profilePicture: resultmap.get(
            item.from !== user ? item.from : item.to
          )?.profilePicture,
        };
      });
      console.log(finalresult);
      return finalresult;
    } else return null;
  } else {
    return null;
  }
}
