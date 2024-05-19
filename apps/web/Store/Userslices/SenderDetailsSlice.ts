import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailId: "",
  name: "",
  id: "",
  profilePicture:""
};

const SenderDetailsSlice = createSlice({
  name: "SenderDetailSlice",
  initialState,
  reducers: {
    setUsernameState(state, action) {
      state.emailId = action.payload.emailId;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.profilePicture = action.payload.profilePicture;
    },
  },
});

export const SenderDetailActions = SenderDetailsSlice.actions;

export default SenderDetailsSlice;
