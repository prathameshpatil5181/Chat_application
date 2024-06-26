import { createSlice } from "@reduxjs/toolkit";




const initialState= {
  isVisible: false,
  component: null,
};

const ModelSlice = createSlice({
  name: "SocketSlice",
  initialState,
  reducers: {
    toogleModel(state, action) {
      state.isVisible = !state.isVisible;
      state.component = action.payload;
    },
    hideModel(state) {
      state.isVisible = false;
      state.component = null;
    },
  },
});

export const ModelActions = ModelSlice.actions;
export default ModelSlice;
