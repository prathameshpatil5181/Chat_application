"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { RequestDAO } from "../../Database/RequestDbModel";
import { RequestSliceActions } from "../../Store/Userslices/RequestSlice";
import Request from "./Request";
import { ConnectionRequestHandler } from "../../Functions/ConnectionRequestHandler";
const RequestsPage = () => {
  const requests = useAppSelector((state) => state.request);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const handleRequests = () => {
    if (requests.length === 0) {
      console.log("no requests");
      RequestDAO.getAllRequests()
        .then((value) => {
          const req = value.map(
            (
              val
            ): {
              emailId: string;
              name: string;
              id: string;
              profilePicture: string;
              RequestedOn: Date;
              from: string;
              to: string;
            } => {
              return {
                emailId: val.emailId,
                name: val.name,
                id: val.emailId,
                profilePicture: val.profilePicture,
                from: val.from,
                to: val.to,
                RequestedOn: val.RequestedOn,
              };
            }
          );

          dispatch(RequestSliceActions.AddBulkRequest(req));
        })
        .catch((error) => console.log("no requests" + error));
    }
  };

  const handleAccept = (to: string) => {
    console.log("accept");

    const msg = {
      from: user.emailId,
      to: to,
      type: "ACCEPT",
      channel: "REQUEST",
    };
    ConnectionRequestHandler.handleConnectionRequest(msg, dispatch);
  };

  const handleDecline = (to: string) => {
    console.log("decline");
    const msg = {
      from: user.emailId,
      to: to,
      type: "DECLINE",
      channel: "REQUEST",
    };
    ConnectionRequestHandler.handleConnectionRequest(msg, dispatch);
  };

  useEffect(() => {
    handleRequests();
  }, []);

  return (
    <div>
      <ul>
        {requests
          ? requests.map((val) =>
              val.from !== user.emailId ? (
                <li key={val.id}>
                  <Request
                    image={val.profilePicture}
                    name={val.name}
                    accept={() => handleAccept(val.emailId)}
                    decline={() => handleDecline(val.emailId)}
                  />
                </li>
              ) : (
                ""
              )
            )
          : ""}
      </ul>
    </div>
  );
};

export default RequestsPage;
