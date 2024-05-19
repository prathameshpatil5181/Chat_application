"use client";
import { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "../../Store/hooks";
import { addUsers } from "../../Store/Userslices/UserMiddlerware";
import { setSocket } from "../../Store/Slices/socketActions";
import { SetAllGroups } from "../../Store/GroupSlice/GroupMiddlewares";
import { userDetailActions } from "../../Store/Userslices/userSlice";
import { setUserDetail } from "../../Utils/UtilityFunctions";
export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
  }) {
    const dispatch = useAppDispatch();
    // const { sendJsonMessage } = useWebSocket("ws://localhost:8000/");
     const user = useAppSelector((state) => state.user);
 
  const handleuser = async() => {
    if (user.name === "" && user.id === "") {
      const response = await setUserDetail();
      dispatch(userDetailActions.setUser(response.result));
    }
  }
  
  useEffect(() => {
    dispatch(addUsers());
    dispatch(setSocket());
    dispatch(SetAllGroups());
    handleuser();
    }),[];

  return (
    <div className="w-full h-full font-medium">{children}
    </div>
  );
}
