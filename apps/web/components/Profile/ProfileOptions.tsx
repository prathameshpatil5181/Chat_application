import React from "react";
import ProfileOptionCard from "./ProfileOptionCard";
import Profile from "../../SVG/Profile";
import AboutSvg from "../../SVG/AboutSvg";
import PhoneSvg from "../../SVG/PhoneSvg";
import ProfilePhoto from "./ProfilePhoto";
const ProfileOptions: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center pt-5 gap-5">
      <div className="h-fit">
        <ProfilePhoto />
      </div>
      <ul className="flex flex-col gap-3 p-2 w-full">
        <li>
          <ProfileOptionCard
            svg={<Profile />}
            value="Prathamesh"
            title="Name"
            edit={true}
          />
        </li>
        <li>
          <ProfileOptionCard
            svg={<AboutSvg />}
            value="out of office"
            title="About"
            edit={true}
          />
        </li>
        <li>
          <ProfileOptionCard
            svg={<PhoneSvg />}
            value="+91 8208030188"
            title="Phone"
            edit={false}
          />
        </li>
      </ul>
    </div>
  );
};

export default ProfileOptions;
