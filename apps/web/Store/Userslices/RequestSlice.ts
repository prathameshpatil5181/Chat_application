
import { createSlice } from "@reduxjs/toolkit";


export interface IRequestSlice{
    emailId: string;
    name: string;
    id: string;
    profilePicture: string;
    RequestedOn: Date;
    from: string;
    to:string
}


const initialState: IRequestSlice[] = [];

const RequestSlice = createSlice({
    name: "RequestSlice",
    initialState,
    reducers: {
        setRequestState(state, action: { payload: IRequestSlice }) {
            state.push(action.payload);
        },
        removeRequestState(state, action: { payload: {from:string,to:string} }) {
            return state.filter((request) => request.to !== action.payload.to && request.from !== action.payload.from);
        },
        AddBulkRequest(state, action: { payload: IRequestSlice[] }) {
            return action.payload;
        }
    },
});


export const RequestSliceActions = RequestSlice.actions;
export default RequestSlice;

