import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailId: "",
  name: "",
  id: "",
};

const SenderDetailsSlice = createSlice({
  name: "SenderDetailSlice",
  initialState,
  reducers: {
    setUsernameState(state, action) {
      state.emailId = action.payload.emailId;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
  },
});

export const SenderDetailActions = SenderDetailsSlice.actions;

export default SenderDetailsSlice;
