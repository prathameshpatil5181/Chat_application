"use client";

import { useEffect,useRef, useState} from "react";
import React from "react";
import { useAppSelector } from "../../Store/hooks";

import InputGroupComponent from "./inputGroupComponent";
// import { setGroup } from "../../Store/GroupSlice/GroupMiddlewares";
const GroupChatPage = () => {
  const [messages, setMessages] = useState<
    {
      gchatid?: string;
      message: string;
      type: string;
      sentTime: string;
      from: string;
      to: string;
    }[]
  >([]);

  const msg = useAppSelector((state) => state.group.message);
  const active = useAppSelector((state) => state.group.activeGroup);
  const user = useAppSelector((state) => state.user.id);
  const users = useAppSelector((state)=>state.userCon.users)
  const chatRef = useRef<HTMLDivElement>(null);

  const handlemsg = () => {
    console.log("handling msg");
    if (active?.gid) {
      let msgarr = msg.filter((m) => m.to === active.gid);
      setMessages(msgarr);
    }
  };  
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    handlemsg();
  }, [msg,active]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full h-full grid grid-rows-[90%,10%] bg-slate-100 ">
      <div
        className="w-full flex-1 py-3 px-3 flex flex-col gap-2 overflow-y-auto"
        ref={chatRef}
      >
        {messages.map((message, index: number) => (
          <div
            key={index}
            className={`bg-white  px-2 py-1  text-black shadow ${
              message.from === user
                ? "self-end rounded-l-lg rounded-b-lg "
                : "rounded-r-lg rounded-b-lg"
            }`}
            style={{
              maxWidth: "fit-content",
            }}
          >
            { message.from !== user && <div className="text-sky-800">
              {users.find((x) => x.id === message.from)?.name}
            </div>}
            <div>{message.message}</div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-slate-100">
        <InputGroupComponent />
      </div>
    </div>
  );
};

export default GroupChatPage;
