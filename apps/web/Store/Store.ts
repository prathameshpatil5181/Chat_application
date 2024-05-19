import { configureStore } from "@reduxjs/toolkit";
import ModelSlice from "./UiSlices/ModelSlice";
import SocketSlice from "./Slices/SocketSlice";
import SenderDetailsSlice from "./Userslices/SenderDetailsSlice";
import UserConnectionSlice from "./Userslices/UserConnection";
import { IuserState } from "./Userslices/userSlice";
import { IuserConnectionState } from "./Userslices/UserConnection";
import { IGpIstate } from "./GroupSlice/GroupSlice";
import GroupSlice from "./GroupSlice/GroupSlice";
import userSlice from "./Userslices/userSlice";
const Store = configureStore({
  reducer: {
    model: ModelSlice.reducer,
    user:userSlice.reducer,
    webSoc: SocketSlice.reducer,
    sender: SenderDetailsSlice.reducer,
    userCon: UserConnectionSlice.reducer,
    group: GroupSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
// setupListeners(Store.dispatch);
export default Store;
