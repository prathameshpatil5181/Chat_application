import { createSlice } from "@reduxjs/toolkit";

export interface IuserConnectionState {
  messages: {
    from: string;
    message: string;
    self:boolean
  }[];
  users: {
    emailId: string;
    id: string;
    name: string;
  }[];
}

const initialState: IuserConnectionState = {
  messages: [],
  users: [],
};

const UserConnectionSlice = createSlice({
  name: "UserConnection",
  initialState,
  reducers: {
    setAllUserConnetions(state, action) {
      state.users = action.payload;
    },
    addConnection(state, action) {
      const user = state.users.find(user => user.id === action.payload.id);
      if (user) return;
      state.users.push(action.payload);
    },
    setMessages(state, action) {
      state.messages.push({
        from: action.payload.from,
        message: action.payload.message,
        self:action.payload.self
      });
    },
  },
});

export const userConnectionActions = UserConnectionSlice.actions;

export default UserConnectionSlice;
