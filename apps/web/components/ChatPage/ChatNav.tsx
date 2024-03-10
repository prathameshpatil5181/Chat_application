"use client";
import React from "react";
import profileimage from "../../public/profile.jpg";
import Image from "next/image";
import MenuThreeDots from "../../SVG/MenuThreeDots";
import { useParams } from "next/navigation";
const ChatNav: React.FC = () => {
  const name = useParams<{ tag: string; item: string; name: string }>();
  return (
    <div className="p-1 border-b-1 border-gray-400 bg-white">
      <nav className="grid grid-cols-[20%,75%,5%] items-center p-1">
        <div className="w-14 h-14 rounded-[50%] p-[2px] justify-self-start border border-black">
          <Image
            src={profileimage}
            alt="profileImage"
            className="w-full h-full object-cover rounded-[50%]"
          />
        </div>
        <div className="justify-self-start grow">
          <h1>{name.name}</h1>
        </div>
        <div className="justify-self-end">
          <MenuThreeDots />
        </div>
      </nav>
    </div>
  );
};

export default ChatNav;
