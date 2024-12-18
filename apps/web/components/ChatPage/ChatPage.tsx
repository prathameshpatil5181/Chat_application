"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import InputComponent from "./InputComponent";
import { useAppSelector } from "../../Store/hooks";
const ChatPage :React.FC<{user:string}>= (props) => {
  const [messages, setMessages] = useState<
    { from: string; message: string; self: boolean }[]
  >([]);

  //@ts-ignore
  const msg = useAppSelector((state) => state.userCon.messages);
  const chatRef = useRef<HTMLDivElement>(null);


  const handlemsg = () => {
    console.log("handling msg");
    setMessages(msg.filter((m) => m.from === props.user));
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
