"use client";

import ChatPage from "../../../components/ChatPage/ChatPage";
import ChatNav from "../../../components/ChatPage/ChatNav";
import { useParams } from "next/navigation";
import { useAppDispatch } from "../../../Store/hooks";
import { setReceiver } from "../../../Store/Userslices/UserMiddlerware";
import { useAppSelector } from "../../../Store/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Chatpage = () => {
  const id = useParams();
  const dispatch = useAppDispatch();
  const navigation = useRouter();
  //@ts-ignore
  const user: string = decodeURIComponent(id.name);
  const currentReceiver = useAppSelector((state) => state.sender);
  console.log("current");
  console.log(currentReceiver);
    // if (currentReceiver.emailId === "") {
    //   console.log("current in");
    //   navigation.push("/Home/all");
    // }

  useEffect(() => {

     dispatch(setReceiver(user));
  }, [currentReceiver]);

  return (
    <div className="w-full h-full grid grid-flow-row grid-rows-[8%,92%] m-0 bg-blue-50">
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
