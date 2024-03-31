"use client";
import React, { useState } from "react";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SocketActions } from "../../Store/Slices/SocketSlice";
// import SocketClass from "../../SocketUtil/Socket";
import { Socket } from "socket.io-client";
import socket from "../../SocketUtil/Socket";
interface InputComponentInterface {
  messages: string[];
  setMessages: (meassage: string) => void;
}

// interface Rootstate{
//   soc:{
//     SocketIo:SocketClass
//   }
// }

const InputComponent: React.FC<InputComponentInterface> = ({
  messages,
  setMessages,
}) => {
  const [socketio, setsocketio] = useState<Socket>();
  const route = useRouter();
  // const socket = useSelector((state: Rootstate) => state.soc.SocketIo);
  const param = useParams();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // useEffect(() => {
  //   if (!localStorage.getItem("auth")) {
  //     route.push("/login");
  //   }

  //   const socket: Socket = io("http://localhost:8000/", {
  //     withCredentials: true,
  //   });
  //   setsocketio(socket);
  //   socket.on("chat", (receiveMessage) => {
  //     console.log(receiveMessage);
  //     setMessages(receiveMessage);
  //   });

  //   return () => {
  //     socket.disconnect();
  //     socket.off("chat");
  //     setsocketio(undefined);
  //   };
  // }, []);

  useEffect(() => {
    // setsocketio(socket.socket);
    // console.log(socket.socket);
    // socketio?.on("chat", (receiveMessage: string) => {
    //   console.log(receiveMessage);
    //   setMessages(receiveMessage);
    // });
    // socket.sendMessage();

    return () => {};
  }, []);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    console.log(param.name);
    // dispatch(SocketActions.sendMessage());
    // socket.emit("chat", {
    //   message: inputRef.current?.value,
    //   userName: localStorage.getItem("send"),
    // });

    socket.emit("chat", inputRef.current?.value);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-100">
      <div className="flex flex-row w-full gap-2  bg-slate-100">
        <div className="w-[95%]  h-[6vh] rounded-3xl bg-white p-1 ">
          <textarea
            style={{
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              resize: "none",
            }}
            className=" w-[100%] rounded-3xl bg-white
          outline-0 h-full  px-3 whitespace-pre-wrap text-wrap text-justify text-md"
            placeholder="Message..."
            ref={inputRef}
          />
        </div>
        <div>
          <button className="bg-white rounded-full h-12 w-12 flex items-center justify-center ">
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
