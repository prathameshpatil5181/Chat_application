"use client";
import { useEffect } from "react";
import { useAppDispatch } from "../../Store/hooks";
import { addUsers } from "../../Store/Userslices/UserMiddlerware";
import { setSocket } from "../../Store/Slices/socketActions";
import { SetAllGroups } from "../../Store/GroupSlice/GroupMiddlewares";
export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
  }) {
    const dispatch = useAppDispatch();
    // const { sendJsonMessage } = useWebSocket("ws://localhost:8000/");

 
  useEffect(() => {
    dispatch(addUsers());
    dispatch(setSocket());
    dispatch(SetAllGroups());
    }),[];

  return (
    <div className="w-full h-full font-medium">{children}
    </div>
  );
}
