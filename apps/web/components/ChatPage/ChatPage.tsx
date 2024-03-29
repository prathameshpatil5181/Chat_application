"use client";

import { useState } from "react";
import React from "react";
import InputComponent from "./InputComponent";

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const updateMessages = (message: string): void => {
    console.log(message);
    setMessages((prevState) => [...prevState, message]);
  };

  return (
    <div className="w-full h-full grid grid-rows-[90%,10%] bg-slate-100 ">
      <div className="w-full flex-1 py-3 px-3 flex flex-col gap-2 overflow-y-auto">
        {messages.map((message: string, index: number) => (
          <div
            key={index}
            className={`bg-white  px-2 py-1  text-black shadow ${
              index % 2 !== 0
                ? "self-end rounded-l-lg rounded-b-lg "
                : "rounded-r-lg rounded-b-lg"
            }`}
            style={{
              maxWidth: "fit-content",
            }}
          >
            {message}
          </div>
        ))}
      </div>
      <div className="p-3 bg-slate-100">
        <InputComponent messages={messages} setMessages={updateMessages} />
      </div>
    </div>
  );
};

export default ChatPage;
