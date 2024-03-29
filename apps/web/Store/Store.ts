import { configureStore } from "@reduxjs/toolkit";
import SocketSlice from "./Slices/SocketSlice";
const Store = configureStore({
  reducer: {
    soc:SocketSlice.reducer
  },
});

export default Store;
