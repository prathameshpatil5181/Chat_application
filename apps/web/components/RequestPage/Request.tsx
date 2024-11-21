"use client";
import Image from "next/image";
import React from "react";
import ConnectionSvg from "../../SVG/ConnectionSvg";
import CrossSvg from "../../SVG/CrossSvg";
import profileimage from "../../public/profile.jpg";
interface IRequestProps {
  image: string;
  name: string;
  accept: () => void;
  decline: () => void;
}

const Request = (props: IRequestProps) => {
  return (
    <div className="grid grid-cols-2 p-3 gap-3  bg-slate-50 rounded-full m-2 items-center">
      <div className="flex flex-row items-center gap-3">
        <div>
          <Image
            src={props.image!=''?props.image:profileimage}
            alt={""}
            width={30}
            height={30}
            className="rounded-full w-10 h-10 border"
          />
        </div>
        <div>{props.name}</div>
      </div>
      <div className="flex gap-5 items-center justify-self-end ">
        <button className="" onClick={props.accept}>
          <ConnectionSvg />
        </button>
        <button className="" onClick={props.decline}>
          <CrossSvg />
        </button>
      </div>
    </div>
  );
};

export default Request;
