import { createSlice } from "@reduxjs/toolkit";

export interface IuserState {
  id: string;
  emailId: string;
  name: string;
  profilePicture: string;
  status: string;
}
const initialState:IuserState={
    id: "",
    emailId: "",
    name: "",
    profilePicture: "",
    status: "",
  }
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.emailId = action.payload.emailId;
      state.name = action.payload.name;
      state.profilePicture = action.payload.profilePicture;
      state.status = action.payload.status;
    },
    updateField(state, action) {
      switch (action.payload.field) {
        case "id":
          state.id = action.payload.value;
          break;
        case "emailId":
          state.emailId = action.payload.value;
          break;
        case "name":
          state.name = action.payload.value;
          break;
        case "profilePicture":
          state.profilePicture = action.payload.value;
          break;
        case "status":
          state.status = action.payload.value;
          break;
        default:
          console.warn(
            `Field ${action.payload.field} does not exist in the state.`
          );
      }
    },
  },
});

export const userDetailActions = userSlice.actions;

export default userSlice;
