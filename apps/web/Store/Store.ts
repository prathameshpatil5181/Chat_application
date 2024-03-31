import { configureStore } from "@reduxjs/toolkit";
import SocketSlice from "./Slices/SocketSlice";
const Store = configureStore({
  reducer: {
    soc:SocketSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch

export default Store;
