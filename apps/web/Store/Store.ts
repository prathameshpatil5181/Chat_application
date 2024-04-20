import { configureStore } from "@reduxjs/toolkit";
import ModelSlice from "./UiSlices/ModelSlice";
import SocketSlice from "./Slices/SocketSlice";
import SenderDetailsSlice from "./Userslices/SenderDetailsSlice";
import UserConnectionSlice from "./Userslices/UserConnection";
import { IuserConnectionState } from "./Userslices/UserConnection";
const Store = configureStore({
  reducer: {
    model: ModelSlice.reducer,
    webSoc: SocketSlice.reducer,
    sender: SenderDetailsSlice.reducer,
    userCon: UserConnectionSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
// setupListeners(Store.dispatch);
export default Store;
