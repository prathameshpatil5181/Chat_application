"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import InputComponent from "./InputComponent";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setReceiver } from "../../Store/Userslices/UserMiddlerware";
const ChatPage = () => {
  const [messages, setMessages] = useState<
    { from: string; message: string; self: boolean }[]
  >([]);
  const id = useParams();
  const dispatch = useAppDispatch();
  //@ts-ignore
  const user = decodeURIComponent(id.name);
  const msg = useAppSelector((state) => state.userCon.messages);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setReceiver(user));
  }, []);

  const handlemsg = () => {
    console.log("handling msg");
    setMessages(msg.filter((m) => m.from === user));
    chatRef.current?.scrollIntoView(false);
  };

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    handlemsg();
  }, [msg]);

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
              message.self === true
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
        <InputComponent />
      </div>
    </div>
  );
};

export default ChatPage;
