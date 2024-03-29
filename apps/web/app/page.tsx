// import {useState } from 'react'
// import { useSocket } from './context/SocketProvider';
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const page = () => {
  // const {sendMessage,messages} = useSocket();
  // const [message,setMessage] = useState('');

  // const changeHandler= (e:React.ChangeEvent<HTMLInputElement>)=>{
  //   setMessage(e.target.value);
  // }
  const router = useRouter();

  useEffect(() => {
    console.log(localStorage.getItem("authToken"));
    if (localStorage.getItem("authToken")) {
      router.push("/Home/all");
      return;
    }

    router.push("/login");
  }, []);

  return (
    <div className="w-full h-full no-scrollbar"></div>
  );
};

export default page;
