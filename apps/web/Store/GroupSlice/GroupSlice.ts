import { createSlice } from "@reduxjs/toolkit";

export interface IGpIstate {
  activeGroup: {
    gid: string;
    name: string;
    Members: string[];
    createdOn: string;
    Admins: string[];
    createdBy: string;
    profilePicture: string;
  };
  groups: {
    gid: string;
    name: string;
    Members: string[];
    createdOn: string;
    Admins: string[];
    createdBy: string;
    profilePicture: string;
  }[];
  message: {
    gchatid?: string;
    message: string;
    type: string;
    sentTime: string;
    from: string;
    to: string;
  }[];
}

const GroupinitialState: IGpIstate = {
  activeGroup: {
    gid:"",
    name:"",
    Members: [],
    createdOn: "",
    Admins: [],
    createdBy: "",
    profilePicture: "",
  },
  groups: [],
  message: [],
};

const GroupSlice = createSlice({
  name: "groupSlice",
  initialState: GroupinitialState,
  reducers: {
    setGroup(state, action) {
      state.groups.push(action.payload);
    },
    setAllGroups(state, action) {
      state.groups = action.payload.result;
      state.message = action.payload.messages;
    },
    setActiveGroup(state, action) {
      state.activeGroup = action.payload;
    },
    setGroupMessage(state, action) {
      state.message.push(action.payload);
    },
  },
});

export const GroupActions = GroupSlice.actions;

export default GroupSlice;
