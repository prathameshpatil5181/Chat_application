import React from "react";
import profileimage from "../../public/profile.jpg";
import Image from "next/image";

interface Imodelchatcard {
  name: string;
  email: string;
  id: string;
}

const ModelChatCard: React.FC<Imodelchatcard> = (props) => {
  return (
    <div key={props.id} className="grid grid-cols-[20%,70%,10%] items-center">
      <div>
        <Image
          src={profileimage}
          alt="profileImage"
          height={50}
          width={50}
          className="object-cover rounded-md w-10 h-10"
          priority={false}
        />
      </div>
      <div className="flex flex-col text-slate-900">
        <div className="text-md">{props.name}</div>
        <div className="text-sm text-slate-500">{props.email}</div>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="chat"
          height={20}
          width={20}
        >
          <path d="M19,8H18V5a3,3,0,0,0-3-3H5A3,3,0,0,0,2,5V17a1,1,0,0,0,.62.92A.84.84,0,0,0,3,18a1,1,0,0,0,.71-.29l2.81-2.82H8v1.44a3,3,0,0,0,3,3h6.92l2.37,2.38A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V11A3,3,0,0,0,19,8ZM8,11v1.89H6.11a1,1,0,0,0-.71.29L4,14.59V5A1,1,0,0,1,5,4H15a1,1,0,0,1,1,1V8H11A3,3,0,0,0,8,11Zm12,7.59-1-1a1,1,0,0,0-.71-.3H11a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default ModelChatCard;
