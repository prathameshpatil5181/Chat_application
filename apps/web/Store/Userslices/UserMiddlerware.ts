import { UnknownAction } from "redux";
import { RootState } from "../Store";
import { ThunkAction } from "redux-thunk";
import { userConnectionActions } from "./UserConnection";
import { SenderDetailActions } from "./SenderDetailsSlice";
import { Serverurl } from "../../Utils/UtilityFunctions";
export const addUsers = (): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${Serverurl}/user/getConnection`, {
        method: "GET",
        credentials: "include",
        // should be there
      });

      const jsonResponse = await response.json();
      if (jsonResponse.connections.length !== 0) {
        dispatch(
          userConnectionActions.setAllUserConnetions(jsonResponse.connections)
        );
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(`${Serverurl}/user/getMessages`, {
        method: "POST",
        credentials: "include",
        // should be there
      });

      const jsonResponse = await response.json();
      if (jsonResponse.result.length !== 0) {
        dispatch(userConnectionActions.insertMessages(jsonResponse.result));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setReceiver = (
  user: string
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, getState) => {
    let userInfo = getState().userCon.users.find((x) => x.id === user);
    if (!userInfo) {
      try {
        const response = await fetch(`${Serverurl}/searchUser/searchone`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search: user,
          }),
        });

        const jsonResponse = await response.json();
        userInfo = jsonResponse.result;
        dispatch(
          userConnectionActions.addConnection({
            emailId: jsonResponse.result.emailId,
            name: jsonResponse.result.name,
            id: jsonResponse.result.id,
            profilePicture: jsonResponse.result.profilePicture,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(SenderDetailActions.setUsernameState(userInfo));
  };
};
