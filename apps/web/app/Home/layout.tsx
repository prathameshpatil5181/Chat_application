"use client";
import { useEffect } from "react";
import { useAppDispatch } from "../../Store/hooks";
import { addUsers } from "../../Store/Userslices/UserMiddlerware";
import { setSocket } from "../../Store/Slices/socketActions";
export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
  }) {
    const dispatch = useAppDispatch();
    // const { sendJsonMessage } = useWebSocket("ws://localhost:8000/");

 
  useEffect(() => {
    console.log('in layout');
    dispatch(addUsers());
    dispatch(setSocket());
    }),[];

  return (
    <div className="w-full h-full font-medium">{children}
    </div>
  );
}
