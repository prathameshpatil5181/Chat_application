import React from "react";
import ProfileOptions from "./ProfileOptions";
import BackSvg from "../../SVG/BackSvg";
const Profile: React.FC = () => {
  return (
    <div className="h-full w-full grid grid-rows-[5%,95%]">
      <div className=" h-fit w-full flex flex-row items-center gap-3 p-2">
        <div className="h-full" >
          <BackSvg />
        </div>
        <div className="h-fit w-full">Profile</div>
      </div>
      <div className="bg-gray-100 h-full w-full">
        <ProfileOptions />
      </div>
    </div>
  );
};

export default Profile;
