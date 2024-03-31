import { createSlice } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";
const initialState = {
  socketIo: Socket,
};

const SocketSlice = createSlice({
  name: "SocketSlice",
  initialState,
  reducers: {
    setSocketConnection(state, action) {
      console.log(action.payload.socket);
      state.socketIo = action.payload.socket;
    },
    sendMessage(state) {
      //@ts-ignore
      state.socketIo.emit("chat", "hii");
    },
  },
});

export const SocketActions = SocketSlice.actions;
export default SocketSlice;
