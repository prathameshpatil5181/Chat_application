"use client";

import { useEffect, useMemo, useRef, useState ,useCallback} from "react";
import React from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";

import InputGroupComponent from "./inputGroupComponent";
import { setGroup } from "../../Store/GroupSlice/GroupMiddlewares";
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
  const group = useParams();
  //@ts-ignore
  const groupId = decodeURIComponent(group.groupid);
  const dispatch = useAppDispatch();
  const msg = useAppSelector((state) => state.group.message);
  const active = useAppSelector((state) => state.group.activeGroup);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setGroup(groupId));
  }, []);
  const handlemsg = () => {
    setMessages(msg.filter((m) => m.to === active.gid));
    chatRef.current?.scrollIntoView(false);
  };


  useEffect(() => {
    handlemsg();
  }, [msg]);

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
              message.type === "true"
                ? "self-end rounded-l-lg rounded-b-lg "
                : "rounded-r-lg rounded-b-lg"
            }`}
            style={{
              maxWidth: "fit-content",
            }}
          >
            {message.message}
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
