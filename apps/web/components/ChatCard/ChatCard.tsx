import React from "react";
import profileimage from "../../public/profile.jpg";
import Image from "next/image";
interface demodateType {
  name: string;
  lastchat: string;
  lasttime?: string;
}


const ChatCard: React.FC<demodateType> = ({name,lastchat,lasttime }) => {
  return (
    <div className="flex flex-row gap-2 h-full w-full ">
      <div className="w-20 h-14 rounded-[50%] p-[2px]">
        <Image
          src={profileimage}
          alt="profileImage"
          height={100}
          width={100}
          className="object-cover rounded-[50%] w-14 h-14"
          priority={false}
        />
      </div>

      <div className="flex flex-col w-full h-full py-2">
        <div className="grid grid-flow-col borderw-full h-full">
          <div className="text-md">{name}</div>
          <div className="justify-self-end text-slate-400 text-sm" >{lasttime}</div>
        </div>
        <div className="text-sm">{lastchat}</div>
      </div>
    </div>
  );
};

export default ChatCard;
