import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
};

const SocketSlice = createSlice({
  name: "SocketSlice",
  initialState,
  reducers: {
    setSocketConnection(state, action) {
      state.isConnected = action.payload;
      console.log('Socket Connected');
    },
    receivedMessage() {
      // console.log('received');
    },
    sendMessage(state) {
      //@ts-ignore
      state.socketIo.emit("chat", "hii");
    },
  },
});

export const SocketActions = SocketSlice.actions;
export default SocketSlice;
