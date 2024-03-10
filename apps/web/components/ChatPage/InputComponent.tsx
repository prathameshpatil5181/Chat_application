"use client";
import React from "react";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
const InputComponent = () => {
  const socket = io('http://localhost:8000/');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
      socket.on('message',message=>{
        console.log(message);
      })
  }, [socket]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
    socket.emit("message",inputRef.current?.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row w-full gap-2 bg-white">
        <div className="w-[95%]">
          <input
            type="text"
            className=" w-[100%] h-12 rounded-3xl bg-slate-200
          outline-0 caret-transparent cursor-text px-3"
            placeholder="Message..."
            ref={inputRef}
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="bg-white rounded-full h-12 w-12 flex items-center justify-center   "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              id="send"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputComponent;
