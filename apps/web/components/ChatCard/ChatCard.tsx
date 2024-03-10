import React from "react";
import profileimage from "../../public/profile.jpg";
import Image from "next/image";
interface demodateType {
  name: string;
  lastchat: string;
  lasttime?: string;
}
const demodata: demodateType = {
  name: "Prathamesh",
  lastchat: "Hii",
  lasttime: "10:12 am",
};

const ChatCard: React.FC = () => {
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

      <div className="flex flex-col w-full h-full">
        <div className="grid grid-flow-col borderw-full h-full">
          <div>{demodata.name}</div>
          <div className="justify-self-end">{demodata.lasttime}</div>
        </div>
        <div>{demodata.lastchat}</div>
      </div>
    </div>
  );
};

export default ChatCard;
