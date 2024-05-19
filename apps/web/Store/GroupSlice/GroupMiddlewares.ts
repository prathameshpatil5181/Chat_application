import { UnknownAction } from "redux";
import { RootState } from "../Store";
import { ThunkAction } from "redux-thunk";
import { GroupActions } from "./GroupSlice";
import { Serverurl } from "../../Utils/UtilityFunctions";
export const SetAllGroups = (): ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
> => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${Serverurl}/user/getgroups`, {
        method: "GET",
        credentials: "include",
        // should be there
      });

      const jsonResponse = await response.json();
  
      if (jsonResponse.result) {
        dispatch(GroupActions.setAllGroups(jsonResponse));
      }
    } catch (error) {
      console.log(error);
    }


  };
};

export const setGroup = (
  gid: string
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch, getState) => {
    let gp = getState().group.groups.find((gp) => gp.gid === gid);
    if (!gp) {
      try {
        const response = await fetch(`${Serverurl}/user/getgroups`, {
          method: "GET",
          credentials: "include",
          // should be there
        });

        const jsonResponse = await response.json();
        if (jsonResponse.result) {
          dispatch(GroupActions.setAllGroups(jsonResponse));
        }
      } catch (error) {
        console.log(error);
      }
      let gp = getState().group.groups.find((gp) => gp.gid === gid);
      dispatch(GroupActions.setActiveGroup(gp));
      return;
    }
    dispatch(GroupActions.setActiveGroup(gp));
  };
};
