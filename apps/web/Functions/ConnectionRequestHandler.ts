// import { useAppSelector } from "../Store/hooks";
import { Wsocket } from "../Store/Slices/socketConnection";
import { Dispatch } from "@reduxjs/toolkit";
import { RequestSliceActions } from "../Store/Userslices/RequestSlice";
import { userConnectionActions } from "../Store/Userslices/UserConnection";
import { RequestDAO } from "../Database/RequestDbModel";
export class ConnectionRequestHandler {
  // public static user = useAppSelector((state) => state.user);

  public static handleConnectionRequest(
    message: any,
    dispatch: Dispatch,

  ) {
    switch (message.type) {
      case "CONNECT":
        this.SendConnectionRequest(
          message.to as string,
          message.from as string,
        );
        break;
      case "CONNECTREPLY":
        this.connectReplyHandler(message, dispatch);
        break;
      case "CONNECTREQUEST":
        this.connectRequestHandler(message, dispatch);
        break;
      case "ACCEPT":
        this.acceptHandler(message.from, message.to, message?.rid);
        break;
      case "ACCEPTREPLY":
        this.acceptReplyHandler(message, dispatch);
        break;
      case "DECLINE":
        this.declineHandler(message.from, message.to, message?.rid);
        break;
      case "DECLINEREPLY":
        this.declineReplyHandler(message, dispatch);
        break;
      case "CONNECTACCEPT":
        this.connectAcceptHandler(message, dispatch);
        break;
      case "CONNECTDECLINE":
        this.connectDeclineHandler(message, dispatch);
        break;
      case "DELETEREQUEST":
        this.deleteHandler(message.from, message.to);
        break;
      case "DELETEREPLY":
        this.deleteReplyHandler(message, dispatch);
        break;
      case "REQUESTUPDATEREPLY":
        this.getRequestReply(message, dispatch);
        break;
      case "REQUESTDELETE":
        break;
      default:
        console.log("Wrong request");
        break;
    }
  }

  public static SendConnectionRequest(
    to: string,
    user: string,
  ) {
    const sendmessage = {
      channel: "REQUEST",
      type: "CONNECT",
      to: to,
      from: user,
    };

    Wsocket.send(JSON.stringify(sendmessage));
  }

  public static connectReplyHandler(message: any, dispatch: Dispatch) {


    if (message.status === "fail") {
      alert(message.reason);
      console.log(message.reason);
      return;
    }

    // store the request in request index db
    RequestDAO.addRequest({
      rid: message.data.rid,
      from: message.data.from,
      to: message.data.to,
      name: message.name,
      emailId: message.emailId,
      profilePicture: message.profilePicture,
      RequestedOn: message.data.createdAt,
    });
    dispatch(
      RequestSliceActions.setRequestState({
        emailId: message.from,
        name: message.name,
        id: message.data.rid,
        profilePicture: message.profilePicture,
        from: message.data.from,
        to: message.data.to,
        RequestedOn: message.data.createdAt,
      })
    );
    //store it in the requests index

    localStorage.setItem("lastRequestupdate", message.data.createdAt);
  }

  public static acceptHandler(from: string, to: string, rid: string = "") {
    const sendmessage = {
      channel: "REQUEST",
      type: "ACCEPT",
      rid: rid,
      from: from,
      to: to,
    };
    Wsocket.send(JSON.stringify(sendmessage));
  }

  public static async acceptReplyHandler(message: any, dispatch: Dispatch) {
    //check th from db

    if (message.status === "fail") {
      console.log("acceptfail");
      console.log(message.reason);
      return;
    }

    const value = await RequestDAO.getRequestByUserFrom(message.to);

    if (value !== undefined) {
      dispatch(
        userConnectionActions.addConnection({
          emailId: message.email,
          name: message.name,
          id: message.id,
          profilePicture: message.profilePicture,
        })
      );

      RequestDAO.fromDeleteHandler(message.to);
      dispatch(
        RequestSliceActions.removeRequestState({
          from: value.from,
          to: value.to,
        })
      );
      localStorage.setItem("lastRequestupdate", message.data.createdAt);
      // check the to state and update the state
    }
  }

