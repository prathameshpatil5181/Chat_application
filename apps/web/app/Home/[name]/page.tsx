"use client"


import ChatPage from "../../../components/ChatPage/ChatPage";
import ChatNav from "../../../components/ChatPage/ChatNav";
import { useParams } from "next/navigation";
import { useAppDispatch } from "../../../Store/hooks";
import { setReceiver } from "../../../Store/Userslices/UserMiddlerware";
import { useEffect } from "react";
const Chatpage = () => {

 const id = useParams();
 const dispatch = useAppDispatch();
 //@ts-ignore
 const user:string = decodeURIComponent(id.name);


  useEffect(() => {
    dispatch(setReceiver(user));
  }, []);





  return (
    <div
      className="w-full h-full grid grid-flow-row grid-rows-[8%,92%] m-0 bg-blue-50"
    >
      <div className="h-full w-full">
        <ChatNav />
      </div>
      <div className="w-full h-full">
        <ChatPage user={user} />
      </div>
    </div>
  );
};

export default Chatpage;
