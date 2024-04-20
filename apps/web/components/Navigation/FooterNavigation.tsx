"use client";

import React from "react";
import AddPeoplesvg from "../../SVG/footersvg/addPeoplesvg";
import Profilesvg from "../../SVG/footersvg/Profilesvg";
import Chatsvg from "../../SVG/footersvg/Chatsvg";
import Phonesvg from "../../SVG/footersvg/Phonesvg";
import { useAppDispatch } from "../../Store/hooks";
import { ModelActions } from "../../Store/UiSlices/ModelSlice";
import { useRouter } from "next/navigation";
const FooterNavigation: React.FC = () => {

  const dispatch = useAppDispatch();

  const route = useRouter();


  const addPeopleHandler = () => {
    dispatch(ModelActions.toogleModel('showing the model'));
}

  const profileHandler = () => {
    route.push('/Home/profile');
   }
  


  return (
    <div className="w-full h-full  shadow-[rgba(80,_155,_255,_0.2)_0px_0px_70px]">
      <ul className=" h-full grid grid-cols-4 justify-items-center items-center">
        <li>
          <Chatsvg />
        </li>
        <li>
          <Phonesvg />
        </li>
        <li onClick={addPeopleHandler}>
          <AddPeoplesvg />
        </li>
        <li onClick={profileHandler}>
          <Profilesvg />
        </li>
      </ul>
    </div>
  );
};

export default FooterNavigation;
