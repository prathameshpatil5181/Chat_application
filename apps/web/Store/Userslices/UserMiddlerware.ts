import { UnknownAction } from "redux";
import { RootState } from "../Store";
import { ThunkAction } from "redux-thunk";
import { userConnectionActions } from "./UserConnection";
import { SenderDetailActions } from "./SenderDetailsSlice";
import { Console } from "console";
export const addUsers =  (): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> => {
    
    return async (dispatch) => {
        try {
        const response = await fetch(
          "http://localhost:8000/user/getConnection",
          {
            method: "GET",
            credentials: "include",
            // should be there
          }
        );

        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.connections.length !== 0) {
            dispatch(userConnectionActions.setAllUserConnetions(jsonResponse.connections));
        }
      } catch (error) {
        console.log(error);
    }
}
}

export const setReceiver = (user:string): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
  > => {
  return async (dispatch, getState) => {
    let userInfo = getState().userCon.users.find((x) => x.id === user);
    if (!userInfo) {
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
              search: user,
            }),
          }
        );

        const jsonResponse = await response.json();
        userInfo = jsonResponse.result;
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
    dispatch(SenderDetailActions.setUsernameState(userInfo));
  }
};
