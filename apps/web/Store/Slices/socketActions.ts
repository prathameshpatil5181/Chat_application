import { UnknownAction } from "redux";
import { RootState } from "../Store";
import { ThunkAction } from "redux-thunk";
import { Wsocket } from "./socketConnection";
import { SocketActions } from "./SocketSlice";
import { userConnectionActions } from "../Userslices/UserConnection";
import { GroupActions } from "../GroupSlice/GroupSlice";
export const setSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> => {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.webSoc.isConnected) {
      const ws = Wsocket;
      dispatch(SocketActions.setSocketConnection(true));
      ws.onopen = () => {
        // console.log("WebSocket connected successfully!");
      };

      ws.onmessage = async (event) => {
        const message = await event.data;
        const jsonMsg = JSON.parse(message);

        if (jsonMsg.group) {
          //dispatch groupmsg
          // console.log('groupMsg');
          // console.log(jsonMsg);
          const user = getState().group.groups.find(
            (user) => user.gid === jsonMsg.to
          );
          if (!user) {
            // console.log("inside the user not availiable");
            try {
              const response = await fetch(
                "http://localhost:8000/user/getgroups",
                {
                  method: "GET",
                  credentials: "include",
                  // should be there
                }
              );

              const jsonResponse = await response.json();
              // console.log(jsonResponse);
              if (jsonResponse.result) {
                dispatch(GroupActions.setAllGroups(jsonResponse));
              }
            } catch (error) {
              console.log(error);
            }
          }

          dispatch(
            GroupActions.setGroupMessage({
              group: true,
              message: jsonMsg.message,
              type: jsonMsg.type,
              sentTime: jsonMsg.sentTime,
              from: jsonMsg.from,
              to: jsonMsg.to,
            })
          );
          return;
        }

        const user = getState().userCon.users.find(
          (user) => user.id === jsonMsg.from
        );
        if (!user) {
          // console.log("inside the user not availiable");
          try {
            const response = await fetch(
              "http://localhost:8000/searchUser/searchone",
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  search: jsonMsg.from,
                }),
              }
            );

            const jsonResponse = await response.json();
            dispatch(
              userConnectionActions.addConnection({
                emailId: jsonResponse.result.emailId,
                name: jsonResponse.result.name,
                id: jsonResponse.result.id,
              })
            );
          } catch (error) {
            console.log(error);
          }
        }

        dispatch(
          userConnectionActions.setMessages({
            from: jsonMsg.from,
            message: jsonMsg.message,
            to: jsonMsg.to,
            self: jsonMsg.self,
            sentTime: jsonMsg.sentTime,
            type: jsonMsg.from,
          })
        );
        return;
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed.");
      };
    }
  };
};

export const sendWsMessage = (msg: {
  to: string;
  message: string;
}): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return () => {
    const stringifyMsg = JSON.stringify(msg);
    Wsocket.send(stringifyMsg);
  };
};

export const sendWsChatMessage = (msg: {
    message: string,
        type: string,
        sentTime: Date,
        to: string,
        Members: string[]
}): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return () => {
    const stringifyMsg = JSON.stringify(msg);
    Wsocket.send(stringifyMsg);
  };
};
