"use client";

import React from "react";
import AddPeoplesvg from "../../SVG/footersvg/addPeoplesvg";
import Profilesvg from "../../SVG/footersvg/Profilesvg";
import Chatsvg from "../../SVG/footersvg/Chatsvg";
import Phonesvg from "../../SVG/footersvg/Phonesvg";
import { useAppDispatch } from "../../Store/hooks";
import { ModelActions } from "../../Store/UiSlices/ModelSlice";
import { useRouter } from "next/navigation";
import Heartsvg from "../../SVG/footersvg/Heartsvg";
const FooterNavigation: React.FC = () => {

  const dispatch = useAppDispatch();

  const route = useRouter();


  const addPeopleHandler = () => {
    dispatch(ModelActions.toogleModel('addPeople'));
  }
  const chatHandler = () => {
    route.push("/Home/chat");
  }

  const profileHandler = () => {
    route.push('/Home/profile');
  }
  
  const RequestHandler = () => {
    route.push('/Home/requests');
  }
  


  return (
    <div className="w-full h-full  shadow-[rgba(80,_155,_255,_0.2)_0px_0px_70px]">
      <ul className=" h-full grid grid-cols-5 justify-items-center items-center">
        <li onClick={chatHandler}>
          <Chatsvg />
        </li>
        <li>
          <Phonesvg />
        </li>
        <li onClick={addPeopleHandler}>
          <AddPeoplesvg />
        </li>
        <li onClick={RequestHandler}>
          <Heartsvg/>
        </li>
        <li onClick={profileHandler}>
          <Profilesvg />
        </li>
      </ul>
    </div>
  );
};

export default FooterNavigation;
