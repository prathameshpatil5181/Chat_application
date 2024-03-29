"use client";
// import {useState } from 'react'
// import { useSocket } from './context/SocketProvider';

import { useEffect, useMemo } from "react";
import ChatList from "../../../components/ChatList/ChatList";
import { useDispatch } from "react-redux";
import { SocketActions } from "../../../Store/Slices/SocketSlice";
import { io } from "socket.io-client";
import SocketClass from "../../../SocketUtil/Socket";
const page = () => {
  // const {sendMessage,messages} = useSocket();
  // const [message,setMessage] = useState('');

  // const changeHandler= (e:React.ChangeEvent<HTMLInputElement>)=>{
  //   setMessage(e.target.value);
  // }

  const dispatch = useDispatch();

  useEffect(() => {
    // const Io = io("http://localhost:8000/", {
    //   withCredentials: true,
    // });

    // dispatch(
    //   SocketActions.setSocketConnection({
    //     socket: Io
    //   })
    // );

    // const Io = new SocketClass();
    // dispatch(
    //   SocketActions.setSocketConnection({
    //     socket: Io
    //   })
    // );
    // setsocketio(socket);
    // Io.emit("chat",'hii'
    //   // setMessages(receiveMessage);}
    //   );
    // console.log("hii");
    // return () => {
    //   Io.get().disconnect();
    //   Io.get().off("chat");
    // };
  }, []);

  return (
    <div className="w-full h-full px-5 pt-2  bg-blue-50">
      <ChatList />
    </div>
  );
};

export default page;