  public static declineHandler(from: string, to: string, rid: string = "") {
    const sendmessage = {
      channel: "REQUEST",
      type: "DECLINE",
      rid: rid,
      from: from,
      to: to,
    };
    Wsocket.send(JSON.stringify(sendmessage));
  }

  public static async declineReplyHandler(message: any, dispatch: Dispatch) {
    //check th from db

    if (message.status === "fail") {
      console.log("acceptfail");
      console.log(message.reason);
      return;
    }
    const value = await RequestDAO.getRequestByUserFrom(message.to);

    if (value !== undefined) {
      RequestDAO.fromDeleteHandler(message.to);
      dispatch(
        RequestSliceActions.removeRequestState({
          from: value.from,
          to: value.to,
        })
      );
    }
    localStorage.setItem("lastRequestupdate", message.data.createdAt);
    // check the to state and update the state
  }

  public static async connectAcceptHandler(message: any, dispatch: Dispatch) {
    //check th from db
    const value = await RequestDAO.getRequestByUser(message.from);

    console.log("add connection");

    if (value !== undefined) {
      dispatch(
        userConnectionActions.addConnection({
          emailId: message.email,
          name: message.name,
          id: message.id,
          profilePicture: message.profilePicture,
        })
      );

      RequestDAO.deleteHandler(message.from);
      dispatch(
        RequestSliceActions.removeRequestState({
          from: value.from,
          to: value.to,
        })
      );
      localStorage.setItem("lastRequestupdate", message.data.createdAt);
      // check the to state and update the state
    }
  }
  public static async connectDeclineHandler(message: any, dispatch: Dispatch) {
    RequestDAO.deleteHandler(message.from);
    dispatch(
      RequestSliceActions.removeRequestState({
        from: message.to,
        to: message.to,
      })
    );
    //send the notification
  }

  public static connectRequestHandler(message: any, dispatch: Dispatch) {
    // check the request

    // update the request list



    // store the request in request index db
    RequestDAO.addRequest({
      rid: message.data.rid,
      from: message.data.from,
      to: message.data.to,
      name: message.name,
      emailId: message.emailId,
      profilePicture: message.profilePicture,
      RequestedOn: message.data.createdAt,
    });
    dispatch(
      RequestSliceActions.setRequestState({
        emailId: message.from,
        name: message.name,
        id: message.data.rid,
        profilePicture: message.profilePicture,
        from: message.data.from,
        to: message.data.to,
        RequestedOn: message.data.createdAt,
      })
    );

    localStorage.setItem("lastRequestupdate", message.data.createdAt);
  }

  public static deleteHandler(from: string, to: string) {
    const sendmessage = {
      channel: "REQUEST",
      type: "DELETEREQUEST",
      from: from,
      to: to,
    };
    Wsocket.send(JSON.stringify(sendmessage));
  }

  public static deleteReplyHandler(message: any, dispatch: Dispatch) {
    RequestDAO.deleteHandler(message.to);
    dispatch(
      RequestSliceActions.removeRequestState({
        from: message.from,
        to: message.to,
      })
    );
    RequestDAO.deleteHandler(message.to);
    localStorage.setItem("lastRequestupdate", message.data.createdAt);
  }

  public static getRequestUpdate(request: {
    from: string;
    channel: string;
    type: string;
  }) {
    //delete the db
    RequestDAO.deleteDb();

    const msg = {
      channel: "REQUEST",
      type: "REQUESTUPDATE",
      lastupdated: localStorage.getItem("lastRequestupdate") || 0,
      from: localStorage.getItem("userEmail") || request.from,
    };
    if (Wsocket) {
      Wsocket.send(JSON.stringify(msg));
    }
  }

  public static getRequestReply(message: any, dispatch: Dispatch) {

    if (message.data.length > 0) {
      const result = message.data.map((res: any) => {
        return {
          rid: res.rid,
          from: res.from,
          to: res.to,
          name: res.name,
          emailId: res.emailId,
          profilePicture: res.profilePicture,
          RequestedOn: res.createdAt,
        };
      });

      RequestDAO.addAll(result);
      dispatch(RequestSliceActions.AddBulkRequest(result));
    }
  }
}
