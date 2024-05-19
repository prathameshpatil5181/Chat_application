"use client";
import React from "react";
import profileimage from "../../public/profile.jpg";
import Image from "next/image";
import MenuThreeDots from "../../SVG/MenuThreeDots";
import { useAppSelector } from "../../Store/hooks";
const ChatNav: React.FC = () => {
  const name = useAppSelector((state) => state.sender);

  return (
    <div className="p-1 border-b-1 border-gray-400 bg-white h-full w-full">
      <nav className="grid grid-cols-[20%,75%,5%] items-center p-1">
        <div className="w-12 h-12 rounded-[50%] p-[2px] justify-self-start">
          <Image
            src={name.profilePicture ?name.profilePicture : profileimage}
            alt="profileImage"
            className="w-full h-full object-cover rounded-[50%]"
            width={40}
            height={40}
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
